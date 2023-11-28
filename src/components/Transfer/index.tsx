import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import AssetsImg from '@public/images';
import * as Constants from '@utils/constants';
import { FormikErrors, FormikValues } from 'formik';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { BottomPopup } from '../Shared';
import { useRouter } from 'next/router';
import {
  numberRegex,
  onlyNumber,
  onlyNumberMaxFiveDecimals,
} from '@utils/regexes';
import Success from '@components/Success';
import { ViewState } from '@constants/transfer';
import {
  ConfirmTransferPayload,
  MakeTransferPayload,
  PreviewTransferResponse,
  WalletBalanceResponse,
} from '@typings/api/transfer';
import {
  buyCoin,
  getWalletBalance,
  makeTransfer,
  previewTransfer,
} from '@actions/transfer';
import { StoreState } from '@reducers';
import { useDispatch, useSelector } from 'react-redux';
import { State as profileState } from '@reducers/user';
import { State as transferState } from '@reducers/transfer';
import ConfirmTransfer from '@components/ConfirmTransfer';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { Pages } from '@utils/navigation';
import { trackSwipe } from '@utils/analytics';
import { CLICK, EVENT_PAGE, swipe } from '@constants/analytics';
import { AssetType } from './TransferForm/TransferSendForm';
import { walletBalanceTokens } from '@actions/wallet';
import { BalanceTokensResponse } from '@typings/api/wallet';
import {
  resetTransferState,
  setTransferAddressValue,
  setTransferNotesValue,
  setTransferQtyValue,
} from '@actions/tranferPayload';
import { useTranslate } from '@utils/useTranslate';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import TransferForm from '@components/Transfer/TransferForm';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import Scan from '@components/Scan';
import { useAnalytics } from '@utils/useAnalytics';
import { ActionType } from '@reducers/transactionHistoryList';
import { isNumber } from 'lodash';

interface TransferProps {
  defaultNftUid?: string;
  transferLoading: boolean;
  setTransferOpen: (b: boolean) => void;
  setTransferLoading: (b: boolean) => void;
}

