import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { BottomFadeInAnimation } from '@components/Shared';
import * as styles from './styles';
import { useRouter } from 'next/router';
import AssetsImg from '@public/images';
import { feedDetailsResponse } from '@typings/api/feed';
import { StatusType } from '@typings/api/shared';
import { getFeedDetails } from '@actions/feed';
import { handleErrorMessage } from '@utils/handleResponseToast';
import FeedMedia from '@components/Shared/Card/FeedMedia';
import { MediaType } from '@components/Shared/Card/Media';
import ShimmerFeed from '@components/Shimmer/ShimmerFeed';
import ShimmerParagraph from '@components/Shimmer/ShimmerParagraph';
import { Pages } from '@utils/navigation';
import { EVENT_PAGE, screen } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';
import ReactMarkdown from 'react-markdown';

interface FeedDetailProps {
  feedId: string;
}

const FeedDetail: FC<FeedDetailProps> = ({ feedId }) => {
  const [feed, setFeed] = useState<{
    status?: StatusType;
    data?: feedDetailsResponse;
  }>({ status: StatusType.LOADING });
  const [isMute, setIsMute] = useState<boolean>(true);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { trackPage, trackClick } = useAnalytics();

  const fetchFeedDetails = async () => {
    if (feedId) {
      try {
        const response = await getFeedDetails(feedId);
        if (response.data) {
          setFeed({ status: StatusType.SUCCESS, data: response.data });
          if (ref.current) {
            ref.current.scrollIntoView({
              block: `start`,
              behavior: `smooth`,
            });
          }
        }
      } catch (e) {
        handleErrorMessage(e);
        setFeed({ status: StatusType.ERROR });
      }
    } else {
      setFeed({ status: StatusType.ERROR });
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchFeedDetails();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (feed.data?.feed_uuid) {
      trackPage(EVENT_PAGE.FEED_DETAIL, {
        current_feed: feed.data?.feed_uuid,
      });
    }
  }, [feed.data?.feed_uuid]);

  const linkRenderer = (props: any) => {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  };

  if (feed.status === StatusType.SUCCESS) {
    return (
      <Fragment>
        <BottomFadeInAnimation addedStyle={styles.container}>
          <section css={styles.mediaContainer}>
            {feed?.data && (
              <FeedMedia
                mediaUrl={feed?.data?.mediaLink}
                mediaType={feed?.data?.mediaType}
                currentMedia={feed?.data?.feed_uuid}
                id={feed?.data?.feed_uuid}
                isMute={isMute}
              />
            )}
            {feed?.data?.heading && (
              <div ref={ref} css={styles.title}>
                {feed?.data?.heading}
              </div>
            )}
            {feed?.data?.mediaType === MediaType.VIDEO && (
              <img
                css={styles.mute}
                src={isMute ? AssetsImg.ic_mute.src : AssetsImg.ic_unmute.src}
                onClick={() => {
                  setIsMute(!isMute);
                }}
              />
            )}
          </section>
          {/* Need to resolve image height issue for auto scroll */}
          {feed.data?.content && (
            <div css={styles.markdownDescription}>
              <ReactMarkdown components={{ a: linkRenderer }}>
                {feed.data.content}
              </ReactMarkdown>
            </div>
          )}
        </BottomFadeInAnimation>
      </Fragment>
    );
  } else if (feed.status === StatusType.LOADING) {
    return (
      <div>
        <ShimmerFeed />
        <ShimmerParagraph repeat={5} />
      </div>
    );
  } else {
    router.push(Pages.HOME);
    return <></>;
  }
};

export default FeedDetail;
