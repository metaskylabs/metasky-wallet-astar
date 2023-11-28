import AssetsImg from '@public/images';
import { FC, Fragment } from 'react';
import { FullScreenBottomSheet } from '@components/Shared';
import { mixins, typography } from '@styles/shared';
import * as styles from './styles';
import LoginWithMetamask from '@components/Authentication/LoginWithMetamask';
import { motion } from 'framer-motion';
import { ConnectionState, WalletType } from '@constants/wallet';
import { useTranslate } from '@utils/useTranslate';
import { ConnectionIcon } from '@components/Home/WalletDetails/WalletState';
import {
  getConfigDetails,
  walletConfigEntities,
} from '@constants/walletConfig';
import { getConnectWalletConfig } from '@utils/wallet';
import { useUserSession } from '@utils/hooks/useUserSession';

interface BenefitsSwiperProps {
  walletConnectOpen: boolean;
  isOpen: boolean;
  refreshAssets?: () => void;
  setWalletConnectOpen: (status: boolean) => void;
  setIsopen: (status: boolean) => void;
}

const HeaderTab: FC<BenefitsSwiperProps> = ({
  refreshAssets,
  setWalletConnectOpen,
  setIsopen,
  isOpen,
  walletConnectOpen,
}) => {
  const session = useUserSession();

  const handleSheetCloseAndRefresh = (status: boolean) => {
    if (refreshAssets) {
      refreshAssets();
    }
    setWalletConnectOpen(status);
  };

  const { translate } = useTranslate();

  const getConfig = () => {
    if (session.wallets?.includes(WalletType.SKYWALLET)) {
      return getConfigDetails(
        WalletType.SKYWALLET as any as walletConfigEntities,
      );
    }
    if (
      (session.connectedNearWallets?.length || 0) > 0 &&
      (session.connectedWallets?.length || 0) > 0
    ) {
      return getConfigDetails(
        WalletType.SKYWALLET as any as walletConfigEntities,
      );
    }
    if ((session.connectedNearWallets?.length || 0) > 0) {
      return getConfigDetails(WalletType.NEAR as any as walletConfigEntities);
    }
    const connectWalletConfig = getConnectWalletConfig();
    return {
      name: connectWalletConfig.displayName,
      icon: connectWalletConfig.icon,
    };
  };

  return (
    <Fragment>
      <motion.div
        css={[styles.header, mixins.flexAlignCenterJustifiedBetween]}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          default: { duration: 0.5 },
          ease: `easeIn`,
        }}
      >
        <div css={[mixins.flexAlignCenter]}>
          <span css={typography.T_20_Bold}>{translate(`MY_WALLET`)}</span>
        </div>
        {session.isLoggedIn && (
          <section
            css={[mixins.flexAlignCenter, styles.loginSectionStatus]}
            onClick={() => setIsopen(!isOpen)}
          >
            <div css={styles.connectionIconContainer}>
              <ConnectionIcon
                addStyles={styles.connectionIcon}
                state={ConnectionState.CONNECTED}
              />
            </div>

            <img css={styles.loginIcon} src={getConfig().icon} alt="icon" />

            <p css={styles.myWallet}>{getConfig().name}</p>

            <img
              css={styles.arrowContainer}
              src={AssetsImg.ic_arrowDownBlack.src}
            />
          </section>
        )}
      </motion.div>
      {walletConnectOpen && (
        <FullScreenBottomSheet
          isOpen={walletConnectOpen}
          onClose={() => setWalletConnectOpen(false)}
        >
          <LoginWithMetamask
            setWalletSheetClose={(status: boolean) =>
              handleSheetCloseAndRefresh(status)
            }
            isPopUp={false}
          />
        </FullScreenBottomSheet>
      )}
    </Fragment>
  );
};

export default HeaderTab;
