import * as styles from './styles';
import { BottomFadeInAnimation } from '@components/Shared';
import mixins from '@styles/shared/mixins';
import { useRouter } from 'next/router';

type BlueBannerProps = {
  title: string;
  ctaLink: string;
  imgSrc?: string;
};

export const BlueBanner = ({ title, ctaLink, imgSrc }: BlueBannerProps) => {
  const router = useRouter();

  return (
    <BottomFadeInAnimation delay={0.2}>
      <div css={styles.bannerContainer}>
        <div
          css={[styles.bannerBox, mixins.flexAlignCenter]}
          onClick={() => {
            router.push(ctaLink);
          }}
        >
          {imgSrc && (
            <img
              src={imgSrc}
              alt="banner image"
              height={`20px`}
              width={`20px`}
            />
          )}
          {title}
        </div>
      </div>
    </BottomFadeInAnimation>
  );
};
