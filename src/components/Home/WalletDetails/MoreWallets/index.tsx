import { FC } from 'react';
import * as styles from './styles';
import { typography } from '@styles/shared';
import { PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import WalletsStack from '@components/Home/WalletDetails/MoreWallets/WalletsStack';
import { ButtonSize } from '@components/Shared/Button/PrimaryButton';
import { useTranslate } from '@utils/useTranslate';

interface MoreWalletsProps {
  onClick: () => void;
}

const MoreWallets: FC<MoreWalletsProps> = ({ onClick }) => {
  const { translate } = useTranslate();
  return (
    <div css={styles.container} onClick={onClick}>
      <div css={styles.header}>
        <span css={typography.T_16_Bold}>{translate(`ADD_MORE_WALLETS`)}</span>
        <div onClick={onClick} css={styles.buttonWhiteBg}>
          <div css={styles.buttonYellowBg}>
            <img src={AssetsImg.ic_small_black_right_arrow.src} />
          </div>
        </div>
      </div>
      <WalletsStack />
    </div>
  );
};

export default MoreWallets;
