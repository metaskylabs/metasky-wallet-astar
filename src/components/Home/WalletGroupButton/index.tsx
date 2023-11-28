import { WithIcon } from '@components/Shared';
import { mixins } from '@styles/shared';
import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import AssetsImg from '@public/images';
import { specialButtonCon, specialButtonImage } from './styles';
import ic_formScan from '@public/images/icons/formScan.svg';
import ic_scan from '@public/images/icons/ic_scan.svg';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK } from '@constants/analytics';

interface WalletGroupButtonProps {
  transitionRoute?: () => void;
  connectWalletHandler?: () => void;
  transferHandler?: () => void;
}

const WalletGroupButton: FC<WalletGroupButtonProps> = ({
  transitionRoute,
  connectWalletHandler,
  transferHandler,
}) => {
  const { translate } = useTranslate();
  const { trackClick } = useAnalytics();
  return (
    <div css={[styles.buttonGroup, mixins.flexAlignJustifiedCenter]}>
      <div
        css={[styles.buttonTransitionWallet, mixins.flexAlignJustifiedCenter]}
        onClick={() => {
          transitionRoute && transitionRoute();
          trackClick(CLICK.HISTORY);
        }}
      >
        {translate(`HISTORY`)}
      </div>
      <div css={styles.middleButton}>
        <div
          css={styles.specialButtonCon}
          onClick={() => {
            transferHandler && transferHandler();
            trackClick(CLICK.SCAN);
          }}
        >
          <img src={AssetsImg.ic_scan.src} css={styles.specialButtonImage} />
          {translate(`SCAN`)}
        </div>
      </div>

      <div
        css={[styles.buttonTransitionWallet, mixins.flexAlignJustifiedCenter]}
        onClick={connectWalletHandler}
      >
        {translate(`TRANSFER`)}
      </div>
    </div>
  );
};

export default WalletGroupButton;
