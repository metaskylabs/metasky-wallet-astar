import * as styles from '@styles/Modules/burn-tokens';
import {
  BackButton,
  BottomPopup,
  BottomSheet,
  FullScreenKiteLoader,
  FullScreenPopUp,
  PrimaryButton,
  Video,
} from '@components/Shared';
import 'swiper/css';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useState } from 'react';
import { Pages } from '@utils/navigation';
import { useAnalytics } from '@utils/useAnalytics';
import NOOB from '@constants/noob';
import { useUserSession } from '@utils/hooks/useUserSession';
import Authentication from '@components/Authentication';
import { motion } from 'framer-motion';
import AssetsImg from '@public/images';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import { mixins, typography, utils } from '@styles/shared';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import BlueCampaignBanner from '@components/Shared/Bannner/BlueCampaignBanner';
import AuthorDescription from '@components/Detail/AuthorDescription';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import AccountSelector, { ConnectedAccount } from '@components/AccountSelector';
import * as Constants from '@utils/constants';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { WalletCustodyType } from '@typings/api/auth';
import { burnToken, getBurnConfig } from '@actions/wallet';
import { BurnConfigRequestResponse } from '@typings/api/wallet';
import { useTranslate } from '@utils/useTranslate';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { ethers } from 'ethers';
import { ERC20_PEBBLE_ABI } from '@constants/abis';
import {
  useAccount,
  Chain,
  useNetwork,
  useSwitchNetwork,
  WagmiConfig,
} from 'wagmi';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import Kite from '@components/Shared/Kite';
import NetworkSwitchError from '@components/Shared/NetworkSwitchError';
import { ethereumClient, wagmiClient } from '@utils/web3modal-client';

