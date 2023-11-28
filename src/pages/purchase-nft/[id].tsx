import * as styles from '@styles/Modules/purchaseNFT';
import AssetsImg from '@public/images';
import {
  BackButton,
  BottomPopup,
  CardNfts,
  CardProperties,
  FullScreenKiteLoader,
  FullScreenPopUp,
  MLottie,
  PrimaryButton,
  SecondaryButton,
  Video,
} from '@components/Shared';
import 'swiper/css';
import TokenInformation, { RarityInfo } from '@components/Detail/TokenInfo';
import AuthorDescription from '@components/Detail/AuthorDescription';
import DetailCard from '@components/Detail/DetailCard';
import { mixins, typography, utils } from '@styles/shared';
import React, {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import * as Constants from '@utils/constants';
import { Pages } from '@utils/navigation';
import {
  GetListingsRespone,
  TicketUserInput,
  WalletBenefitsResponse,
} from '@typings/api/wallet';
import {
  clearChainBalanceCache,
  getBenefitAccessInfo,
  getMintEligibility,
  getMintSignature,
  getOneListing,
} from '@actions/wallet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { AxiosError } from 'axios';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from 'wagmi';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import {
  getPaymentOptions,
  getPreviewDetails,
  previewAndBuyingListing,
} from '@actions/payment';
import Authentication from '@components/Authentication';
import KYC from '@components/Kyc';
import {
  getToken,
  isPanVerified,
  limitDecimal,
  sendMessageToParent,
  textTruncate,
} from '@utils/helper';
import ExclusiveBenefits from '@components/Benefits/ExclusiveBenefits';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { motion } from 'framer-motion';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import { BenefitType, ListingType, WalletType } from '@constants/wallet';
import AnimationCustomNayaabLoader from '@components/AnimationCustomNayaabLoader';
import { CLICK, click, EVENT_PAGE } from '@constants/analytics';
import ConfirmDeleteListing from '@components/ConfirmDeleteListing';
import PurchaseAddon, { PurchaseAddOnItem } from '@components/PurchaseAddon';
import PurchaseAddress from '@components/PurchaseAddon/PurchaseAddress';
import NFTListingFlow, { FlowName } from '@components/NFTListingFlow';
import CreateOffer from '@components/MakeOffer/CreateOffer';
import {
  getNFTMeOfferList,
  makeOffer,
  resetNFTOfferList,
} from '@actions/makeOffer';
import { onlyNumber } from '@utils/regexes';
import { useDispatch, useSelector } from 'react-redux';
import { StatusState, StoreState } from '@reducers';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { State as userProfileState } from '@reducers/user';
import OfferLists from '@components/MakeOffer/OfferList';
import { NFTOfferList } from '@typings/api/makeOffer';
import { FetchingState } from '@constants/redux';
import { LocalStorageVariables } from '@constants/authentication';
import { ErrorResponse } from '@typings/api/error';
import BenefitCardEnhanced from '@components/Benefits/BenefitCardEnhanced';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import { PaymentOption } from '@constants/payment';
import PaymentOptionBottomSheet from '@components/PaymentOptionBottomSheet';
import { listingPreviewResponse } from '@typings/api/payment';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { setLogout } from '@actions/auth';
import useLinkHandler from '@utils/hooks/useLinkHandler';
import BlueCampaignBanner from '@components/Shared/Bannner/BlueCampaignBanner';
import { Client } from '@constants/clients';
import { useTranslate } from '@utils/useTranslate';
import {
  ERC721_PEBBLE_SIGNATURE_DROP_ABI,
  ERC721_SIGNATURE_DROP_MINATO,
  ERCC721_DROP_ABI_V2,
} from '@constants/abis';
import Kite from '@components/Shared/Kite';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import PurchaseListing from '@components/PurchaseListing';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import ViewOffer from '@components/MakeOffer/ViewOffer';
import NOOB from '@constants/noob';
import { useAnalytics } from '@utils/useAnalytics';
import { isEmpty, isString } from 'lodash';
import { usePriorityUserAccount } from '@utils/hooks/usePriorityAccount';
import AccountSelector, { ConnectedAccount } from '@components/AccountSelector';
import { useUserSession } from '@utils/hooks/useUserSession';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { WalletCustodyType } from '@typings/api/auth';
import BurnMintAssetInfo from '@components/Detail/BurnMintAssetInfo';
import NetworkSwitchError from '@components/Shared/NetworkSwitchError';
import { getEthersSigner } from '@utils/ethers-viem-adapter';
import { QuantitySelector } from '@components/purchase-nft/QuantitySelector';

