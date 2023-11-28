import React, { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import {
  AuthenticationScreen,
  LocalStorageVariables,
} from '@constants/authentication';
import { setUserLogin, whiteListUsers } from '@actions/auth';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { Pages } from '@utils/navigation';
import { IframeMessageType } from '@utils/constants';
import { BottomSheet, FullScreenKiteLoader } from '@components/Shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { WhitelistRefType } from '@typings/api/auth';
import AssetsImg from '@public/images';
import { BigNumber } from 'ethers';
import WhitelistSuccess from '@components/WhitelistSuccess';
import {
  deleteToken,
  getParentFromClientId,
  sendMessageToParent,
} from '@utils/helper';
import { InjectedConnector } from 'wagmi/connectors/injected';
import useSignInWithEthereum from '@utils/hooks/Siwe';
import { useTranslate } from '@utils/useTranslate';
import { useDispatch } from 'react-redux';
import LoginWithMetamaskComponent from './LoginWithMetamask';
import { getAccessToken } from '@utils/cookie';

type AppProps = {
  handleScreen?: (screeName: AuthenticationScreen) => void;
  setWalletSheetClose?: (status: boolean) => void;
  isPopUp: boolean;
  setLoginStatus?: (status: boolean) => void;
  onSuccess?: () => void;
  disableSuccessLoginToast?: boolean;
};

interface BalanceType {
  symbol: string;
  value: BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
}

const WHITELIST_SUCCESS_MESSAGE = `You’ve been successfully whitelisted and your wallet has been created.`;
const COMPLETE_SIGNIN = `Complete your sign in to continue`;
const WHITELIST_SUCCESS_MSG = `You have already been whitelisted.`;
const ALREADY_WHITELISTED_MSG = `The connected wallet has already been whitelisted.`;

const LoginWithMetamask: FC<AppProps> = ({
  handleScreen,
  setWalletSheetClose,
  isPopUp,
  setLoginStatus,
  onSuccess,
  disableSuccessLoginToast,
}) => {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect({});
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const { translate } = useTranslate();

  useEffect(() => {
    const connectMetamask = async () => {
      if (!isConnected) {
        await connect();
      }
    };
    connectMetamask();
  }, []);

  useEffect(() => {
    const connectMetamask = async () => {
      if (!address) {
        await connect();
      }
    };
    connectMetamask();
  }, [address]);

  const SIWE = useSignInWithEthereum();
  const [isWhitelistApiCalled, setIsWhitelistApiCalled] =
    useState<boolean>(false);

  const [whitelistingSheetStatus, setWhitelistingSheetStatus] = useState<{
    open: boolean;
    message?: string;
    address?: string;
  }>({
    open: false,
  });

  const router = useRouter();

  const { whitelist, client_id } = router.query;

  // todo: What is this?
  useEffect(() => {
    window.addEventListener(`message`, function (e) {
      if (e.data.status == `success`) {
        setIsWhitelistApiCalled(false);
        setWhitelistingSheetStatus({
          open: true,
          message: e.data.message,
          address: e.data.wallet_address,
        });
      } else if (e.data.status === `fail`) {
        generateToast({
          content: e.data.error_message,
          type: ToastType.ERROR,
        });
        handleScreen && handleScreen(AuthenticationScreen.authMain);
        setIsWhitelistApiCalled(false);
      }
    });
  }, []);

  const handleLogIn = async () => {
    if (address && !getAccessToken()) {
      generateToast({
        type: ToastType.INFO,
        content: COMPLETE_SIGNIN,
      });
      await SIWE.sign(address);
      if (!getAccessToken()) return;
    }

    // todo: why in this function?
    if (address) {
      sendMessageToParent(
        JSON.stringify({
          wallet_address: address,
        }),
      );
      sendMessageToParent(
        JSON.stringify({
          metaToken: getAccessToken(),
          walletAddress: address,
        }),
      );
      sendMessageToParent(
        JSON.stringify({
          event: IframeMessageType.loginSuccess,
          payload: {
            bearerToken: getAccessToken(),
            walletAddress: {
              ethAddress: address,
            },
          },
        }),
      );
    }

    // todo: fix whitelist and iframe flow, have to refactor later on.
    if (address) {
      if (whitelist) {
        if (
          localStorage.getItem(address) &&
          localStorage.getItem(address) === `true`
        ) {
          setWhitelistingSheetStatus({
            open: true,
            message: WHITELIST_SUCCESS_MSG,
          });
        } else {
          try {
            const whiteListResponse = await whiteListUsers({
              ref: address,
              refType: WhitelistRefType.PUBLIC_ADDRESS,
              chain: `ETHEREUM`,
            });
            sendMessageToParent(
              JSON.stringify({ event: IframeMessageType.whitelistComplete }),
            );
            if (whiteListResponse?.requestId) {
              setWhitelistingSheetStatus({
                open: true,
                message: WHITELIST_SUCCESS_MESSAGE,
              });
              deleteToken(LocalStorageVariables.METAWHITELIST);
              if (window.parent) {
                const frameHost = getParentFromClientId(client_id as string);
                window.parent.postMessage(IframeMessageType, frameHost);
              }
            } else {
              setWhitelistingSheetStatus({
                open: true,
                message: ALREADY_WHITELISTED_MSG,
              });
              deleteToken(LocalStorageVariables.METAWHITELIST);
              if (window.parent) {
                const frameHost = getParentFromClientId(client_id as string);
                window.parent.postMessage(IframeMessageType, frameHost);
              }
            }
          } catch (error) {
            handleErrorMessage(error);
          }
        }
      } else {
        if (setWalletSheetClose === undefined) {
          if (!disableSuccessLoginToast)
            generateToast({
              content: translate(`LOGGED_IN_SUCCESSFULLY`),
              type: ToastType.SUCCESS,
            });
          if (isPopUp) {
            onSuccess && onSuccess();
            setLoginStatus && setLoginStatus(false);
            setUserLogin(true);
          } else {
            router.push(Pages.HOME);
            setUserLogin(true);
          }
        } else {
          setWalletSheetClose(false);
        }
      }
    }
  };

  const disconnectWallet = async () => {
    disconnect();
    if (setWalletSheetClose === undefined && handleScreen) {
      handleScreen(AuthenticationScreen.authMain);
    } else if (setWalletSheetClose) {
      setWalletSheetClose(false);
    }
  };

  return (
    <Fragment>
      {address ? (
        <LoginWithMetamaskComponent
          address={address}
          onContinue={handleLogIn}
          onDisconnect={disconnectWallet}
        />
      ) : (
        <></>
      )}
      {whitelistingSheetStatus.open && (
        <BottomSheet
          isOpen={whitelistingSheetStatus.open}
          addStyles={styles.bottomSheetHeight}
        >
          <WhitelistSuccess
            walletType="MetaMask"
            address={address}
            message={whitelistingSheetStatus.message}
          />
        </BottomSheet>
      )}
      <FullScreenKiteLoader isOpen={isWhitelistApiCalled}>
        {translate(`LOADING`)} ..
      </FullScreenKiteLoader>
    </Fragment>
  );
};

interface AccountProps {
  details: string;
  balance?: string;
  isActive: boolean;
  symbol?: string;
}

const Account: FC<AccountProps> = ({ details, balance, isActive, symbol }) => {
  return (
    <div css={styles.account}>
      <div css={styles.flexItem}></div>
      <div css={[styles.flexItem]}>
        <img src={AssetsImg.ic_metamaskAvatar.src} />
      </div>
      <div css={styles.flexItem}>
        <div>
          <div css={styles.details}>{details}</div>
          {balance && (
            <div css={styles.balance}>
              {(Number(balance) * Math.pow(10, -18)).toFixed(5)}
              {symbol ? ` ${symbol}` : ``}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWithMetamask;
