import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import Typography from '@styles/shared/typography';
import { mixins } from '@styles/shared';
import { useTranslate } from '@utils/useTranslate';

interface OutbidBannerProps {
  onClick: () => void;
}

const OutbidBanner: FC<OutbidBannerProps> = ({ onClick }) => {
  const { translate } = useTranslate();
  return (
    <div css={styles.container}>
      <div>
        <img src={AssetsImg.ic_white_offer.src} />
      </div>
      <div css={[styles.content, mixins.cursorPointer]} onClick={onClick}>
        <span css={{ ...Typography.T_16_Bold }}>
          {translate(`OUTBID_BANNER_TITLE`)}
        </span>
        <span css={{ ...Typography.T_14_Semibold }}>
          {translate(`OUTBID_BANNER_CTA`)}
        </span>
      </div>
    </div>
  );
};

export default OutbidBanner;