function BurnedTokenNftClaimSheet(props: {
  totalAvailable: number;
  onMint: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(``);
  return (
    <ButtonLayout
      buttonComponent={
        <motion.div css={[mixins.flexAlignJustifiedCenter]}>
          <Fragment>
            <PrimaryButton
              addStyles={styles.filterApply}
              onClick={() => {
                if (!amount) {
                  setError(`Please specify No. of NFTs to mint`);
                  return;
                }
                if (amount % 1 !== 0) {
                  setError(`Enter valid number`);
                  return;
                }
                if (props.totalAvailable === 0) {
                  setError(
                    `Oops! Looks like you cannot mint any NFTs as of now.`,
                  );
                  return;
                }
                if (amount > props.totalAvailable) {
                  setError(`You can mint max ${props.totalAvailable} NFT`);
                  return;
                }
                props.onMint(amount);
              }}
            >
              MINT
            </PrimaryButton>
          </Fragment>
        </motion.div>
      }
    >
      <div css={styles.subtitle}>
        Please specify the details required to mint NFT
      </div>
      <div css={styles.dataContainer}>
        <div>
          <span css={styles.label}>{`Total NFTs Mintable`}</span>
          <input
            css={styles.searchInput}
            maxLength={100}
            disabled
            value={props.totalAvailable}
          />
        </div>
        <div>
          <div css={mixins.flexJustifiedBetween}>
            <span css={styles.label}>{`No. of NFTs you want to mint`}</span>
            <span
              css={styles.chip}
              onClick={() => {
                setAmount(props.totalAvailable);
              }}
            >{`Max`}</span>
          </div>
          <div css={styles.inputContainer}>
            <input
              css={styles.input}
              maxLength={100}
              value={amount ? amount.toString() : ``}
              type={`number`}
              onChange={(e) => {
                const value = Math.floor(Number(e.target.value));
                if (value >= 0) {
                  setAmount(value);
                  if (props.totalAvailable === 0) {
                    setError(
                      `Oops! Looks like you cannot mint any NFTs as of now.`,
                    );
                    return;
                  }
                  if (value > props.totalAvailable)
                    setError(`You can mint max ${props.totalAvailable} NFT`);
                  else setError(``);
                }
              }}
              style={{ flex: 1 }}
            />
            <span
              css={[typography.T_16_Regular]}
            >{`  / ${props.totalAvailable}`}</span>
          </div>
          <span css={styles.error}>{error}</span>
        </div>
      </div>
    </ButtonLayout>
  );
}

const PurchaseNFT: FC = () => {
  const router = useRouter();
  const exclusiveBenefitsRef = useRef<HTMLDivElement>(null);
  const { query } = router;
  const [pageData, setPageData] = useState<GetListingsRespone>();
  const { onBack, autoClaim } = query;
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isKiteLoader, setIsKiteLoader] = useState<boolean>(false);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMakeOfferLoggedIn, setMakeOfferIsLoggedIn] =
    useState<boolean>(false);
  const [openAuthFlowNoAction, setOpenAuthFlowNoAction] = useState(false);
  const [isPurchaseDisabled, setIsPurchaseDisabled] = useState<boolean>(false);
  const [propertiesOpen, setPropertiesOpen] = useState<boolean>(true);
  const [openKyc, setOpenKyc] = useState<boolean>(false);
  const [isAnimationLoader, setAnimationLoader] = useState<boolean>(false);
  const [imageShimmer, setImageShimmer] = useState<boolean>(true);
  const { switchNetworkAsync, error } = useSwitchNetwork();
  const session = useUserSession();
  const [couponApply, setCouponApply] = useState(false);
  const [orderId, setOrderId] = useState<string | undefined>();
  const [deletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);
  const [activeOffer, setActiveOffer] = useState<{
    status: boolean;
    data: NFTOfferList[];
  }>({ status: false, data: [] });
  const [viewOfferHandler, setViewOfferHandler] = useState<{
    isOpen: boolean;
    offerId?: string;
  }>({ isOpen: false });
  const [walletSelectorConfig, setWalletSelectedConfig] = useState<{
    open: boolean;
    onAccountSelect?: (account?: ConnectedAccount) => void;
    onAccountSelectCancel?: () => void;
  }>({
    open: false,
  });
  const [mintCountConfig, setMintCountConfig] = useState<{
    open: boolean;
    maxMintCount: number;
    onMint?: (count: number) => void;
    onMintCancel?: () => void;
  }>({
    open: false,
    maxMintCount: 0,
  });
  const [flowName, setFlowName] = useState<'' | FlowName>(``);
  const [addOnData, setAddOnData] = useState<PurchaseAddOnItem[]>([]);
  const [nftQuantity, setNFTQuantity] = useState(1);
  const [isAddonPopupOpen, setIsAddonPopupOpen] = useState(false);
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
  const [userInputs, setUserInputs] = useState<TicketUserInput[]>([]);
  const [createOffer, setCreateOffer] = useState<boolean>(false);
  const [offerAmount, setOfferAmount] = useState(`0`);
  const [isFailure, setIsFailure] = useState<boolean>(false);
  const [isFetchingCTA, setFetchingCTA] = useState<boolean>(true);
  const { nftOffer } = useSelector<StoreState, MakeOfferState>(
    (state) => state.makeOffer,
  );
  const [autoPurchase, setAutoPurchase] = useState<boolean>(false);
  const { nftOfferListStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const [benefitError, setBenefitError] = useState<{
    open: boolean;
    title: string;
    description: React.ReactNode;
    img?: React.ReactNode;
    onClose?: () => void;
  }>({ open: false, title: ``, description: ``, img: `` });
  const [switchErrorOpen, setSwitchErrorOpen] = useState<{
    isOpen: boolean;
    chain: string;
    chainId: number;
  }>({ isOpen: false, chain: ``, chainId: 0 });
  const [paymentOptionSheet, setPaymentOptionSheet] = useState<{
    open: boolean;
    options: {
      option: PaymentOption;
      displayName: string;
    }[];
    onSelect?: (option: PaymentOption) => void;
    onCancel?: () => void;
  }>({
    open: false,
    options: [],
  });
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const { linkHandler } = useLinkHandler();
  const { translate } = useTranslate();
  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    data?: listingPreviewResponse;
  }>({ isOpen: false });
  const [discountCode, setDiscountCode] = useState<string>();
  const { trackPage, trackClick } = useAnalytics();
  const priorityAccount = usePriorityUserAccount();
  const [loginPromptState, setLoginPromptState] = useState<{
    isOpen?: boolean;
    onSuccess?: () => void;
    onCancel?: () => void;
  }>();
  const rootRef = useRef<HTMLDivElement>(null);
  const [mintConfig, setMintConfig] = useState<{
    isBurnAndMint?: boolean;
    mintToAddress?: string;
    showSummary?: boolean;
    burnTokenData?: {
      tokenName: string; // Pebble Potli
      tokenKey: string; // pebble_potlis
      tokenUuids: string[]; // [uuid1,uuid2,uuid3,uuid]
      tokenIds: string[]; // [1,2,3,4]
    }[];
    mintTokenData?: { tokenName: string; quantity: number };
  }>({});

  const PaymentOptionDisplay = [
    {
      option: PaymentOption.FIAT,
      displayName: translate(`CARD_OR_UPI_OR_NET_BANKING`),
    },
    {
      option: PaymentOption.METAMASK,
      displayName: translate(`CRYPTOCURRENCY`),
    },
    {
      option: PaymentOption.WALLET,
      displayName: translate(`WALLET_BALANCE`),
    },
  ];

  useEffect(() => {
    if (router.isReady && router.query) {
      setMintConfig(JSON.parse((router.query.data as string) || `{}`));
    }
  }, [router.isReady]);

  useEffect(() => {
    rootRef.current?.scrollIntoView({ behavior: `smooth` });
  }, [router.query.id]);

  useEffect(() => {
    if (Number(router.query.quantity) > 0) {
      setNFTQuantity(parseInt(router.query.quantity as string));
    }
  }, [router.query.quantity]);

  const fetchOfferList = async () => {
    try {
      if (pageData && user.isLogin) {
        const payload = {
          nftId: pageData.nft_uuid,
          sort: nftOffer.sort,
        };
        await getNFTMeOfferList(payload);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

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

  useEffect(() => {
    if (router.isReady) {
      const listing_uuid = query.id as string;
      (async () => {
        try {
          setIsPageLoading(true);
          const listingDetails = await getOneListing({ listing_uuid });
          setPageData(listingDetails.data);
          setAddOnData(
            listingDetails?.data?.recommendedAddOnListings?.map((item) => ({
              ...item,
              quantity: 0,
            })) || [],
          );
          setIsPageLoading(false);
          trackPage(EVENT_PAGE.PURCHASE_NFT, {
            listing_uuid: listingDetails.data.sale_details?.listing_uuid,
            listing_price: listingDetails.data.sale_details?.price,
            nft_name: listingDetails.data.name,
          });
        } catch (error) {
          setIsPageLoading(false);
          handleErrorMessage(error);
          router.push(Pages.PAGE_NOT_FOUND);
        }
      })();
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    fetchOfferList();
    return () => {
      resetNFTOfferList();
    };
  }, [pageData, user.isLogin]);

  useEffect(() => {
    const activeOffer = nftOffer.data.filter(
      (offer) => offer.status === Constants.OfferFilter.ACTIVE,
    );
    if (activeOffer.length && !pageData?.isOwner) {
      setActiveOffer({ status: true, data: activeOffer });
    }
    if (
      nftOfferListStatus !== FetchingState.PENDING &&
      nftOffer.data.length >= 0 &&
      !isPageLoading
    ) {
      setFetchingCTA(false);
    }
  }, [isPageLoading, pageData, nftOffer.data, query.id, nftOfferListStatus]);

  // TODO: Please don't remove this handlers it could be used in future
  // const handleShareNftSheetClose = () => {
  //   setShareNftSheetOpen(false);
  // };

  // const handleSendNftSheetClose = () => {
  //   setSendNftSheetOpen(false);
  // };

  const claimUsingNonCustodialWallet = async (quantity?: number) => {
    try {
      const claimAddress = session.connectedWallets?.find(
        (wallet) => wallet.address === address,
      )?.address;
      const claimerAddress = address;
      if (claimerAddress !== claimAddress) {
        setLogout(dispatch);
        disconnect();
        setOpenAuthFlowNoAction(true);
        return;
      }
      setBenefitError({
        img: <Kite />,
        description: translate(`WAITING_FOR_TRANSACTION_ON_BLOCKCHAIN`) || ``,
        open: true,
        title: translate(`CONFIRM_TRANSACTION_ON_YOUR_WALLET`) || ``,
      });
      const chainDetail =
        Constants.NFTBlockchainMap[pageData?.blockchain?.id || ``];
      const chainId = chainDetail?.chainId;
      if (!isConnected) {
        await connectAsync({
          chainId: chainId,
        });
      }
      if ((await activeConnector?.getChainId()) !== chainId) {
        try {
          await switchNetworkAsync?.(chainId);
        } catch (error) {
          setBenefitError({
            description: ``,
            open: false,
            title: ``,
          });
          setSwitchErrorOpen({
            isOpen: true,
            chain: pageData?.blockchain?.id || ``,
            chainId: chainDetail?.chainId,
          });
          return;
        }
      }

      const signer = await getEthersSigner();
      if (!signer) return;
      const sdk = ThirdwebSDK.fromSigner(signer, undefined, {
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
      });
      if (!sdk) return;
      let txnHash = ``;
      if (pageData?.listing_type === ListingType.DROP) {
        const dropContract =
          pageData?.version === `latest`
            ? await sdk.getContract(
                pageData?.sale_details?.marketplace_id || ``,
                `nft-drop`,
              )
            : await sdk.getContract(
                pageData?.sale_details?.marketplace_id || ``,
                ERCC721_DROP_ABI_V2,
              );
        const result = await dropContract.erc721.claim(quantity || nftQuantity);
        txnHash = result[0]?.receipt?.transactionHash;
      }
      if (
        pageData?.listing_type === ListingType.SIGNATURE_DROP ||
        pageData?.listing_type === ListingType.SIGNATURE_DROP_MINATOCHAN
      ) {
        let generatedSignature;
        try {
          generatedSignature = await getMintSignature(
            quantity || nftQuantity,
            address as string,
            pageData?.listing_uuid,
            mintConfig?.isBurnAndMint
              ? {
                  // additional_data: {
                  //   candies: ['ae42c965-a752-43c6-9d2b-231d9fe4ee69'],
                  //   pebble_potlis: ['c15f8231-064d-43fe-a444-136699e9724a'],
                  // },
                  additional_data: Object.assign(
                    {},
                    ...(mintConfig?.burnTokenData?.map((data) => ({
                      [data.tokenKey]: data.tokenUuids,
                    })) || []),
                  ),
                }
              : {},
          );
        } catch (error) {
          const errorData: ErrorResponse = (error as any)?.response?.data;
          if (errorData.errorMessage) {
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
              description: errorData.errorMessage,
              open: true,
              title: `Oops! Claim Failed`,
            });
            return;
          }
          throw error;
        }
        if (pageData?.listing_type === ListingType.SIGNATURE_DROP) {
          const sigDropContract2 = await sdk.getContract(
            pageData?.sale_details?.marketplace_id || ``,
            ERC721_PEBBLE_SIGNATURE_DROP_ABI,
          );
          const tx = await sigDropContract2.erc721.signature.mint(
            generatedSignature?.data as any,
          );
          txnHash = tx.receipt.transactionHash; // the mint transaction receipt
        }
        if (pageData?.listing_type === ListingType.SIGNATURE_DROP_MINATOCHAN) {
          const sigDropContract2 = await sdk.getContract(
            pageData?.sale_details?.marketplace_id || ``,
            ERC721_SIGNATURE_DROP_MINATO,
          );
          const tx = await sigDropContract2.call(`mintWithSignature`, [
            generatedSignature.data?.payload?.message,
            generatedSignature.data?.signature,
          ]);
          txnHash = tx.receipt.transactionHash; // the mint transaction receipt
        }
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
          <span>
            Successfully claimed the NFT. You will receive the NFT in sometime.
            {txnHash && (
              <>
                <br />
                <a
                  href={`${chainDetail?.explorer || ``}/tx/${txnHash}`}
                  target={`_blank`}
                  rel="noreferrer"
                >
                  View in explorer
                </a>
              </>
            )}
          </span>
        ),
        open: true,
        title: `Transaction Successful`,
        onClose: () => {
          router.push(`/`);
        },
      });
      await clearChainBalanceCache(pageData?.blockchain?.id || ``).catch(
        (err) => console.log(err),
      );
      return;
    } catch (error) {
      console.log(`Error`, error);
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
            : `Failed to claim NFT.`,
        open: true,
        title: `Oops! Claim Failed`,
      });
      return;
    }
  };

  const processPurchase = async (pageData: GetListingsRespone) => {
    let account: ConnectedAccount | undefined;
    try {
      account = await new Promise((resolve, reject) => {
        setWalletSelectedConfig({
          open: true,
          onAccountSelect: resolve,
          onAccountSelectCancel: reject,
        });
      });
      if (!account) {
        generateToast({
          type: ToastType.ERROR,
          content: `Oops! You are trying to buy a Near NFT with Ethereum wallet. Please login with email/phone.`,
        });
        return;
      }
    } catch (error) {
      return;
    }

    if (
      mintConfig?.isBurnAndMint &&
      mintConfig?.mintToAddress &&
      account.ethAddress !== mintConfig?.mintToAddress
    ) {
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
        description: (
          <div>
            Account selected different from account used for selecting assets to
            burn.
            <div
              style={{
                backgroundColor: `white`,
                padding: 12,
                borderRadius: 16,
                marginTop: 24,
              }}
            >
              <div
                style={{
                  padding: `0px 24px`,
                  marginBottom: 24,
                  width: `100%`,
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                <span>Wallet Address: </span>
                <span>{textTruncate(account.ethAddress, 5, 4)}</span>
              </div>
              <div
                style={{
                  padding: `0px 24px`,
                  width: `100%`,
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                <span>Asset Wallet Address: </span>
                <span>{textTruncate(mintConfig?.mintToAddress, 5, 4)}</span>
              </div>
            </div>
          </div>
        ),
        open: true,
        title: `Oops! Claim Failed`,
      });
      return;
    }

    let quantity: number | undefined;
    if (pageData?.listing_type === ListingType.SIGNATURE_DROP) {
      try {
        setIsKiteLoader(true);
        const eligibility = await getMintEligibility(pageData?.listing_uuid);
        setIsKiteLoader(false);
        quantity = await new Promise((resolve, reject) => {
          setMintCountConfig({
            maxMintCount:
              eligibility.data?.[account?.ethAddress || ``]?.assetQMintMore ||
              0,
            open: true,
            onMint: (count) => resolve(count),
            onMintCancel: () => resolve(undefined),
          });
        });
      } catch (error) {
        setIsKiteLoader(false);
      }
      if (!quantity) return;
    }
    let paymentOption: PaymentOption = PaymentOption.FIAT;
    if (
      Constants.NFTBlockchainMap[pageData?.blockchain?.id || ``]?.chainId !==
        0 &&
      [
        ListingType.DROP,
        ListingType.SIGNATURE_DROP,
        ListingType.SIGNATURE_DROP_MINATOCHAN,
      ].includes(pageData?.listing_type as any)
    ) {
      try {
        paymentOption = await new Promise(async (resolve, reject) => {
          if (account?.type === WalletCustodyType.NONCUSTODIAL) {
            setPaymentOptionSheet({
              onSelect: resolve,
              onCancel: reject,
              open: true,
              options: PaymentOptionDisplay.filter((option) =>
                [PaymentOption.FIAT, PaymentOption.METAMASK].includes(
                  option.option,
                ),
              ),
            });
          } else {
            setIsKiteLoader(true);
            const response = await getPaymentOptions({
              listing_uuid: pageData.listing_uuid,
              quantity: quantity || nftQuantity,
            });
            setIsKiteLoader(false);
            const options = PaymentOptionDisplay.filter((option) =>
              response.data?.payment_modes?.includes(option.option),
            );
            if (options.length > 1) {
              setPaymentOptionSheet({
                onSelect: resolve,
                onCancel: reject,
                open: true,
                options: options,
              });
            } else {
              resolve(PaymentOption.FIAT);
            }
          }
        });
      } catch (error) {
        setIsKiteLoader(false);
        return;
      }
    } else if (
      Constants.NFTBlockchainMap[pageData?.blockchain?.id || ``]?.name ===
        `NEAR` &&
      [ListingType.DROP].includes(pageData?.listing_type as any)
    ) {
      paymentOption = await new Promise(async (resolve, reject) => {
        if (account?.type === WalletCustodyType.NONCUSTODIAL) {
          setPaymentOptionSheet({
            onSelect: resolve,
            onCancel: reject,
            open: true,
            options: PaymentOptionDisplay.filter((option) =>
              [PaymentOption.FIAT, PaymentOption.WALLET].includes(
                option.option,
              ),
            ),
          });
        } else {
          setIsKiteLoader(true);
          const response = await getPaymentOptions({
            listing_uuid: pageData.listing_uuid,
            quantity: quantity || nftQuantity,
          });
          setIsKiteLoader(false);
          const options = PaymentOptionDisplay.filter((option) =>
            response.data?.payment_modes?.includes(option.option),
          );
          if (options.length >= 1) {
            setPaymentOptionSheet({
              onSelect: resolve,
              onCancel: reject,
              open: true,
              options: options,
            });
          } else {
            resolve(PaymentOption.FIAT);
          }
        }
      });
    }
    if (paymentOption === PaymentOption.METAMASK) {
      await claimUsingNonCustodialWallet(quantity);
      return;
    }
    const payload = {
      wallet_uuid: account?.wallet_uuid,
      listingId: pageData.id,
      marketplaceId: pageData?.sale_details?.marketplace_id as string,
      qty: quantity || nftQuantity,
      payment_mode: paymentOption || PaymentOption.FIAT,
      addOnListings: addOnData
        .filter((item) => item.quantity > 0)
        .map((item) => ({
          listing_uuid: item.listing_uuid,
          quantity: item.quantity,
          userInputs: Object.assign(
            {},
            ...(userInputs
              ?.filter((_userInput) => {
                return item?.userInputs?.some((uI) => uI.id === _userInput.id);
              })
              ?.map((_userInput) => ({ [_userInput.id]: _userInput.value })) ||
              []),
          ),
        })),
      userInputs: Object.assign(
        {},
        ...(userInputs
          ?.filter((_userInput) => {
            return pageData?.userInputs?.some((uI) => uI.id === _userInput.id);
          })
          ?.map((_userInput) => ({ [_userInput.id]: _userInput.value })) || []),
      ),
      coupon_code: discountCode,
      additional_data: mintConfig?.isBurnAndMint
        ? Object.assign(
            {},
            ...(mintConfig?.burnTokenData?.map((data) => ({
              [data.tokenKey]: data.tokenUuids,
            })) || []),
          )
        : undefined,
    };
    try {
      setIsKiteLoader(true);
      const response = await getPreviewDetails(payload);
      setPreviewState({ isOpen: true, data: response.data });
      setIsKiteLoader(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsKiteLoader(false);
      handleErrorMessage(axiosError);
      if (
        axiosError?.response?.data.toastContext !== null &&
        axiosError?.response?.data.toastContext.toast_message ==
          `You can purchase this nft once only.`
      ) {
        setIsPurchaseDisabled(true);
      }
    }
  };

  const procressDirectBuy = async (pageData: GetListingsRespone) => {
    try {
      let account: ConnectedAccount | undefined;
      try {
        account = await new Promise((resolve, reject) => {
          setWalletSelectedConfig({
            open: true,
            onAccountSelect: resolve,
            onAccountSelectCancel: reject,
          });
        });
        if (!account) {
          generateToast({
            type: ToastType.ERROR,
            content: `Oops! You are trying to buy a Near NFT with Ethereum wallet. Please login with email/phone.`,
          });
          return;
        }
      } catch (error) {
        return;
      }
      if (pageData.showAnimationInPurchase) {
        setAnimationLoader(true);
      } else {
        setIsKiteLoader(true);
      }
      const clientId =
        (router.query.client_id as string) ||
        getToken(LocalStorageVariables.METACLIENTID) ||
        `default`;

      let thirdPartyAuthCode = null;
      if (clientId == `naga`) {
        thirdPartyAuthCode =
          (router.query?.third_party_auth_code as string) ||
          getToken(LocalStorageVariables.THIRD_PARTY_AUTH_CODE);
      }

      const payload = {
        wallet_uuid: account?.wallet_uuid,
        thirdPartyAuthCode: thirdPartyAuthCode,
        listingId: pageData.id,
        marketplaceId: pageData?.sale_details?.marketplace_id as string,
        quantity: nftQuantity,
        addOnListings: addOnData
          .filter((item) => item.quantity > 0)
          .map((item) => ({
            listing_uuid: item.listing_uuid,
            quantitiy: item.quantity,
            userInputs: Object.assign(
              {},
              ...(userInputs
                ?.filter((_userInput) => {
                  return item?.userInputs?.some(
                    (uI) => uI.id === _userInput.id,
                  );
                })
                ?.map((_userInput) => ({
                  [_userInput.id]: _userInput.value,
                })) || []),
            ),
          })),
        userInputs: Object.assign(
          {},
          ...(userInputs
            ?.filter((_userInput) => {
              return pageData?.userInputs?.some(
                (uI) => uI.id === _userInput.id,
              );
            })
            ?.map((_userInput) => ({ [_userInput.id]: _userInput.value })) ||
            []),
        ),
      };
      const response = await previewAndBuyingListing(payload);
      sendMessageToParent(
        JSON.stringify({
          event: Constants.IframeMessageType.directPurchaseNFTInitiated,
          data: {
            status: `ACCEPTED`,
            walletAddresses: priorityAccount,
            orderUuid: response?.data?.order_uuid,
          },
        }),
      );
      router.push(`${Pages.NFT_DETAILS}/${pageData?.nft_uuid}`);
      // if (!pageData.showAnimationInPurchase)
      // //   router.push(`/transaction-details/${response.data.order_uuid}`);
      // setIsKiteLoader(false);
      // setOrderId(response.data.order_uuid);
    } catch (e) {
      const getErrorDisplayMessage = (error: any) => {
        const errorData: ErrorResponse = error?.response?.data;
        let msg;
        if (
          errorData &&
          errorData.toastContext !== null &&
          errorData.toastContext?.show_toast
        ) {
          msg = errorData.toastContext.toast_message;
        }
        return msg ? msg : `Something went wrong please try again later`;
      };
      sendMessageToParent(
        JSON.stringify({
          event: Constants.IframeMessageType.directPurchaseNFTInitiationFailed,
          data: {
            status: `FAILED`,
            errorDisplayMessage: getErrorDisplayMessage(e),
          },
        }),
      );
      handleErrorMessage(e);
      setAnimationLoader(false);
      setIsKiteLoader(false);
    }
  };

  const purchaseNextFlow = async (pageData: GetListingsRespone) => {
    if (pageData.need_kyc) {
      setIsKiteLoader(true);
      const isKycDone = await isPanVerified();
      if (!isKycDone) {
        setIsKiteLoader(false);
        setOpenKyc(true);
      }
    }
    if (pageData.previewAndBuyAtOnce) {
      procressDirectBuy(pageData);
    } else {
      processPurchase(pageData);
    }
  };

  const handlePurchase = async (pageData: GetListingsRespone) => {
    try {
      await new Promise((resolve, reject) => {
        if (session.isLoggedIn) {
          resolve(true);
          return;
        }
        setLoginPromptState({
          isOpen: true,
          onSuccess: () => {
            setLoginPromptState({});
            resolve(true);
          },
        });
      });
      purchaseNextFlow(pageData);
      trackClick(CLICK.BUY_NOW, {
        listing_uuid: pageData?.sale_details?.listing_uuid as string,
        nft_uuid: pageData?.nft_uuid as string,
        selectedQty: nftQuantity,
      });
    } catch (error) {}
  };

  const renderProperties = (benefitData: any) => {
    const options: any = [];

    Object.keys(benefitData).map((key, index) => {
      options.push(
        <CardProperties
          title={key.toUpperCase()}
          subtitle={benefitData[key]}
          key={index}
          propertyId={index}
          rarityPercentage={
            pageData?.rarityPercentage && pageData.rarityPercentage[key]
          }
        />,
      );
    });
    return options;
  };

  const onExclusiveBenefitsScroll = (
    benefits: WalletBenefitsResponse[] | undefined,
  ) => {
    if (exclusiveBenefitsRef !== null && benefits && benefits.length > 0) {
      exclusiveBenefitsRef?.current?.scrollIntoView({ behavior: `smooth` });
    }
  };

  const onPropertiesToggle = () => {
    setPropertiesOpen(!propertiesOpen);
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue === `` || inputValue === `-`) setOfferAmount(``);
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setOfferAmount(limitDecimal(parseFloat(inputValue).toString(), 2));
    }
  };

  const onCreateOffer = async () => {
    try {
      if (Number(offerAmount) < 100) {
        generateToast({
          type: ToastType.ERROR,
          content: `${translate(`MINMUM_OFFER_AMOUNT_IS`)} ₹100`,
        });
        setIsFailure(true);
      } else {
        if (!user.isLogin) {
          setMakeOfferIsLoggedIn(true);
          setCreateOffer(false);
        } else {
          const payload = {
            nft_uuid: pageData && pageData.nft_uuid,
            currency: `INR`,
            amount: Number(offerAmount),
          };
          const response = await makeOffer(payload);
          if (response) {
            setIsFailure(true);
            setViewOfferHandler({
              isOpen: true,
              offerId: response.data.auction_uuid,
            });
            generateToast({
              type: ToastType.SUCCESS,
              content: translate(`OFFER_MADE`),
            });
          }
        }
      }
    } catch (error) {
      handleErrorMessage(error);
      setIsFailure(true);
    }
  };

  const handleMakeAnOffer = () => {
    if (pageData?.native_currency?.symbol === Constants.TokenCurrency.NEAR) {
      setCreateOffer(true);
    } else {
      generateToast({
        type: ToastType.INFO,
        content: `${translate(`MAKE_OFFER_TOAST`)} ${
          pageData?.blockchain?.name
        } ${translate(`NFTS`)}`,
      });
    }
  };

  const goToCollection = (collection_id: string) => {
    router.push(`${Pages.COLLECTION_DETAILS}/${collection_id}`);
  };

  const onAccessBenefit = (benefitId: string) => {
    if (!session.isLoggedIn) {
      setOpenAuthFlowNoAction(true);
      return;
    }
    setIsKiteLoader(true);
    getBenefitAccessInfo(benefitId, pageData?.nft_uuid)
      .then(async (response) => {
        await linkHandler(
          response?.data?.type,
          response?.data?.ctaLink,
          response?.data?.ctaTarget,
          response?.data?.ctaLinkAs,
        );
        setIsKiteLoader(false);
      })
      .catch((err) => {
        setIsKiteLoader(false);
        if (err?.response?.data?.toastContext?.show_toast === false) {
          setBenefitError({
            open: true,
            img: err?.response?.data?.toastContext?.toast_image,
            title: err?.response?.data?.toastContext?.toast_message,
            description: err?.response?.data?.toastContext?.toast_description,
          });
        } else {
          handleErrorMessage(err);
        }
      });
  };

  /*
    we try to take the link of the first audio asset from the first benefit of this NFT
    and ignore the other ones
  */
  const audioAssetLink = useMemo(() => {
    if (pageData) {
      for (const benefit of pageData.benefits) {
        if (benefit.audio_asset) {
          for (const audio_asset_link of benefit.audio_asset) {
            return audio_asset_link;
          }
        }
      }
    }
    return null;
  }, [pageData]);

  useEffect(() => {
    const userInputs = [
      ...(pageData?.userInputs || []),
      ...(addOnData
        ?.filter((addon) => addon.quantity > 0)
        ?.map((addon) => addon?.userInputs || [])
        ?.flat(10) || []),
    ];
    const uniqueUserInputs: TicketUserInput[] = Object.values(
      Object.assign({}, ...userInputs.map((input) => ({ [input.id]: input }))),
    );
    setUserInputs(uniqueUserInputs);
  }, [pageData, addOnData]);

  const getCTAComponent = () => {
    return isPageLoading || isFetchingCTA ? (
      <div css={[mixins.flexAlignJustifiedCenter]}>
        <MLottie addStyles={styles.loader} />
      </div>
    ) : pageData && pageData?.isOwner ? (
      <motion.div css={[mixins.flexAlignJustifiedCenter]}>
        <SecondaryButton
          addStyles={styles.filterApply}
          onClick={() => {
            trackClick(CLICK.DELETE_LISTING, {
              listing_uuid: pageData?.sale_details?.listing_uuid as string,
              nft_uuid: pageData?.nft_uuid as string,
              currency: pageData?.currency as string,
              listing_price: pageData.sale_details?.price,
              nft_name: pageData.name,
            });
            setDeletePopupOpen(true);
          }}
        >
          {translate(`DELETE_LISTING`)}
        </SecondaryButton>
        <PrimaryButton
          addStyles={styles.filterApply}
          onClick={() => {
            setFlowName(FlowName.UPDATE);
          }}
        >
          {translate(`MODIFY_PRICE`)}
        </PrimaryButton>
      </motion.div>
    ) : pageData?.sale_details?.available_quantity &&
      pageData?.sale_details?.available_quantity > 0 ? (
      <motion.div css={[mixins.flexAlignJustifiedCenter]}>
        {session.wallets?.includes(WalletType.METAMASK) &&
        session.isLoggedIn &&
        isPurchasing ? (
          <MLottie addStyles={styles.loader} />
        ) : activeOffer.status ? (
          <PrimaryButton
            addStyles={styles.filterApply}
            onClick={() =>
              setViewOfferHandler({
                isOpen: true,
                offerId: activeOffer.data[0].auction_uuid,
              })
            }
          >
            {translate(`VIEW_OFFER`)}
          </PrimaryButton>
        ) : (
          <Fragment>
            {pageData?.allowOffer && (
              <SecondaryButton
                addStyles={styles.filterApply}
                onClick={() => {
                  trackClick(CLICK.MAKE_AN_OFFER, {
                    listing_uuid: pageData?.sale_details
                      ?.listing_uuid as string,
                    nft_uuid: pageData?.nft_uuid as string,
                    currency: pageData?.currency as string,
                  });
                  handleMakeAnOffer();
                }}
              >
                {translate(`MAKE_AN_OFFER`)}
              </SecondaryButton>
            )}
            <PrimaryButton
              addStyles={styles.filterApply}
              onClick={() => {
                if (addOnData.length > 0) {
                  setIsAddonPopupOpen(true);
                  return;
                }
                if (userInputs.length > 0) {
                  setIsAddressPopupOpen(true);
                  return;
                }
                handlePurchase(pageData as GetListingsRespone);
                // if (
                //   loginStatus.name === WalletType.METAMASK &&
                //   loginStatus.status
                // ) {
                //   handleNFTPurchase();
                // } else {
                //   handlePurchase(pageData as GetListingsRespone);
                // }
              }}
              disabled={isPurchaseDisabled}
            >
              {pageData?.action_text
                ? `${pageData.action_text} ${
                    router.query.quantity
                      ? `${nftQuantity} NFT${nftQuantity > 1 ? `s` : ``}`
                      : ``
                  }`
                : translate(`BUY_NOW`)}
            </PrimaryButton>
          </Fragment>
        )}
      </motion.div>
    ) : null;
  };

  useEffect(() => {
    if (
      isString(autoClaim) &&
      JSON.parse(autoClaim) &&
      pageData &&
      !autoPurchase
    ) {
      handlePurchase(pageData);
    }
  }, [autoClaim, pageData, autoPurchase]);

  return (
    <BottomNav currentTab={NavTabs.HOME}>
      <Fragment>
        <FullScreenKiteLoader isOpen={isKiteLoader}>
          <div css={styles.loaderContentInfo}>
            {translate(`PAGE_LOADING`)}...
          </div>
        </FullScreenKiteLoader>
        <FullScreenPopUp isOpen={isAnimationLoader}>
          <div css={styles.loaderContentInfo}>
            <AnimationCustomNayaabLoader orderId={orderId} />
          </div>
        </FullScreenPopUp>
        <FullScreenPopUp isOpen={openKyc}>
          <KYC setOpenKyc={(status: boolean) => setOpenKyc(status)}></KYC>
        </FullScreenPopUp>
        <FullScreenPopUp
          isOpen={
            loginPromptState?.isOpen ||
            isLoggedIn ||
            isMakeOfferLoggedIn ||
            openAuthFlowNoAction
          }
        >
          <Authentication
            setLoginStatus={(status) => {
              if (isLoggedIn) {
                setIsLoggedIn(status);
              } else {
                setMakeOfferIsLoggedIn(status);
              }
            }}
            onSuccess={() => {
              if (loginPromptState?.onSuccess) {
                loginPromptState?.onSuccess?.();
                return;
              }
              if (openAuthFlowNoAction) {
                setOpenAuthFlowNoAction(false);
                return;
              }
              if (isLoggedIn) {
                if (addOnData.length > 0) return;
                setAutoPurchase(true);
                handlePurchase(pageData as GetListingsRespone);
              } else {
                setCreateOffer(true);
              }
            }}
            isPopUp={true}
          />
        </FullScreenPopUp>
        <FullScreenPopUp isOpen={couponApply}>
          <Authentication
            setLoginStatus={(status) => {
              if (isLoggedIn) {
                setIsLoggedIn(status);
              }
            }}
            onSuccess={() => {
              if (couponApply) {
                setCouponApply(false);
                setIsAddonPopupOpen(true);
                return;
              }
              // if (isLoggedIn) {
              //   if (addOnData.length > 0) return;
              //   purchaseNextFlow(pageData as GetListingsRespone);
              // } else {
              //   setCreateOffer(true);
              // }
            }}
            isPopUp={true}
          />
        </FullScreenPopUp>
        <div ref={rootRef}>
          {/* // TODO :removed cose of scroll issue <div css={[mixins.desktopHeight]}>*/}
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
            {pageData?.media_type === `video` ? (
              <div
                style={{ width: `100%`, height: `100%` }}
                onClick={() => {
                  router.push({
                    pathname: `${Pages.NFT_DETAILS}/zoom/${router.query.id}`,
                    query: {
                      url: pageData?.image,
                      media_type: pageData?.media_type,
                    },
                  });
                }}
              >
                <Video
                  source={pageData?.image}
                  width="100%"
                  height="100%"
                  disablePictureInPicture={true}
                  controls={false}
                  addStyles={styles.imageWidth}
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
                onClick={() => {
                  router.push({
                    pathname: `${Pages.NFT_DETAILS}/zoom/${router.query.id}`,
                    query: {
                      url: pageData?.image
                        ? pageData?.image
                        : AssetsImg.i_default,
                      media_type: pageData?.media_type,
                    },
                  });
                }}
                src={pageData?.image ? pageData?.image : AssetsImg.i_default}
                alt={`Details Image`}
                css={styles.imageWidth}
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

            {/* {pageData?.benefits && pageData.benefits.length > 0 && (
              <PrimaryButton
                addStyles={styles.primaryButton}
                onClick={() => onExclusiveBenefitsScroll(pageData?.benefits)}
              >
                {pageData?.benefits
                  ? pageData?.benefits.length === 1
                    ? pageData?.benefits.length + ` ` + translate(`BENEFIT`)
                    : pageData?.benefits.length > 1
                    ? pageData?.benefits.length + ` ` + translate(`BENEFITS`)
                    : `0 ` + translate(`BENEFIT`)
                  : null}
              </PrimaryButton>
            )} */}
            {!onBack && <BackButton addStyles={styles.backButton} />}
          </motion.div>
          {/* playback control for audio asset associated with this NFT */}
          {audioAssetLink && (
            <div css={mixins.flexAlignJustifiedCenter}>
              <audio
                controls
                css={styles.audioControls}
                controlsList="nodownload"
              >
                {/* The type to be updated based on the file type being played */}
                <source src={audioAssetLink} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
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
              <span
                css={[styles.cardAccessText, mixins.flexAlignJustifiedCenter]}
              >
                {isPageLoading ? (
                  <ShimmerCard isEffect={true} height={30} borderRadius={10} />
                ) : (
                  pageData?.name
                )}
              </span>
              {isPageLoading ? (
                <ShimmerCard isEffect={true} height={70} borderRadius={10} />
              ) : (
                <div>
                  <TokenInformation
                    infoItems={[
                      {
                        title:
                          Number(
                            pageData?.sale_details?.skywallet_accepted_price,
                          ) === 0
                            ? translate(`FREE`)
                            : `${
                                pageData?.sale_details
                                  ?.skywallet_accepted_currency === `INR`
                                  ? `₹`
                                  : ``
                              }${
                                pageData?.sale_details?.skywallet_accepted_price
                              } ${
                                pageData?.sale_details
                                  ?.skywallet_accepted_currency === `INR`
                                  ? ``
                                  : pageData?.sale_details
                                      ?.skywallet_accepted_currency
                              }`,
                        subtitle:
                          Number(
                            pageData?.sale_details?.skywallet_accepted_price,
                          ) !== 0
                            ? translate(`PRICE_EXCLUDING_FEES`)
                            : Constants.nftDetails.price,
                      },
                      ...(pageData?.rarityRank
                        ? [
                            {
                              title: String(pageData?.rarityRank),
                              onRenderItem: RarityInfo,
                              subtitle: ` ` + translate(`RARITY_RANK`),
                            },
                          ]
                        : []),
                    ]}
                  />
                </div>
              )}
              {/* TODO COMMENTED FOR THIS RELEASE
                  <SecondaryButton
                    text="SEND NFT"
                    onClick={() => setSendNftSheetOpen(true)}
                  /> */}
              {/* <div css={[styles.transactionValidity, mixins.flexJustifiedBetween]}>
                <h3 css={[styles.transactionValidityText]}>Transaction Validity</h3>
                <span css={styles.transactionValiditySec}>09: 59 secs</span>
              </div>
              <TransactionInformation
                icon={AssetsImg.ic_info}
                title={`Transaction Details`}
                date={`7th Feb, 2022`}
                fees={`0.0120 ETH`}
                addStyles={styles.transactionInfoStyles}
              /> */}
              {pageData?.enableQuantitySelector &&
                typeof pageData.maxLimitOnQuantitySelector === `number` && (
                  <QuantitySelector
                    quantity={nftQuantity}
                    setQuantity={setNFTQuantity}
                    maxQuantity={pageData.maxLimitOnQuantitySelector}
                  />
                )}
              {getCTAComponent()}
              {nftOffer.data.length > 0 && (
                <OfferLists
                  list={nftOffer.data}
                  nftUUID={pageData ? pageData?.nft_uuid : ``}
                  setViewOfferHandler={(offerData) =>
                    setViewOfferHandler(offerData)
                  }
                />
              )}
              {pageData?.ctasToExplore?.length ? (
                <div css={[utils.mb(40)]}>
                  <BlueCampaignBanner
                    title={pageData?.ctasToExplore?.[0]?.ctaText}
                    link={pageData?.ctasToExplore?.[0]?.ctaLink}
                    type={pageData?.ctasToExplore?.[0]?.type}
                    target={pageData?.ctasToExplore?.[0]?.ctaTarget}
                  />
                </div>
              ) : null}
              {isPageLoading ? (
                <ShimmerCard height={500} borderRadius={10} isEffect={true} />
              ) : (
                <Fragment>
                  <span css={styles.benefitsText}>
                    {translate(`NFT_DETAILS`)}
                  </span>
                  <AuthorDescription
                    //TODO get APi contract Fixed
                    /* author={pageData?.creator_new?.name} */
                    /* seller={
                      pageData?.sale_details?.seller
                        ? pageData?.sale_details?.seller
                        : ``
                    } */
                    description={
                      pageData?.description ? pageData.description : ``
                    }
                    blockchain={pageData?.blockchain}
                  />
                </Fragment>
              )}
              {pageData?.benefits.length != 0 && (
                <motion.div
                  css={[styles.cardBenefits, utils.mb(34)]}
                  ref={exclusiveBenefitsRef}
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    default: { duration: 0.5 },
                    ease: `easeIn`,
                  }}
                >
                  <div
                    css={[mixins.flexColumn, { gap: utils.remConverter(20) }]}
                  >
                    <span
                      css={[
                        styles.benefitsText,
                        mixins.flexAlignCenterJustifiedBetween,
                      ]}
                    >
                      {translate(`EXCLUSIVE_BENEFITS`)}
                      {pageData?.benefits && pageData?.benefits?.length > 0 && (
                        <span
                          css={styles.seeAll}
                          onClick={() => {
                            trackClick(`see all benefit`, {
                              listing_uuid:
                                pageData?.sale_details?.listing_uuid,
                            });
                            router.push({
                              pathname: `${Pages.BENEFITS}/${BenefitType.MARKETPLACE}/${pageData?.sale_details?.listing_uuid}`,
                            });
                          }}
                        >
                          {translate(`SEE_ALL`)}
                        </span>
                      )}
                    </span>
                    {pageData?.benefits?.map((benefit, index) => (
                      <BenefitCardEnhanced
                        benefits={benefit}
                        nftId={pageData?.nft_uuid}
                        key={index}
                        onAccess={() => onAccessBenefit(benefit.id)}
                        notAuthorized={() => setOpenAuthFlowNoAction(true)}
                        onClick={() => {
                          trackClick(`benefit`, { id: benefit.id });
                          router.push({
                            pathname: `/benefit-details/${benefit.id}`,
                            query: {
                              nftId: pageData?.nft_uuid || ``,
                            },
                          });
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              {isPageLoading ? (
                <ShimmerCard height={500} borderRadius={10} isEffect={true} />
              ) : pageData?.event_details &&
                Object.keys(pageData?.event_details).length > 0 ? (
                <Fragment>
                  <span css={styles.benefitsText}>
                    {Constants.nftDetails.ticketDetails}
                  </span>
                  <DetailCard
                    items={Object.keys(pageData?.event_details).map((k) => ({
                      icon: ``,
                      key: k,
                      value: pageData?.event_details?.[k] || ``,
                    }))}
                    tncLink={pageData?.terms_and_conditions}
                  />
                </Fragment>
              ) : null}
              {isPageLoading ? (
                <ShimmerCard height={500} borderRadius={10} isEffect={true} />
              ) : mintConfig?.showSummary && mintConfig?.isBurnAndMint ? (
                <Fragment>
                  <span css={styles.benefitsText}>{`Assets`}</span>
                  <BurnMintAssetInfo
                    items={[
                      ...(mintConfig?.burnTokenData
                        ? [
                            {
                              title: `Burn`,
                              value:
                                mintConfig?.burnTokenData
                                  ?.map(
                                    (data) =>
                                      data.tokenIds?.map(
                                        (id) => `${data.tokenName} #${id}`,
                                      ) || [],
                                  )
                                  ?.flat() || [],
                            },
                          ]
                        : []),
                      ...(mintConfig?.mintTokenData
                        ? [
                            {
                              title: `Mint`,
                              value: [
                                `${mintConfig?.mintTokenData?.quantity} x ${mintConfig?.mintTokenData?.tokenName}`,
                              ],
                            },
                          ]
                        : []),
                    ]}
                  />
                </Fragment>
              ) : null}
            </motion.div>
            {pageData?.properties && !mintConfig?.isBurnAndMint && (
              <motion.div css={[mixins.flexColumn]}>
                <div
                  css={[
                    styles.propertiesHeader,
                    mixins.flexAlignCenterJustifiedBetween,
                  ]}
                >
                  {!isEmpty(pageData?.properties) && (
                    <div css={[mixins.flexAlignJustifiedCenter]}>
                      <span css={styles.benefitsText}>
                        {translate(`PROPERTIES`)}
                      </span>
                    </div>
                  )}
                  {pageData.rarityRank && (
                    <div css={styles.purchaseRankingChip}>
                      <span
                        css={[
                          styles.purchaseRankingText,
                          mixins.flexAlignCenter,
                        ]}
                      >
                        Rarity Ranking: {`#${pageData.rarityRank}`}
                      </span>
                    </div>
                  )}

                  {/*<Image src={AssetsImg.ic_arrowUp} alt="Arrow Up" />*/}
                </div>

                <div css={styles.propertiesBody}>
                  {pageData?.properties &&
                    renderProperties(pageData?.properties)}
                </div>
              </motion.div>
            )}
            {isPageLoading ? (
              <div css={styles.padding}>
                <ShimmerCard height={500} borderRadius={10} isEffect={true} />
              </div>
            ) : (
              pageData &&
              pageData?.collection_new && (
                <Fragment>
                  <div
                    css={styles.padding}
                    onClick={() => goToCollection(pageData.collection_new.id)}
                  >
                    <div css={styles.collectionCard}>
                      <img
                        src={
                          pageData.collection_new.image !== null
                            ? pageData.collection_new.image
                            : AssetsImg.i_collectionDefault.src
                        }
                        alt=""
                        css={styles.collectionImg}
                        onError={(event) => {
                          (event.target as HTMLImageElement).src =
                            AssetsImg.i_collectionDefault.src;
                        }}
                      />
                      <div>
                        <h3 css={styles.collectionName}>
                          {pageData.collection_new.name}
                        </h3>
                        <p css={styles.collectionDescription}>
                          {pageData.collection_new.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            )}
            {pageData?.alsoBuyListings?.length ? (
              <div>
                <div css={[styles.benefitsText, utils.mb(20)]}>
                  {`You can also buy`}
                </div>
                <div css={styles.horizontalList}>
                  {pageData?.alsoBuyListings?.map((item, index) => (
                    <CardNfts
                      key={index}
                      addStyles={styles.nftCardContainer}
                      imageStyles={styles.nftCardImage}
                      image={item.image} //{AssetsImg.i_default}
                      mediaType={item.media_type}
                      onClick={() => {
                        if (item.listing_uuid)
                          router.push(
                            `${Pages.PURCHASE_NFT}/${item.listing_uuid}`,
                          );
                      }}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {/* <CollectionInformation
              title={`Infinity Collection`}
              description={`The description will be included on the item's detail page underneath its image, in this section where it begins to displa...`}
              blockchain={pageData?.blockchain}
            />
            <div>
              <SecondaryButton>{translate(`SHARE`)}</SecondaryButton>
            </div>

            {/* <div>
              <ShowAllLink
                  title="More NFTs from the collection"
                  linkTo={() => router.push(Pages.COLLECTION_DETAILS)}
                  show={true}
                />
              <div css={styles.nftCard}>
                <Swiper spaceBetween={10} slidesPerView={1.6}>
                  {[]?.map((data: any, index: any) => (
                    <SwiperSlide key={index}>
                      <CardNfts
                        image={AssetsImg.i_default}
                        onClick={() => router.push(Pages.NFT_DETAILS)}
                        content={Constants.nftDetails.nftCardDefaultDescription}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div> */}
            {/* <div css={styles.nftCard}>
              <div css={[styles.token, mixins.flexAlignCenterJustifiedBetween]}>
                <span css={styles.bodyTokenTitle}>
                  {Constants.home.joinCommunity}
                </span>
              </div>
              <div css={[styles.links, mixins.flexAlignCenterJustifiedBetween]}>
                <SocialMediaButton
                  icon={AssetsImg.ic_instagram}
                  name="Instagram"
                />
                <SocialMediaButton
                  icon={AssetsImg.ic_facebook}
                  name="Facebook"
                />
                <SocialMediaButton icon={AssetsImg.ic_twitter} name="Twitter" />
                <SocialMediaButton icon={AssetsImg.ic_discord} name="Discord" />
                <SocialMediaButton icon={AssetsImg.ic_youtube} name="Youtube" />
              </div>
            </div>
            <div css={styles.nftCard}>
              <div css={styles.token}>
                <span css={styles.bodyTokenTitle}>
                  {Constants.home.otherLinks}
                </span>
              </div>
              <div css={[styles.links, mixins.flexAlignCenterJustifiedBetween]}>
                <SocialMediaButton
                  icon={AssetsImg.ic_otherLink}
                  name="Other Link"
                />
              </div>
            </div> */}
          </div>
        </div>
        {/*// )}*/}
        {/* TODO: Not be using in this release */}
        {/* <BottomSheet
        isOpen={shareNftSheetOpen}
        onClose={handleShareNftSheetClose}
      >
        <ShareNft />
      </BottomSheet>
      <BottomSheet isOpen={sendNftSheetOpen} onClose={handleSendNftSheetClose}>
        <SendNFt />
      </BottomSheet> */}
        {deletePopupOpen && (
          <BottomPopup
            isOpen={deletePopupOpen}
            onClose={() => setDeletePopupOpen(false)}
            addStyles={styles.logoutBottomSheet}
            size={BottomPopupSize.BIG}
          >
            <ConfirmDeleteListing
              onSuccess={() => {
                setFlowName(FlowName.DELETE);
                setDeletePopupOpen(false);
              }}
              onCancel={() => setDeletePopupOpen(false)}
              nftName={pageData?.name}
              listing_uuid={pageData?.sale_details?.listing_uuid as string}
              nft_uuid={pageData?.nft_uuid as string}
              currency={pageData?.currency as string}
              listing_price={pageData?.sale_details?.price as string}
            />
          </BottomPopup>
        )}
        {isAddonPopupOpen && (
          <BottomPopup
            isOpen={isAddonPopupOpen}
            addStyles={styles.logoutBottomSheet}
            size={BottomPopupSize.BIG}
            onClose={() => setIsAddonPopupOpen(false)}
            title="Cart"
          >
            <PurchaseAddon
              nft={{
                image: pageData?.image || ``,
                media_type: pageData?.media_type || ``,
                max_quantity: pageData?.maxPurchaseQuantity,
                name: pageData?.name || ``,
                quantity: nftQuantity,
                price: Number(
                  pageData?.sale_details?.skywallet_accepted_price || 0,
                ),
              }}
              isListingLocked={pageData?.is_listing_locked}
              onNFTQuantityUpdate={(quan) => setNFTQuantity(quan)}
              addOns={addOnData}
              onAddOnsUpdate={(data) => setAddOnData(data)}
              onSuccess={() => {
                setIsAddonPopupOpen(false);
                if (userInputs.length) {
                  setIsAddressPopupOpen(true);
                  return;
                }
                handlePurchase(pageData as GetListingsRespone);
              }}
              onCancel={() => setIsAddonPopupOpen(false)}
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              setCouponApply={setCouponApply}
              setIsAddonPopupOpen={setIsAddonPopupOpen}
            />
          </BottomPopup>
        )}
        {/* Todo: Manage all bottom popup using a single state */}
        {isAddressPopupOpen && (
          <BottomPopup
            isOpen={isAddressPopupOpen}
            size={BottomPopupSize.BIG}
            onClose={() => setIsAddressPopupOpen(false)}
          >
            <PurchaseAddress
              userInputs={userInputs}
              onUserInputUpdate={(userInputs) => {
                setUserInputs(userInputs);
              }}
              onSuccess={() => {
                setIsAddressPopupOpen(false);
                handlePurchase(pageData as GetListingsRespone);
              }}
              onCancel={() => setIsAddressPopupOpen(false)}
            />
          </BottomPopup>
        )}
        {createOffer && (
          <BottomPopup size={BottomPopupSize.BIG} isOpen={createOffer}>
            <CreateOffer
              onClose={() => {
                trackClick(CLICK.CLOSE_MAKE_AN_OFFER, {
                  listing_uuid: pageData?.sale_details?.listing_uuid as string,
                  nft_uuid: pageData?.nft_uuid as string,
                });
                setCreateOffer(false);
              }}
              minAmount={100}
              offerAmount={offerAmount}
              setOfferAmount={(e: any) => handleInputChange(e.target.value)}
              onCreate={onCreateOffer}
              isFailed={isFailure}
              setIsFailure={setIsFailure}
              conversionRate={pageData?.native_currency?.conversion_factor}
              conversionSymbol={pageData?.native_currency?.symbol}
              listing_uuid={pageData?.sale_details?.listing_uuid as string}
              nft_uuid={pageData?.nft_uuid as string}
              currency={pageData?.currency}
              nft_name={pageData?.name}
            />
          </BottomPopup>
        )}
        <PaymentOptionBottomSheet
          open={paymentOptionSheet.open}
          paymentOptions={paymentOptionSheet.options}
          onClose={() => {
            paymentOptionSheet?.onCancel?.();
            setPaymentOptionSheet({ open: false, options: [] });
          }}
          onSuccess={(paymentOption: PaymentOption) => {
            paymentOptionSheet?.onSelect?.(paymentOption);
            setPaymentOptionSheet({ open: false, options: [] });
          }}
        />
        {(flowName === FlowName.UPDATE || flowName === FlowName.DELETE) && (
          <NFTListingFlow
            onBack={() => {
              trackClick(CLICK.CLOSE_SELL_FLOW, {
                nft_uuid: pageData?.nft_uuid,
                nft_name: pageData?.name,
              });
              setFlowName(``);
            }}
            onClose={() => setFlowName(``)}
            nftUid={pageData?.nft_uuid || ``}
            listingUid={pageData?.sale_details?.listing_uuid || ``}
            nftName={pageData?.name || ``}
            nftMediaType={pageData?.media_type || ``}
            nftQuantity={String(
              pageData?.sale_details?.available_quantity || ``,
            )}
            nftMediaLink={pageData?.image || ``}
            price={pageData?.sale_details?.skywallet_accepted_price}
            flowName={flowName}
          />
        )}
        {previewState.isOpen && previewState.data && (
          <PurchaseListing
            preview={previewState.data}
            onClose={() => {
              setPreviewState({ isOpen: false });
            }}
          />
        )}
        <BottomPopup
          isOpen={benefitError.open}
          onClose={() => {
            benefitError.onClose?.();
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
        {viewOfferHandler.isOpen && viewOfferHandler.offerId && (
          <BottomPopup
            size={BottomPopupSize.BIG}
            isOpen={viewOfferHandler.isOpen}
          >
            <ViewOffer
              onClose={() => {
                setViewOfferHandler({ isOpen: false });
                setCreateOffer(false);
              }}
              offerId={viewOfferHandler.offerId}
              setPaymentStatus={NOOB}
              fetchOfferList={fetchOfferList}
            />
          </BottomPopup>
        )}
        {walletSelectorConfig.open && user?.profile && (
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
              hideEthAccounts={
                Constants.NFTBlockchainMap[pageData?.blockchain?.id || ``]
                  ?.chainId === 0
              }
            />
          </BottomPopup>
        )}
        {mintCountConfig.open && user?.profile && (
          <BottomPopup
            size={BottomPopupSize.MEDIUM}
            isOpen={mintCountConfig.open}
            title="Mint NFT"
            onClose={() => {
              mintCountConfig.onMintCancel?.();
              setMintCountConfig({
                open: false,
                maxMintCount: 0,
              });
            }}
          >
            <BurnedTokenNftClaimSheet
              onMint={(count) => {
                mintCountConfig.onMint?.(count);
                setMintCountConfig({
                  open: false,
                  maxMintCount: 0,
                });
              }}
              totalAvailable={mintCountConfig.maxMintCount}
            />
          </BottomPopup>
        )}
        {switchErrorOpen?.isOpen && (
          <BottomPopup
            isOpen={true}
            onClose={() => {
              setSwitchErrorOpen({
                isOpen: false,
                chain: ``,
                chainId: 0,
              });
            }}
          >
            <NetworkSwitchError
              chain={switchErrorOpen.chain || ``}
              chainId={Number(switchErrorOpen.chainId || `0`)}
            />
          </BottomPopup>
        )}
      </Fragment>
    </BottomNav>
  );
};

export default PurchaseNFT;
