import { FC, Fragment } from 'react';
import Tab from '@components/Transfer/tab';
import * as Constants from '@utils/constants';
import { Formik, FormikValues } from 'formik';
import TransferSendForm, {
  AssetType,
} from '@components/Transfer/TransferForm/TransferSendForm';
import { trackClick } from '@utils/analytics';
import { CLICK, click } from '@constants/analytics';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { limitDecimal } from '@utils/helper';
import WalletAddress from '@components/WalletAddress';
import {
  ConfirmTransferPayload,
  WalletBalanceResponse,
} from '@typings/api/transfer';
import { BalanceTokensResponse } from '@typings/api/wallet';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import {
  addressWrapper,
  buttonLayoutHeight,
} from '@components/Transfer/styles';
import { useAnalytics } from '@utils/useAnalytics';
import { isNumber } from 'lodash';

interface TransferFormProps {
  transferActiveTab: Constants.TransferType;
  setTransferActiveTab: (activeTab: Constants.TransferType) => void;
  initialValues: { [key: string]: string };
  validateFields: (values: FormikValues) => void;
  assetType: AssetType;
  balanceDataValue?: WalletBalanceResponse;
  selectedCoin?: BalanceTokensResponse;
  setTransferLoading: (state: boolean) => void;
  setTransferPayload: (payload: ConfirmTransferPayload) => void;
  getConfirmationDetails: (payload: ConfirmTransferPayload) => void;
  balanceDataList?: WalletBalanceResponse[];
  coinList?: BalanceTokensResponse[];
  setTransferQty: (value: string) => void;
  setSelectedCoin?: (payload: BalanceTokensResponse) => void;
  isLoading: boolean;
  setAssetType: (assetType: AssetType) => void;
  setScanSheetOpen: () => void;
  setBalanceDataValue: (payload: WalletBalanceResponse) => void;
  transferLoading: boolean;
  onClose: () => void;
  title: string;
}

const TransferForm: FC<TransferFormProps> = ({
  transferActiveTab,
  setTransferActiveTab,
  initialValues,
  validateFields,
  assetType,
  balanceDataValue,
  selectedCoin,
  setTransferLoading,
  setTransferPayload,
  getConfirmationDetails,
  balanceDataList,
  coinList,
  setTransferQty,
  setSelectedCoin,
  isLoading,
  setAssetType,
  setScanSheetOpen,
  setBalanceDataValue,
  transferLoading,
  onClose,
  title,
}) => {
  const { translate } = useTranslate();
  const eventLogger = useAnalytics();

  return (
    <Fragment>
      <HeaderWithButtonLayout onClose={onClose} title={title}>
        <Tab
          activeTab={transferActiveTab}
          onActiveTabChange={(activeTab) => {
            eventLogger.trackClick(`Changed Tab`, { active_tab: activeTab });
            setTransferActiveTab(activeTab);
          }}
        />
        {transferActiveTab === Constants.TransferType.SEND ? (
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validate={validateFields}
            validateOnChange
            onSubmit={async (values: FormikValues, { setSubmitting }) => {
              eventLogger.trackClick(`Send`, {
                asset_type: assetType === AssetType.NFT ? `NFT` : `Token`,
              });
              if (assetType === AssetType.NFT && !balanceDataValue) return;
              if (assetType === AssetType.TOKEN && !selectedCoin) return;

              setTransferLoading(true);
              if (assetType === AssetType.NFT) {
                const payload = {
                  token_uuid: ``,
                  nft_uuid: balanceDataValue?.asset_uuid || ``,
                  to_address: values.address,
                  quantity: values.quantity,
                  note: values.note,
                  image: balanceDataValue?.image,
                  media_type: balanceDataValue?.media_type,
                  name: balanceDataValue?.name,
                };
                await setTransferPayload(payload);
                getConfirmationDetails(payload);
              } else {
                const payload = {
                  token_uuid: selectedCoin?.asset_uuid || ``,
                  nft_uuid: ``,
                  to_address: values.address,
                  quantity: values.coinQuantity,
                  note: values.note,
                  image: selectedCoin?.asset_logo,
                  media_type: selectedCoin?.asset_media_type,
                  name: selectedCoin?.asset_name,
                };
                setTransferPayload(payload);
                getConfirmationDetails(payload);
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              validateForm,
            }) => (
              <TransferSendForm
                assetType={assetType}
                onAddressBlur={handleBlur}
                getNFTStatus={isLoading}
                touched={touched}
                onAssetTypeChange={setAssetType}
                errors={errors}
                note={values.note}
                nftList={
                  assetType === AssetType.NFT
                    ? balanceDataList || []
                    : (coinList || []).map((coin) => ({
                        ...coin,
                        name: coin.asset_name,
                        image: coin.asset_logo,
                        media_type: coin.asset_media_type,
                      }))
                }
                quantity={
                  assetType === AssetType.NFT
                    ? values.quantity
                    : values.coinQuantity
                }
                address={values.address}
                selectedNft={
                  assetType === AssetType.NFT
                    ? balanceDataValue
                    : selectedCoin && {
                        asset_uuid: selectedCoin.asset_uuid,
                        no_of_asset: selectedCoin.no_of_asset,
                        name: selectedCoin.asset_name,
                        image: selectedCoin.asset_logo,
                        media_type: selectedCoin.asset_media_type,
                        address_validator: selectedCoin.address_validator,
                        network_name: selectedCoin.network_name,
                      }
                }
                setScanSheetOpen={setScanSheetOpen}
                submitButtonText={
                  assetType === AssetType.NFT
                    ? translate(`SEND_NFT`)
                    : translate(`SEND_COIN`)
                }
                submitting={transferLoading}
                total_no_of_asset={balanceDataValue?.no_of_asset}
                onNftChange={(val) => {
                  eventLogger.trackClick(`Asset Dropdown`, { value: val.name });
                  assetType === AssetType.NFT
                    ? setBalanceDataValue(val)
                    : setSelectedCoin &&
                      setSelectedCoin(
                        coinList?.find(
                          (coin) => coin.asset_uuid === val.asset_uuid,
                        ) || (coinList || [])[0],
                      );
                }}
                onNftQuantityChange={setTransferQty}
                onQuantityChange={(e) => {
                  const hasDecimals = e.target.value.split(`.`).length > 1;
                  if (hasDecimals) {
                    const decimals = e.target.value.split(`.`)[1];
                    if (
                      decimals.length >
                      (selectedCoin && isNumber(selectedCoin.precision)
                        ? selectedCoin.precision
                        : 5)
                    ) {
                      return;
                    }
                  }
                  handleChange(e);
                }}
                onAddressChange={(e) => {
                  handleChange(e);
                  validateForm({ ...values, address: e.target.value });
                }}
                onNoteChange={handleChange}
                onSubmit={handleSubmit}
                blockDecimal={
                  selectedCoin &&
                  isNumber(selectedCoin.precision) &&
                  selectedCoin.precision === 0
                }
              />
            )}
          </Formik>
        ) : (
          <HeaderWithButtonLayout wrapperStyles={buttonLayoutHeight}>
            <div css={addressWrapper}>
              <WalletAddress />
            </div>
          </HeaderWithButtonLayout>
        )}
      </HeaderWithButtonLayout>
    </Fragment>
  );
};

export default TransferForm;