const Transfer: FC<TransferProps> = ({
  defaultNftUid,
  setTransferOpen,
  transferLoading,
  setTransferLoading,
}) => {
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const eventLogger = useAnalytics();
  const [viewState, setViewState] = useState<ViewState>(
    ViewState.TRANSFER_FORM,
  );
  const [transferUUId, setTransferUUId] = useState<string | null>(null);
  const transfer = useSelector<StoreState, transferState>(
    (state) => state.transfer,
  );
  const [transferActiveTab, setTransferActiveTab] =
    useState<Constants.TransferType>(Constants.TransferType.SEND);
  const { profile } = useSelector<StoreState, profileState>(
    (state) => state.user,
  );
  const [assetType, setAssetType] = useState<AssetType>(AssetType.NFT);
  const [confirmationDetails, setConfirmationDetails] =
    useState<PreviewTransferResponse>();
  const [transferPayload, setTransferPayload] =
    useState<ConfirmTransferPayload>();
  const [transferQty, setTransferQty] = useState(``);
  const [transferCoinQty, setTransferCoinQty] = useState(``);
  const [transferAddress, setTransferAddress] = useState(``);
  const [transferNotes, setTransferNotes] = useState(``);
  const [balanceDataValue, setBalanceDataValue] =
    useState<WalletBalanceResponse>();
  const [balanceDataList, setBalanceDataList] = useState<
    WalletBalanceResponse[] | undefined
  >([]);
  const [selectedCoin, setSelectedCoin] = useState<BalanceTokensResponse>();
  const [coinList, setCoinList] = useState<BalanceTokensResponse[] | undefined>(
    [],
  );
  const [isFailure, setIsFailure] = useState<boolean>(false);
  const [paymentLink, setPaymentLink] = useState<string | undefined>();
  const [amount, setAmount] = useState<string>(`500`);
  const router = useRouter();
  const [paymentQR, setPaymentQR] = useState<string | null>(null);
  const [orderUUID, setOrderUUID] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (transferUUId != null && viewState === ViewState.SCAN) {
      setViewState(ViewState.TRANSFER_FORM);
    }
  }, [transferUUId]);

  useEffect(() => {
    setAmount(
      (
        Math.ceil(
          Number(confirmationDetails?.recharge.minimum_pg_amount) / 100,
        ) * 100
      ) //rounding UP to nearest 100
        .toString(),
    );
  }, [confirmationDetails]);

  useEffect(() => {
    eventLogger.trackPage(EVENT_PAGE.TRANSFER);
    async function fetchBalance() {
      try {
        setIsLoading(true);
        const response = await getWalletBalance();
        setBalanceDataList(response.data);
        setIsLoading(false);
        const defaultNft =
          response.data?.find((data) => data.asset_uuid === defaultNftUid) ||
          response.data[0];
        setBalanceDataValue(defaultNft);
      } catch (err) {
        handleErrorMessage(err);
      }
    }
    fetchBalance();

    return () => {
      resetTransferState();
    };
  }, []);

  useEffect(() => {
    async function fetchWalletBalance() {
      try {
        const response = await walletBalanceTokens();
        setCoinList(response.data);
        setSelectedCoin(
          response.data.filter((item) => Number(item.no_of_asset) > 0)[0],
        );
      } catch (err) {
        handleErrorMessage(err);
      }
    }
    fetchWalletBalance();
    return;
  }, []);

  const initialValues: { [key: string]: string } = useMemo(
    () => ({
      nft_uuid: `${transfer.transfer_uuid ?? balanceDataValue?.asset_uuid}`,
      quantity: transferPayload?.quantity
        ? transferPayload.quantity
        : transferQty
        ? transferQty
        : transfer.qty
        ? transfer.qty
        : balanceDataValue
        ? `1`
        : ``,
      coinQuantity: selectedCoin
        ? Math.max(Number(selectedCoin?.no_of_asset) || 0, 0).toFixed(
            isNumber(selectedCoin.precision) ? selectedCoin.precision : 5,
          )
        : ``,
      address: transferPayload?.to_address
        ? transferPayload.to_address
        : transferUUId
        ? transferUUId
        : transferAddress
        ? transferAddress
        : transfer.transfer_address
        ? transfer.transfer_address
        : ``,
      note: transferPayload?.note
        ? transferPayload.note
        : transferNotes
        ? transferNotes
        : transfer.notes
        ? transfer.notes
        : ``,
    }),
    [
      balanceDataValue,
      selectedCoin,
      // transfer,
      // transferAddress,
      // transferNotes,
      // transferPayload,
      // transferQty,
      // transferUUId,
    ],
  );

  const validateFields = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (
      (assetType === AssetType.NFT && !balanceDataValue?.asset_uuid) ||
      (assetType === AssetType.TOKEN && !selectedCoin?.asset_uuid)
    ) {
      errors.nft_uuid = `Asset not selected`;
    }

    if (assetType === AssetType.NFT) {
      if (!values.quantity || !numberRegex.test(values.quantity)) {
        errors.quantity = translate(`PLEASE_ENTER_A_VALID_QUANTITY`);
      } else if (
        Number(values.quantity) > Number(balanceDataValue?.no_of_asset)
      ) {
        errors.quantity = translate(`INSUFFICIENT_ASSETS`);
      } else {
        setTransferQty(values.quantity);
        setTransferQtyValue(values.quantity);
      }
    } else {
      if (!values.coinQuantity) {
        errors.coinQuantity = translate(`PLEASE_ENTER_A_VALID_QUANTITY`);
      } else if (!onlyNumber.test(values.coinQuantity)) {
        errors.coinQuantity = translate(`PLEASE_ENTER_A_VALID_QUANTITY`);
      } else if (!onlyNumberMaxFiveDecimals.test(values.coinQuantity)) {
        errors.coinQuantity = translate(`DECIMALS_ERROR`).replace(
          `5`,
          (selectedCoin && selectedCoin.precision
            ? selectedCoin.precision
            : `5`) + ``,
        );
      } else if (
        Number(values.coinQuantity) > Number(selectedCoin?.no_of_asset)
      ) {
        errors.coinQuantity = translate(`INSUFFICIENT_ASSETS`);
      } else if (
        //should rename the maxlength enum
        Number(values.coinQuantity) < Constants.maxLength.minTokenTransfer
      ) {
        errors.coinQuantity = `${translate(`MINIMUM_VALUE_ALLOWED`)} ${
          Constants.maxLength.minTokenTransfer
        }`;
      } else {
        // setTransferQty(values.coinQuantity);
        setTransferCoinQty(values.coinQuantity);
        setTransferQtyValue(values.coinQuantity);
      }
    }

    if (!values.address) {
      errors.address = translate(`PLEASE_ENTER_RECEIVERS_WALLET_ADDRESS`);
    } else if (
      profile?.allWalletAddresses?.some(
        (wallet) => wallet.address === values.address,
      )
    ) {
      errors.address = translate(`INVALID_WALLET_ADDRESS`);
    } else if (assetType === AssetType.NFT) {
      const regex = new RegExp('.*'|| balanceDataValue?.address_validator as string);
      if (!regex.test(values.address)) {
        errors.address = translate(`INVALID_WALLET_ADDRESS`);
      } else {
        setTransferAddress(values.address);
        setTransferAddressValue(values.address);
      }
    } else if (assetType === AssetType.TOKEN) {
      const regex = new RegExp('.*'|| selectedCoin?.address_validator as string);
      if (!regex.test(values.address)) {
        errors.address = translate(`INVALID_WALLET_ADDRESS`);
      } else {
        setTransferAddress(values.address);
        setTransferAddressValue(values.address);
      }
    }

    if (values.note.length > 100) {
      errors.note = translate(`NOTES_ERROR`);
    } else {
      setTransferNotes(values.note);
      setTransferNotesValue(values.note);
    }
    return errors;
  };

  const getConfirmationDetails = async (payload: ConfirmTransferPayload) => {
    try {
      const response = await previewTransfer({
        nft_uuid: payload.nft_uuid,
        token_uuid: payload.token_uuid,
        quantity: payload.quantity,
        to_address: payload.to_address,
      });
      await setConfirmationDetails(response.data);
      // setTransferOpen(false);
      setTransferLoading(false);
      setViewState(ViewState.CONFIRM_FORM);
    } catch (e) {
      handleErrorMessage(e);
      setTransferLoading(false);
    }
  };

  const transferAsset = async () => {
    const minAmount = Math.ceil(
      Math.max(
        Number(confirmationDetails?.recharge?.minimum_pg_amount),
        Number(confirmationDetails?.recharge?.deposit_value),
      ),
    );
    if (
      confirmationDetails?.recharge.deposit_value &&
      confirmationDetails.recharge.is_required &&
      (parseFloat(amount) < minAmount || amount == ``)
    ) {
      generateToast({
        type: ToastType.INFO,
        content: translate(`LESS_RECHARGE_AMOUNT_ERROR`),
      });
      setIsFailure(true);
      return { success: false, orderId: `` };
    } else {
      if (transferPayload) {
        const payload: MakeTransferPayload = {
          token_uuid: transferPayload?.token_uuid,
          nft_uuid: transferPayload?.nft_uuid,
          to_address: transferPayload?.to_address,
          quantity: transferPayload?.quantity,
          note: transferPayload?.note,
        };
        const response = await makeTransfer(payload);
        return { success: true, orderId: response.data.order_uuid };
      }
    }
  };

  const handleTransfer = async () => {
    try {
      if (amount && parseFloat(amount) > 0) {
        if (
          confirmationDetails?.recharge?.minimum_pg_amount &&
          parseFloat(amount) <
            parseFloat(confirmationDetails?.recharge?.minimum_pg_amount)
        ) {
          const minAmount = Math.ceil(
            Math.max(
              Number(confirmationDetails?.recharge?.minimum_pg_amount),
              Number(confirmationDetails?.recharge?.deposit_value),
            ),
          );
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                Please enter a minimum recharge amount of &#8377;
                {minAmount}
              </>
            ),
          });
          setIsFailure(true);
        } else if (
          confirmationDetails?.recharge?.maximum_pg_amount &&
          parseFloat(amount) > confirmationDetails?.recharge?.maximum_pg_amount
        ) {
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                Please enter a maximum recharge amount of &#8377;
                {confirmationDetails.recharge.maximum_pg_amount}
              </>
            ),
          });
          setIsFailure(true);
        } else {
          const transferStatus = await transferAsset();
          if (transferStatus?.success) {
            await rechargeWallet(transferStatus.orderId);
          }
          eventLogger.trackEvent(`Transfer process`, {
            recharge_required: confirmationDetails?.recharge.is_required,
            amount: amount,
            Status: transferStatus?.success ? `success` : `fail`,
          });
        }
      } else {
        const transferStatus = await transferAsset();
        if (transferStatus?.success) {
          eventLogger.trackEvent(`Transfer process`, {
            recharge_required: confirmationDetails?.recharge.is_required,
            amount: amount,
            Status: transferStatus?.success ? `success` : `fail`,
          });
          dispatch({
            type: ActionType.SET_PAGE_META_DATA,
            payload: { clickID: null, pageId: 1, pageIdPrev: 1 },
          });
          await router.push(`${Pages.TRANSACTION}?refresh=true`);
        }
        eventLogger.trackEvent(`Transfer process`, {
          recharge_required: confirmationDetails?.recharge.is_required,
          amount: amount,
          Status: transferStatus?.success ? `success` : `fail`,
        });
      }
    } catch (e) {
      handleErrorMessage(e);
      setTransferLoading(false);
      setIsFailure(true);
    }
  };

  const rechargeWallet = async (_orderId: string) => {
    const buyCoinPayload = {
      fiat_currency: confirmationDetails?.recharge.deposit_currency,
      fiat_amount: amount,
      coin_name: confirmationDetails?.recharge.destination_currency,
      parent_order_id: _orderId as string,
      upi_id: process.env.NEXT_PUBLIC_DECENTRO_UPI_KEY as string,
    };
    const buyCoinResponse = await buyCoin(buyCoinPayload);
    const data = buyCoinResponse.data;
    eventLogger.trackEvent(`Payment Mode`, {
      gateway: data.paymentGateway,
    });
    if (
      data.paymentGateway === `DECENTRO` &&
      data.paymentUrl &&
      data.qrCode &&
      data.order_uuid
    ) {
      setPaymentLink(data.paymentUrl);
      setPaymentQR(data.qrCode);
      setOrderUUID(data.order_uuid);
    } else if (data.paymentGateway == `AIRPAY` && data.metaData) {
      const paymentUrl =
        window.location.origin +
        `/airpayForm?airpaydata=${JSON.stringify(data.metaData)}&orderId=${
          data.orderId
        }`;

      setPaymentLink(paymentUrl);
    } else if (data.paymentUrl) {
      setPaymentLink(data.paymentUrl);
    } else {
      generateToast({
        content: Constants.PaymentError.content,
        type: ToastType.ERROR,
      });
      return;
    }
    setViewState(ViewState.PROCEED_TO_PAYMENT);
  };

  const redirectToPayment = () => {
    eventLogger.trackClick(`Payment Initiated`, { link: paymentLink });
    if (typeof window !== `undefined`) {
      if (paymentQR) {
        window.open(
          `${Pages.DECENTRO_QR}?paymentQR=${encodeURIComponent(
            paymentQR,
          )}&orderUUID=${orderUUID}&paymentLink=${paymentLink}`,
          `_blank`,
        );
      } else {
        window.open(paymentLink, `_blank`);
      }
    }
  };

  const BottomSheetHandler = () => {
    switch (viewState) {
      case ViewState.TRANSFER_FORM:
        return (
          <TransferForm
            onClose={() => {
              eventLogger.trackClick(CLICK.TRANSFER_CLOSED);
              setTransferOpen(false);
            }}
            title={translate(`TRANSFER`)}
            transferActiveTab={transferActiveTab}
            setTransferActiveTab={setTransferActiveTab}
            initialValues={initialValues}
            validateFields={validateFields}
            assetType={assetType}
            balanceDataValue={balanceDataValue}
            selectedCoin={selectedCoin}
            setTransferLoading={setTransferLoading}
            setTransferPayload={setTransferPayload}
            getConfirmationDetails={getConfirmationDetails}
            balanceDataList={balanceDataList}
            coinList={coinList}
            setTransferQty={setTransferQty}
            setSelectedCoin={setSelectedCoin}
            isLoading={isLoading}
            setAssetType={setAssetType}
            setScanSheetOpen={() => {
              setTransferUUId(null);
              setViewState(ViewState.SCAN);
              eventLogger.trackClick(`Scan Open`);
            }}
            setBalanceDataValue={setBalanceDataValue}
            transferLoading={transferLoading}
          />
        );

      case ViewState.CONFIRM_FORM:
        if (transferPayload && confirmationDetails) {
          return (
            <ConfirmTransfer
              onClose={() => {
                eventLogger.trackClick(CLICK.TRANSFER_CLOSED);
                setTransferOpen(false);
              }}
              transferPayload={transferPayload}
              confirmationDetails={confirmationDetails}
              setViewState={setViewState}
              setTransferOpen={setTransferOpen}
              // setTransferComplete={setTransferComplete}
              // transferComplete={transferComplete}
              setIsFailure={setIsFailure}
              isFailure={isFailure}
              amount={amount}
              setAmount={setAmount}
              handleTransfer={handleTransfer}
              headerTitle={
                assetType === AssetType.NFT
                  ? translate(`SEND_NFT`)
                  : translate(`SEND_COIN`)
              }
            />
          );
        }

      case ViewState.PROCEED_TO_PAYMENT:
        return (
          <HeaderWithButtonLayout
            onClose={() => {
              eventLogger.trackClick(CLICK.TRANSFER_CLOSED);
              setTransferOpen(false);
            }}
            onBack={() => setViewState(ViewState.CONFIRM_FORM)}
          >
            <Success
              title={translate(`CLICK_BELOW_FOR_PAYMENT`)}
              ctaText={translate(`CONTINUE`)}
              ctaClick={() => {
                eventLogger.trackClick(CLICK.TRANSFER_CLOSED);
                redirectToPayment();
              }}
              smallIcon={true}
              ellipse={true}
              avatar={AssetsImg.ic_walletIcon.src}
            />
          </HeaderWithButtonLayout>
        );

      case ViewState.FAIL:
        return (
          <HeaderWithButtonLayout
            onClose={() => {
              eventLogger.trackClick(CLICK.TRANSFER_CLOSED);
              setTransferOpen(false);
            }}
            onBack={() => setViewState(ViewState.CONFIRM_FORM)}
          >
            <Success
              title={translate(`TRANSFER_FAILED`)}
              subTitle={translate(`TRANSFER_ERROR`)}
              smallIcon={true}
              isFailed={true}
              ellipse={true}
            />
          </HeaderWithButtonLayout>
        );
      case ViewState.SCAN:
        return (
          <HeaderWithButtonLayout
            onClose={() => {
              eventLogger.trackClick(CLICK.TRANSFER_CLOSED);

              setTransferOpen(false);
            }}
            title={`Scan`}
            onBack={() => {
              setViewState(ViewState.TRANSFER_FORM);
              eventLogger.trackPage(EVENT_PAGE.SCAN);
            }}
          >
            <Scan onSuccess={(address) => setTransferUUId(address)} />
          </HeaderWithButtonLayout>
        );
    }
  };

  return (
    <Fragment>
      <BottomPopup size={BottomPopupSize.BIG} isOpen={true}>
        {BottomSheetHandler()}
      </BottomPopup>
    </Fragment>
  );
};

export default Transfer;
