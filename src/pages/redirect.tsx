import { discordGating, discordUserInfo } from '@actions/wallet';
import Authentication from '@components/Authentication';
import { FullScreenPopUp, PrimaryButton } from '@components/Shared';
import { mixins } from '@styles/shared';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import * as styles from '@styles/Modules/redirect';
import AssetsImg from '@public/images';
import { handleErrorMessage } from '@utils/handleResponseToast';
import Kite from '@components/Shared/Kite';
import { useAccount } from 'wagmi';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { Pages } from '@utils/navigation';

enum Status {
  SUCCESS,
  FAILED,
  LOADING,
}

type Info = Partial<{
  'Discord Server': string;
  'Discord User': string;
  Email: string;
  Phone: string;
}>;

type InfoKey = keyof Info;

function UserInfo(props: Info) {
  return (
    <div css={styles.infoContainer}>
      {(Object.keys(props) as InfoKey[])
        .filter((k) => props[k])
        .map((k) => (
          <div key={k} css={mixins.flexJustifiedBetween}>
            <span css={styles.info}>{k}:</span>
            <span css={styles.info}>{props[k]}</span>
          </div>
        ))}
    </div>
  );
}

export default function Redirect() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [status, setStatus] = useState(Status.LOADING);
  const router = useRouter();
  const { address } = useAccount();
  const [info, setInfo] = useState<Info>({});
  const { discordServerId, discordUserId } = router.query;

  const handleDiscordGating = async () => {
    try {
      const response = await discordUserInfo({
        discordServerId: discordServerId as string,
        discordUserId: discordUserId as string,
      });
      const data = response?.data?.data;
      setInfo({
        'Discord Server': data?.serverInformation?.discordServerName,
        'Discord User': data?.serverInformation?.discordUserName,
        Email: data?.userInformation?.email,
        Phone: data?.userInformation?.contactNumber,
      });
    } catch (error) {
      setStatus(Status.FAILED);
      return;
    }
    try {
      await discordGating({
        discordServerId: discordServerId as string,
        discordUserId: discordUserId as string,
      });
      setStatus(Status.SUCCESS);
    } catch (e) {
      setStatus(Status.FAILED);
      handleErrorMessage(e);
    }
  };

  return (
    <Fragment>
      <FullScreenPopUp isOpen={isLoggedIn}>
        <Authentication
          setLoginStatus={(status) => setIsLoggedIn(status)}
          onSuccess={() => handleDiscordGating()}
          isPopUp={true}
          disableSuccessLoginToast
        />
      </FullScreenPopUp>
      {status === Status.SUCCESS && (
        <ButtonLayout
          buttonComponent={
            <div css={[styles.ctaContainer, mixins.flexAlignJustifiedCenter]}>
              <PrimaryButton
                addStyles={styles.cta}
                onClick={() => {
                  router.push(Pages.HOME);
                }}
              >
                BROWSE WALLET
              </PrimaryButton>
            </div>
          }
        >
          <div
            css={[
              styles.purchaseSuccessIcon,
              mixins.flexAlignJustifiedCenter,
              mixins.flexColumn,
            ]}
          >
            <div css={[styles.successIcon, mixins.flexAlignJustifiedCenter]}>
              <img
                src={AssetsImg.ic_succes_93.src}
                alt="success"
                css={styles.successImg}
              />
            </div>
            <h2 css={[styles.purchaseCongratulation]}>Congratulations</h2>
            <p css={[styles.purchaseDescription]}>
              Your SkyWallet is successfully connected to Discord. You may now
              close this window.{` `}
            </p>
            {Object.values(info).some((k) => k) && (
              <div css={styles.infoRoot}>
                <UserInfo {...info} />
              </div>
            )}
          </div>
        </ButtonLayout>
      )}
      {status === Status.FAILED && (
        <ButtonLayout
          buttonComponent={
            <div css={[styles.ctaContainer, mixins.flexAlignJustifiedCenter]}>
              <PrimaryButton
                addStyles={styles.cta}
                onClick={() => {
                  router.push(Pages.HOME);
                }}
              >
                BROWSE WALLET
              </PrimaryButton>
            </div>
          }
        >
          <div
            css={[
              styles.purchaseSuccessIcon,
              mixins.flexAlignJustifiedCenter,
              mixins.flexColumn,
            ]}
          >
            <div css={[styles.successIcon, mixins.flexAlignJustifiedCenter]}>
              <img
                src={AssetsImg.ic_failed.src}
                alt="error"
                css={styles.successImg}
              />
            </div>
            <h2 css={[styles.purchaseCongratulation]}>Request Failed</h2>
            <p css={[styles.purchaseDescription]}>
              Sorry! It seems like we were not able to connect Discord with your
              SkyWallet.
            </p>
            {Object.values(info).some((k) => k) && (
              <div css={styles.infoRoot}>
                <UserInfo {...info} />
              </div>
            )}
          </div>
        </ButtonLayout>
      )}
      {status === Status.LOADING && (
        <div css={styles.loaderContainer}>
          <Kite />
          <div css={styles.loaderContentInfo}>
            Page is Loading. Please wait...
          </div>
        </div>
      )}
    </Fragment>
  );
}
