import * as styles from './styles';
import { mixins, typography, utils } from '@styles/shared';
import AssetsImg from '@public/images';
import { FC } from 'react';
interface ReferBannerProps {
  title: string;
  subtitle?: string;
}
const ReferBanner: FC<ReferBannerProps> = ({ title, subtitle }) => {
  return (
    <section
      css={[styles.container, mixins.flexJustifiedBetween, utils.mb(22)]}
    >
      <article>
        <p css={[typography.T_16_Regular, utils.mb(4)]}>{title}</p>
        {subtitle && <p css={[typography.T_16_Bold]}>{subtitle}</p>}
      </article>
      <article css={[mixins.positionRelative]}>
        <div css={[styles.tropyRightBurst, mixins.flex]}>
          <img src={AssetsImg.ic_burstPucker.src} alt="" />
        </div>
        <img src={AssetsImg.ic_trophy.src} alt="" height="100%" width="100%" />
        <div css={[styles.tropyLeftBurst, mixins.flex]}>
          <img src={AssetsImg.ic_burstPucker.src} alt="" />
        </div>
      </article>
    </section>
  );
};

export default ReferBanner;
