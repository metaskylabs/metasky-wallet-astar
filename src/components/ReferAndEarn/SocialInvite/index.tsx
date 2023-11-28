import { SocialMediaButton } from '@components/Shared';
import AssetsImg from '@public/images';
import * as styles from './styles';
import React, { useEffect } from 'react';
import { utils } from '@styles/shared';
import CopyInvite from '../CopyInvite';
import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { State as ReferralState } from '@reducers/referral';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { useTranslate } from '@utils/useTranslate';

const SocialInvite = () => {
  const [showMore, setShowMore] = React.useState(false);

  const socialRedirect = (url: string) => {
    if (typeof window !== `undefined`) {
      window.open(url, `_blank`);
    }
  };
  const referral = useSelector<StoreState, ReferralState>(
    (state) => state.referral,
  );
  const { translate } = useTranslate();
  useEffect(() => {
    if (window && window.navigator && window.navigator.share!) {
      setShowMore(true);
    }
  }, []);
  return (
    <section css={styles.container}>
      <p css={styles.title}>{translate(`SEND_INVITE_VIA`)}</p>
      <article css={[styles.socialIcons, utils.mb(20)]}>
        <SocialMediaButton
          onClick={() =>
            socialRedirect(
              `https://api.whatsapp.com/send?text=${referral.link}`,
            )
          }
          icon={AssetsImg.ic_whatsapp.src}
          name="whatsapp"
        />
        <SocialMediaButton
          onClick={() =>
            socialRedirect(`https://twitter.com/share?url=${referral.link}`)
          }
          icon={AssetsImg.ic_twitter.src}
          name="twitter"
        />
        {showMore && (
          <SocialMediaButton
            onClick={() => {
              if (navigator.share && referral?.link) {
                navigator
                  .share({
                    title: `Metasky Refer & Earn`,
                    text: referral.link,
                    url: referral.link,
                  })
                  .then(() => {
                    console.log(`Thanks for sharing!`);
                  })
                  .catch(console.error);
              } else {
                generateToast({
                  type: ToastType.ERROR,
                  content: `Not able to copy the link`,
                });
              }
            }}
            icon={AssetsImg.ic_socialmedia.src}
            name="More"
          />
        )}
      </article>
      <div css={styles.hr}>
        <span css={styles.orText}>{translate(`OR`)}</span>
      </div>
      <p css={styles.copy}>{translate(`COPY_INVITE_LINK`)}</p>
      <CopyInvite inviteLink={referral.link || ``} />
    </section>
  );
};

export default SocialInvite;