function BurnAmountSheet(props: {
  tokenName?: string;
  totalAvailable: number;
  factor: number;
  onBurn: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(``);
  const [max, setMax] = useState(0);

  useEffect(() => {
    setMax(Math.floor(props.totalAvailable / props.factor));
  }, []);

  return (
    <ButtonLayout
      buttonComponent={
        <motion.div css={[mixins.flexAlignJustifiedCenter]}>
          <Fragment>
            <PrimaryButton
              addStyles={styles.filterApply}
              onClick={() => {
                if (!amount) {
                  setError(`Please specify pebbles to burn`);
                  return;
                }
                if (amount % 1 !== 0) {
                  setError(`Enter valid number`);
                  return;
                }
                if (max === 0) {
                  setError(
                    `Oops! Looks like you do not have enough tokens to burn.`,
                  );
                  return;
                }
                if (amount > max) {
                  setError(`You can mint maximum of ${max} NFTs`);
                  return;
                }
                props.onBurn(amount * props.factor);
              }}
            >
              BURN
            </PrimaryButton>
          </Fragment>
        </motion.div>
      }
    >
      <div css={styles.subtitle}>
        Please specify the details required to burn pebbles
      </div>
      <div css={styles.dataContainer}>
        <div>
          <span css={styles.label}>{`Total Pebbles Available`}</span>
          <input
            css={styles.searchInput}
            maxLength={100}
            disabled
            value={props.totalAvailable}
          />
        </div>
        <div>
          <span css={styles.label}>{`No. of Pebbles Burnt Per NFT`}</span>
          <input
            css={styles.searchInput}
            maxLength={100}
            disabled
            value={props.factor}
          />
        </div>
        <div>
          <div css={mixins.flexJustifiedBetween}>
            <span css={styles.label}>{`No. of NFTs you want to burn for`}</span>
            <span
              css={styles.chip}
              onClick={() => {
                setAmount(max);
              }}
            >{`Max`}</span>
          </div>
          <div css={styles.inputContainer}>
            <input
              css={styles.input}
              style={{ flex: 1 }}
              maxLength={100}
              value={amount ? amount.toString() : ``}
              type={`number`}
              onChange={(e) => {
                const value = Math.floor(Number(e.target.value));
                if (value >= 0) {
                  setAmount(value);
                  if (max === 0) {
                    setError(
                      `Oops! Looks like you do not have enough tokens to burn.`,
                    );
                    return;
                  }
                  if (value > max)
                    setError(`You can mint maximum of ${max} NFTs`);
                  else setError(``);
                }
              }}
            />
            <span css={[typography.T_16_Regular]}>{`  / ${max}`}</span>
          </div>
          {error ? (
            <span css={styles.error}>{error}</span>
          ) : (
            <span css={styles.message}>
              {amount > 0
                ? `You will be burning ${amount * props.factor} pebbles`
                : ``}
            </span>
          )}
        </div>
      </div>
    </ButtonLayout>
  );
}

const BurnTokens: FC = () => {
  const router = useRouter();
  const amplitude = useAnalytics();
  const { isLoggedIn } = useUserSession();
  const [imageShimmer, setImageShimmer] = useState(false);
  const [data, setData] = useState<Partial<BurnConfigRequestResponse>>({});
  const [loading, setLoading] = useState(false);
  const [walletSelectorConfig, setWalletSelectedConfig] = useState<{
    open: boolean;
    onAccountSelect?: (account?: ConnectedAccount) => void;
    onAccountSelectCancel?: () => void;
  }>({
    open: false,
  });
  const connectedAccData = useAccount();
  const [burnAmountState, setBurnAmountState] = useState<{
    open: boolean;
    totalAvailable: number;
    factor: number;
    onBurnAmount?: (amount: number) => void;
    onBurnAmountCancel?: () => void;
  }>({ open: false, totalAvailable: 0, factor: 1 });
  const { translate } = useTranslate();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [benefitError, setBenefitError] = useState<{
    open: boolean;
    title: string;
    description: React.ReactNode;
    img?: React.ReactNode;
    onClose?: () => void;
  }>({ open: false, title: ``, description: ``, img: `` });
  const [switchErrorOpen, setSwitchErrorOpen] = useState(false);

  const getMMError = (reason: string) => {
    if (reason.includes(`!Qty`) || reason.includes(`!RecQty`)) {
      return translate(`SORRY_NOT_ELIGIBLE_TO_MINT`);
    }

    if (reason.includes(`!MaxSupply`)) {
      return translate(`SORRY_NO_MORE_NFTS_TO_MINT`);
    }

    if (reason.includes(`insufficient`)) {
      return translate(`SORRY_INSUFFICIENT_BALANCE_TRY_OTHERS`);
    }

    if (reason.includes(`rejected`)) {
      return translate(`SORRY_USER_REJECTED_TRANSACTION`);
    }

    return reason;
  };

  const fetchBurnConfig = async () => {
    getBurnConfig(router.query.tokenId as string)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!router.query.tokenId || !isLoggedIn) return;
    setLoading(true);
    fetchBurnConfig();
  }, [router.query.tokenId, isLoggedIn]);

  const getAccount = async (): Promise<ConnectedAccount | undefined> => {
    return new Promise((resolve, reject) => {
      setWalletSelectedConfig({
        open: true,
        onAccountSelect: (account) => resolve(account),
        onAccountSelectCancel: () => resolve(undefined),
      });
    });
  };

  const getBurnStats = async (
    account: ConnectedAccount,
  ): Promise<{ availableTokens: number } | undefined> => {
    const item = data.user_asset_details?.find(
      (detail) => detail.wallet_uuid === account.wallet_uuid,
    );
    if (item) {
      return {
        availableTokens: item.user_token_balance,
      };
    }
  };

  const getBurnAmount = async (
    availablePebles: number,
  ): Promise<number | undefined> => {
    return new Promise((resolve, reject) => {
      setBurnAmountState({
        open: true,
        factor: data.pebble_burn_factor!,
        totalAvailable: availablePebles,
        onBurnAmount: resolve,
        onBurnAmountCancel: () => resolve(undefined),
      });
    });
  };

  const burnUsingCustodial = async (amount: number) => {
    try {
      const response = await burnToken(data.token_uuid!, amount);
      await fetchBurnConfig();
      if (response?.data?.order_uuid) {
        router.push(
          `${Pages.TRANSACTION_DETAILS}/${response?.data?.order_uuid}`,
        );
      }
      generateToast({
        type: ToastType.SUCCESS,
        content: `Successfully burned the pebbles. You will be able to claim the NFT in 5 minutes.`,
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const burnUsingNonCustodial = async (
    account: ConnectedAccount,
    amount: number,
  ) => {
    try {
      setBenefitError({
        img: <Kite />,
        description: translate(`WAITING_FOR_TRANSACTION_ON_BLOCKCHAIN`) || ``,
        open: true,
        title: translate(`CONFIRM_TRANSACTION_ON_YOUR_WALLET`) || ``,
      });
      if (
        (await connectedAccData.connector?.getChainId()) !==
        Constants.NFTBlockchainMap[data.chain!]?.chainId
      ) {
        try {
          await switchNetworkAsync?.(
            Constants.NFTBlockchainMap[data.chain!]?.chainId,
          );
        } catch (error) {
          setBenefitError({
            description: ``,
            open: false,
            title: ``,
          });
          setSwitchErrorOpen(true);
          return;
        }
      }
      if (
        account.ethAddress !== connectedAccData.address ||
        !connectedAccData.isConnected
      ) {
        generateToast({
          type: ToastType.ERROR,
          content: `Selected account not connected`,
        });
        return;
      }
      const walletClient = await wagmiClient.connector?.getWalletClient({
        chainId: Constants.NFTBlockchainMap[data.chain!]?.chainId,
      });
      if (!walletClient) {
        setBenefitError({
          open: true,
          title: `Oops! Burn Failed`,
          description: `Wallet client not present`,
          img: (
            <img
              src={AssetsImg.ic_failed.src}
              css={{
                width: utils.remConverter(100),
                height: utils.remConverter(100),
                marginBottom: utils.remConverter(20),
              }}
            />
          ),
        });
        return;
      }
      const txn = await walletClient.writeContract({
        functionName: `burn`,
        address: data.onchain_address! as any,
        abi: ERC20_PEBBLE_ABI,
        args: [ethers.utils.parseUnits(amount.toString(), 18)],
      });
      console.log(`Write contract`, txn);
      const txnResult =
        await wagmiClient.publicClient.waitForTransactionReceipt({
          hash: txn,
        });
      console.log({ txnResult });
      if (txnResult.status === `reverted`) {
        setBenefitError({
          open: true,
          title: `Oops! Burn Failed`,
          description: `Transaction reverted`,
          img: (
            <img
              src={AssetsImg.ic_failed.src}
              css={{
                width: utils.remConverter(100),
                height: utils.remConverter(100),
                marginBottom: utils.remConverter(20),
              }}
            />
          ),
        });
        return;
      }

      setBenefitError({
        img: (
          <img
            src={AssetsImg.ic_succes_93.src}
            css={{
              width: utils.remConverter(100),
              height: utils.remConverter(100),
              marginBottom: utils.remConverter(20),
            }}
          />
        ),
        description: (
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
            }}
          >
            <span>
              Successfully burned the pebbles. You will be able to claim the NFT
              in sometime.
            </span>
            <span
              css={styles.link}
              onClick={() => {
                router.push(`${Pages.PURCHASE_NFT}/${data.mint_listing_uuid}`);
              }}
            >
              Continue to Mint
            </span>
          </div>
        ),
        open: true,
        title: `Transaction Successful`,
        onClose: () => {
          router.push(`/`);
        },
      });
      await fetchBurnConfig();
    } catch (error) {
      console.log(error);
      const metamaskErrorReason = (error as any)[`reason`];

      setBenefitError({
        img: (
          <img
            src={AssetsImg.ic_failed.src}
            css={{
              width: utils.remConverter(100),
              height: utils.remConverter(100),
              marginBottom: utils.remConverter(20),
            }}
          />
        ),
        description:
          typeof error === `object` && metamaskErrorReason
            ? `${getMMError(metamaskErrorReason)}`
            : `Failed to burn pebble.`,
        open: true,
        title: `Oops! Burn Failed`,
      });
      return;
    }
  };

  const processBurn = async () => {
    const account = await getAccount().then((account) => {
      if (!account) {
        // generateToast({
        //   type: ToastType.ERROR,
        //   content: `Oops! Please select an account to continue.`,
        // });
        return;
      }
      return account;
    });
    if (!account) return;
    console.log(`Account`, account);
    const burnStat = await getBurnStats(account);
    if (!burnStat) return;
    const burnAmount = await getBurnAmount(burnStat.availableTokens);
    if (!burnAmount) return;
    console.log(`Burn Metadata`, account, burnStat, burnAmount);
    if (account.type === WalletCustodyType.CUSTODIAL)
      return burnUsingCustodial(burnAmount);
    return burnUsingNonCustodial(account, burnAmount);
  };

  if (!isLoggedIn) {
    return (
      <FullScreenPopUp isOpen={true}>
        <Authentication setLoginStatus={NOOB} onSuccess={NOOB} isPopUp={true} />
      </FullScreenPopUp>
    );
  }

  if (loading) {
    return (
      <FullScreenKiteLoader isOpen={loading}>
        <div css={styles.loaderContentInfo}>{translate(`PAGE_LOADING`)}...</div>
      </FullScreenKiteLoader>
    );
  }

  return (
    <>
      <div>
        <motion.div
          css={styles.headerContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            default: { duration: 0.5 },
            ease: `easeIn`,
          }}
        >
          {data?.media_type === `video` ? (
            <div style={{ width: `100%`, height: `100%` }}>
              <Video
                source={data?.image || ``}
                width="100%"
                height="100%"
                disablePictureInPicture={true}
                controls={false}
                //   addStyles={styles.imageWidth}
                controlsList="nodownload"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                onDurationChange={() => {
                  const imgRef = document.getElementsByClassName(
                    `nftVideo`,
                  )[0] as HTMLDivElement;
                  imgRef.style.display = `block`;
                  setImageShimmer(false);
                }}
              />
            </div>
          ) : (
            <img
              src={data?.image ? data?.image : AssetsImg.i_default}
              // css={styles.imageWidth}
              width="100%"
              height="100%"
              className="nftMedia"
              onLoad={() => {
                const imgRef = document.getElementsByClassName(
                  `nftMedia`,
                )[0] as HTMLDivElement;
                imgRef.style.display = `block`;
                setImageShimmer(false);
              }}
            />
          )}
          {imageShimmer && <ShimmerLargeImage />}
          {<BackButton addStyles={styles.backButton} />}
        </motion.div>
        <span css={[styles.cardAccessText, mixins.flexAlignJustifiedCenter]}>
          {false ? (
            <ShimmerCard isEffect={true} height={30} borderRadius={10} />
          ) : (
            data.title
          )}
        </span>
        <motion.div css={[mixins.flexAlignJustifiedCenter]}>
          <Fragment>
            <PrimaryButton addStyles={styles.filterApply} onClick={processBurn}>
              {data.cta_name}
            </PrimaryButton>
          </Fragment>
        </motion.div>
        <div css={styles.bodyContainer}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              default: { duration: 0.5 },
              ease: `easeIn`,
            }}
          >
            {/* <div css={[utils.mb(40)]}>
              <BlueCampaignBanner
                title={`You have NFT ready to be minted. Click to mint.`}
                link={``}
                type={`INTERNAL_REDIRECT`}
              />
            </div> */}
            <span css={styles.benefitsText}>{`Description`}</span>
            <AuthorDescription description={data.description} />
          </motion.div>
        </div>
        <BottomPopup
          size={BottomPopupSize.MEDIUM}
          isOpen={walletSelectorConfig.open}
          title="Select Account"
          onClose={() => {
            walletSelectorConfig.onAccountSelectCancel?.();
            setWalletSelectedConfig({
              open: false,
            });
          }}
        >
          <AccountSelector
            onChange={(account) => {
              walletSelectorConfig.onAccountSelect?.(account);
              setWalletSelectedConfig({
                open: false,
              });
            }}
            hideEthAccounts={Number(data?.chain_id || ``) === 0}
          />
        </BottomPopup>
        <BottomPopup
          size={BottomPopupSize.MEDIUM}
          isOpen={burnAmountState.open}
          title="Burn Pebble"
          onClose={() => {
            burnAmountState.onBurnAmountCancel?.();
            setBurnAmountState({
              open: false,
              factor: 1,
              totalAvailable: 0,
            });
          }}
        >
          <BurnAmountSheet
            onBurn={(amount) => {
              burnAmountState.onBurnAmount?.(amount);
              setBurnAmountState({
                open: false,
                factor: 1,
                totalAvailable: 0,
              });
            }}
            totalAvailable={burnAmountState.totalAvailable}
            factor={burnAmountState.factor}
          />
        </BottomPopup>
        <BottomPopup
          isOpen={benefitError.open}
          onClose={() => {
            setBenefitError({
              open: false,
              title: ``,
              description: ``,
            });
          }}
        >
          <ErrorBottomSheet
            img={benefitError.img}
            title={benefitError.title}
            description={benefitError.description}
          />
        </BottomPopup>
        {switchErrorOpen && (
          <BottomPopup
            isOpen={true}
            onClose={() => {
              setSwitchErrorOpen(false);
            }}
          >
            <NetworkSwitchError
              chain={data.chain || ``}
              chainId={Number(data.chain_id || `0`)}
            />
          </BottomPopup>
        )}
      </div>
    </>
  );
};

export default BurnTokens;
