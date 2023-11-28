import * as styles from './styles';
import Lottie from 'react-lottie';
import * as checkAnimation from '@public/lottie/checkAnimation.json';
import * as whitelistedAnimation from '@public/lottie/whitelistedAnimation.json';
import { mixins, utils } from '@styles/shared';
import { DividerLine, PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import { FC, useEffect, useState } from 'react';
import { textTruncate } from '@utils/helper';
import router, { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { useTranslate } from '@utils/useTranslate';
import { getConnectWalletConfig } from '@utils/wallet';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';

interface whitelistProps {
  walletType: any;
  message: any;
  address?: any;
}

const WhitelistSuccess: FC<whitelistProps> = ({
  walletType,
  address,
  message,
}) => {
  const [showNear, setShowNear] = useState<boolean>(false);
  const router = useRouter();
  const { translate } = useTranslate();

  const WhitelisteOptions = {
    loop: false,
    autoplay: true,
    animationData: whitelistedAnimation,
  };

  const checkOptions = {
    loop: false,
    autoplay: true,
    animationData: checkAnimation,
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.client_id == `nayaab`) {
        setShowNear(true);
      } else {
        setShowNear(false);
      }
    }
  }, [router.isReady]);

  return (
    <HeaderWithButtonLayout
      ctaContent={
        <div css={utils.ctaContainer}>
          <PrimaryButton
            onClick={() => router.push(Pages.HOME)}
            addStyles={styles.button}
          >
            {translate(`OPEN_WALLET`)}
          </PrimaryButton>
        </div>
      }
    >
      <section
        css={[
          styles.whitelistContainer,
          mixins.flexColumn,
          mixins.flexJustifiedCenter,
        ]}
      >
        <article css={styles.checkAnimation}>
          <Lottie options={checkOptions} />
          <div css={styles.whitelistAnimation}>
            <Lottie options={WhitelisteOptions} />
          </div>
        </article>
        <article>
          <p css={[styles.whitelistText, mixins.textAlignmentCenter]}>
            {translate(`CONGRATULATIONS`)}
          </p>
          <span
            css={[
              styles.whitelistDescription,
              mixins.textAlignmentCenter,
              mixins.flexJustifiedCenter,
            ]}
          >
            {message}
          </span>
        </article>
        <article css={[utils.ml(12), utils.mr(12), utils.mb(40)]}>
          <DividerLine addStyles={styles.divider} />
          <div css={styles.walletStatusContainer}>
            <div css={[styles.walletStatusSection, mixins.flexAlignCenter]}>
              <div css={styles.leftContent}>
                <div css={styles.statusConnected}></div>
                <span css={styles.walletStatus}> {translate(`CONNECTED`)}</span>
              </div>
              {showNear ? <img src={AssetsImg.ic_near_whitelist.src} /> : null}
            </div>
          </div>
          <div
            css={[
              mixins.flexAlignCenterJustifiedBetween,
              styles.walletContainer,
            ]}
          >
            <div css={[mixins.flexAlignJustifiedCenter]}>
              <img
                css={styles.walletIcon}
                src={
                  walletType !== `Metasky`
                    ? getConnectWalletConfig().icon
                    : AssetsImg.ic_metaskySoloIcon.src
                }
                alt="icon"
              />
              <p css={styles.walletText}>{walletType}</p>
            </div>

            {address && (
              <div css={styles.walletAddress}>
                {textTruncate(address, 5, 4)}
                <p css={styles.walletAddressText}>
                  {translate(`WALLET_ADDRESS`)}
                </p>
              </div>
            )}
          </div>
          <div css={[utils.mb(20), utils.mt(20)]} />
        </article>
      </section>
    </HeaderWithButtonLayout>
  );
};

export default WhitelistSuccess;
