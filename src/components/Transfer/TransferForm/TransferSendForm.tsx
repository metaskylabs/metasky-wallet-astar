import React, { useEffect } from 'react';
import * as styles from '../styles';
import {
  DefaultCard,
  IconLabelledRowInput,
  PrimaryButton,
} from '@components/Shared';
import { FormikTouched, FormikValues } from 'formik';
import { mixins, utils } from '@styles/shared';
import WalletBalanceSelect from '@components/WalletBalanceSelect';
import * as Constants from '@utils/constants';
import MLottie from '@components/Shared/Lottie';
import { WalletBalanceResponse } from '@typings/api/transfer';
import AssetsImg from '@public/images';
import LabelledRadioButton from '@components/LabelledRadioButton';
import { useTranslate } from '@utils/useTranslate';
import DisclaimerText from '@components/Shared/DisclaimerText';
import * as disclaimerTextStyles from '@components/Shared/DisclaimerText/styles';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';

export enum AssetType {
  NFT,
  TOKEN,
}

export default function TransferSendForm(props: {
  assetType: AssetType;
  onAssetTypeChange: (assetType: AssetType) => void;
  errors: any;
  nftList: WalletBalanceResponse[];
  selectedNft?: WalletBalanceResponse;
  onNftChange: (nft: WalletBalanceResponse) => void;
  onNftQuantityChange: (quantity: string) => void;
  quantity: string;
  onQuantityChange: (e: any) => void;
  total_no_of_asset?: string;
  address: string;
  onAddressChange: (e: any) => void;
  note: string;
  onNoteChange: (e: any) => void;
  submitButtonText: string;
  onSubmit: () => void;
  submitting: boolean;
  setScanSheetOpen: any;
  getNFTStatus?: boolean;
  touched?: FormikTouched<FormikValues>;
  onAddressBlur?: (e: any) => void;
  blockDecimal?: boolean;
}) {
  const { translate } = useTranslate();
  const eventLogger = useAnalytics();

  return (
    <HeaderWithButtonLayout
      ctaContent={
        <div css={styles.transferBtnWrapper}>
          <PrimaryButton
            onClick={props.onSubmit}
            addStyles={styles.transferBtn}
            disabled={props.submitting}
          >
            {props.submitting ? (
              <span>
                <MLottie addStyles={styles.loader} />
              </span>
            ) : (
              props.submitButtonText
            )}
          </PrimaryButton>
        </div>
      }
      wrapperStyles={styles.buttonLayoutHeight}
    >
      <div css={[mixins.flexColumn, utils.ml(18), utils.mr(18)]}>
        <div css={[mixins.flexAlignCenter, styles.typeContainer]}>
          <div css={styles.selectType}>{translate(`SELECT_ASSET`)}</div>
          <LabelledRadioButton
            checked={props.assetType === AssetType.NFT}
            onChange={(e) => {
              props.onAssetTypeChange(AssetType.NFT);
            }}
          >
            <div
              css={[
                styles.label,
                props.assetType === AssetType.NFT ? styles.labelActive : ``,
              ]}
            >
              {translate(`NFT`)}
            </div>
          </LabelledRadioButton>
          <LabelledRadioButton
            checked={props.assetType === AssetType.TOKEN}
            onChange={(e) => {
              props.onAssetTypeChange(AssetType.TOKEN);
            }}
          >
            <div
              css={[
                styles.label,
                props.assetType === AssetType.TOKEN ? styles.labelActive : ``,
              ]}
            >
              {translate(`COIN`)}
            </div>
          </LabelledRadioButton>
        </div>
        {props?.selectedNft ? (
          <DisclaimerText>
            <span css={[disclaimerTextStyles.disclaimerText]}>
              {`This token is on `}
              <span css={[disclaimerTextStyles.disclaimerNetwork]}>
                {/* {props?.selectedNft?.network_name}
                 */}
                 XRP
              </span>
              {` network. Please make sure you are receiving or sending on an address on
            the same network as the token, otherwise the token may get lost. `}
            </span>
          </DisclaimerText>
        ) : (
          <DefaultCard
            title={
              props.assetType === AssetType.NFT
                ? `No NFTs found.`
                : `No Coins found.`
            }
            addStyles={disclaimerTextStyles.defaultCard}
            image={``}
          />
        )}

        <div css={[mixins.positionRelative]}>
          <WalletBalanceSelect
            icon={AssetsImg.ic_formAsset.src}
            itemList={
              props.assetType === AssetType.TOKEN
                ? props.nftList.filter((item) => Number(item?.no_of_asset) > 0)
                : props.nftList
            }
            onChange={(val) => {
              props.onNftChange(val);
            }}
            value={props.selectedNft}
            iconName={`Asset`}
            assetType={props.assetType}
            setQty={props.onNftQuantityChange}
            error={props.errors.nft_uuid}
            label={translate(`ASSET`)}
          />
        </div>
        {/* <div css={styles.qtyContainer}> */}
        <IconLabelledRowInput
          labelIcon={AssetsImg.ic_formCount.src}
          labelIconName="Quantity"
          label={translate(`QUANTITY`)}
          type={Constants.InputType.number}
          placeholder={translate(`QUANTITY_OF_ASSETS`)}
          name={
            props.assetType === AssetType.TOKEN ? `coinQuantity` : `quantity`
          }
          value={props.quantity}
          handleChange={props.onQuantityChange}
          errors={
            props.assetType === AssetType.TOKEN
              ? props.errors?.coinQuantity
              : props.errors.quantity
          }
          // noSpecialCharacterCheck
          tooltip={translate(`TRANSFER_COUNT_TOOLTIP`)}
          blockDecimal={props.blockDecimal}
          noSpecialCharacterCheck={props.blockDecimal}
        />
        {/* <p css={utils.ml(12)}>of {props.total_no_of_asset} owned</p> */}
        {/* </div> */}
        <IconLabelledRowInput
          labelIcon={AssetsImg.ic_formMobile.src}
          label={translate(`TO`)}
          labelIconName="To"
          type={Constants.InputType.text}
          placeholder={translate(`WALLET_ADDRESS`)}
          name="address"
          value={props.address}
          handleChange={props.onAddressChange}
          onScan={props.setScanSheetOpen}
          inputIcon={AssetsImg.ic_formScan.src}
          inputIconName={`scan`}
          tooltip={translate(`TRANSFER_TO_TOOLTIP`)}
          spellCheck={false}
          handleBlur={props?.onAddressBlur}
          errors={props?.touched?.address ? props.errors.address : ``}
        />
        <IconLabelledRowInput
          labelIcon={AssetsImg.ic_formEdit.src}
          label={translate(`NOTE`)}
          labelIconName="Note"
          type={Constants.InputType.text}
          placeholder={translate(`ADD_A_NOTE`)}
          name="note"
          value={props.note}
          handleChange={props.onNoteChange}
          errors={props.errors.note}
        />
      </div>
    </HeaderWithButtonLayout>
  );
}
