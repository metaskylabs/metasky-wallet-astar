import {
  ChangeEvent,
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { motion } from 'framer-motion';
import { mixins, typography, utils } from '@styles/shared';
import { PrimaryButton, SecondaryButton } from '@components/Shared';
import AssetCard from '@components/Transaction/TransactionDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardNfts from './Nfts';
import NOOB from '@constants/noob';
import { TicketUserInput } from '@typings/api/wallet';
import * as Constants from '@utils/constants';
import ButtonLabelledRowInput from '@components/Shared/Input/ButtonLabelledRowInput';
import router from 'next/router';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { validateCoupon } from '@actions/payment';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import {
  COUPON_APPLIED_SUCCESSFULLY,
  ENTER_VALID_COUPON_CODE,
  ENTER_VALID_COUPON_CODE_TO_CONTINUE,
  INVALID_COUPON,
} from './PurchaseAddonConstants';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { useUserSession } from '@utils/hooks/useUserSession';

export type PurchaseAddOnItem = {
  description: string;
  image: string;
  listing_uuid: string;
  max_quantity: number;
  media_type: string;
  name: string;
  skywallet_accepted_currency: string;
  skywallet_accepted_price: string;
  quantity: number;
  requires_physical_address?: boolean;
  userInputs?: TicketUserInput[];
};

export type NFT = {
  image: string;
  max_quantity?: number;
  media_type: string;
  name: string;
  quantity: number;
  price: number;
};

interface PurchaseAddOnProps {
  nft: NFT;
  onNFTQuantityUpdate: (quantity: number) => void;
  addOns: PurchaseAddOnItem[];
  onAddOnsUpdate: (addOns: PurchaseAddOnItem[]) => void;
  onCancel: () => void;
  onSuccess: () => void;
  isListingLocked?: boolean;
  discountCode?: string;
  setDiscountCode: (couponCode: string) => void;
  setCouponApply: (openState: boolean) => void;
  setIsAddonPopupOpen: (code: boolean) => void;
}

const PurchaseAddOn: FC<PurchaseAddOnProps> = ({
  nft,
  onNFTQuantityUpdate,
  addOns,
  onAddOnsUpdate,
  onCancel,
  onSuccess,
  isListingLocked,
  discountCode,
  setDiscountCode,
  setCouponApply,
  setIsAddonPopupOpen,
}) => {
  const { query } = router;
  const [description, setDescription] = useState<string>();
  const [errors, setErrors] = useState<string>();
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);
  const session = useUserSession();

  const validateDiscountCode = async () => {
    const listing_uuid = query.id as string;
    if (!session.isLoggedIn) {
      setCouponApply(true);
      setIsAddonPopupOpen(false);
      return;
    }
    if (discountCode) {
      try {
        const { data } = await validateCoupon({
          listing_uuid,
          coupon_code: discountCode,
        });
        setIsValidCoupon(data.isCouponValid);
        if (data.isCouponValid) {
          setDescription(COUPON_APPLIED_SUCCESSFULLY);
          setErrors(``);
        } else {
          setErrors(INVALID_COUPON);
          setDescription(``);
        }
        return data.isCouponValid;
      } catch (error) {
        handleErrorMessage(error);
        return;
      }
    } else {
      setErrors(ENTER_VALID_COUPON_CODE);
      setDescription(``);
    }
  };

  const handleContinueButton = async () => {
    if (!session.isLoggedIn) {
      setCouponApply(true);
      setIsAddonPopupOpen(false);
      return;
    }
    if (isListingLocked) {
      const response = await validateDiscountCode();
      if (response) {
        if (isValidCoupon || !isListingLocked) {
          onSuccess();
        }
      } else {
        generateToast({
          type: ToastType.ERROR,
          content: ENTER_VALID_COUPON_CODE_TO_CONTINUE,
        });
      }
    } else {
      onSuccess();
    }
  };
  useEffect(() => {
    discountCode && validateDiscountCode();
  }, []);
  return (
    <ButtonLayout
      buttonComponent={
        <section
          css={[styles.buttonContainer, mixins.flexAlignCenterJustifiedBetween]}
        >
          <SecondaryButton addStyles={styles.cancelbutton} onClick={onCancel}>
            CANCEL
          </SecondaryButton>
          <PrimaryButton
            addStyles={styles.logoutButton}
            onClick={handleContinueButton}
          >
            Continue
          </PrimaryButton>
        </section>
      }
    >
      <div css={styles.nftDetailsContainer}>
        <AssetCard
          enableQuantityUpdate
          qty={String(nft.quantity)}
          enableRedirect={false}
          hideStatus
          maxQuantity={nft.max_quantity}
          minQauntity={1}
          onQuantityUpdate={(quan) => onNFTQuantityUpdate(quan)}
          image={nft.image}
          mediaType={nft.media_type}
          title={nft.name}
          transactionAmountDetail={`~₹${nft.price}`}
        />
      </div>
      <div css={styles.divider} />
      <span css={styles.subtitle}>Add ons</span>
      <Swiper
        slidesPerView={`auto`}
        spaceBetween={20}
        keyboard={true}
        direction="horizontal"
        mousewheel={true}
        css={styles.swiperWrapper}
        cssMode={true}
      >
        {addOns?.length > 0 &&
          addOns.map((data, index) => (
            <SwiperSlide key={index} style={{ width: 225 }}>
              <CardNfts
                hightDesc={true}
                image={data.image}
                mediaType={data.media_type}
                onClick={NOOB}
                name={data.name}
                marketplace
                price={`${data.skywallet_accepted_price}`}
                quantity={data.quantity}
                maxQuantity={data.max_quantity}
                onQuantityUpdate={(quan) => {
                  const newAddons = [...addOns];
                  newAddons[index].quantity = quan;
                  onAddOnsUpdate(newAddons);
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {isListingLocked && (
        <div css={styles.discountCodeWrapper}>
          <ButtonLabelledRowInput
            label="Coupon Code"
            labelIconName="Coupon code"
            type={Constants.InputType.text}
            placeholder="Coupon Code"
            name="discountCode"
            value={discountCode}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDiscountCode(e.target.value)
            }
            buttonText={`Apply`}
            buttonClickHandler={validateDiscountCode}
            description={description}
            errors={errors}
          />
        </div>
      )}
    </ButtonLayout>
  );
};

export default PurchaseAddOn;
