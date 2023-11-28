import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import { PrimaryButton, SecondaryButton } from '@components/Shared';
import TransactionDetails from '@components/Transaction/TransactionDetails';
import { mixins, utils } from '@styles/shared';
import OfferDetails from '../OfferDetails';
import { NFTOfferList } from '@typings/api/makeOffer';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import {
  acceptOffer,
  deleteOffer,
  getOfferDetails,
  getPreviewOffer,
  rejectOffer,
} from '@actions/makeOffer';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useRouter } from 'next/router';
import { OfferFilter } from '@utils/constants';
import AcceptOffer from '../AcceptOffer';
import DeleteOrRejectOffer from '../DeleteOrRejectOffer';
import AssetsImg from '@public/images';
import { useSelector } from 'react-redux';
import { StatusState, StoreState } from '@reducers';
import { State as MakeOfferState } from '@reducers/makeOffer';
import RechargeOffer from '../Recharge';
import { dateTimeFormat, limitDecimal, textTruncate } from '@utils/helper';
import { trackClick, trackScreen, trackSwipe } from '@utils/analytics';
import { CLICK, click, EVENT_PAGE, screen, swipe } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { FetchingState } from '@constants/redux';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { useAnalytics } from '@utils/useAnalytics';

interface ViewOfferProps {
  onClose: () => void;
  offerId: string;
  offerDetails?: NFTOfferList;
  setPaymentStatus: (b: boolean) => void;
  fetchOfferList?: () => void;
}

enum COMPONENT_TYPE {
  ACCEPT,
  REJECT,
  DELETE,
  RECHARGE,
  DEFAULT,
}

const ViewOffer: FC<ViewOfferProps> = ({
  onClose,
  offerId,
  setPaymentStatus,
  fetchOfferList,
}) => {
  const router = useRouter();
  const { previewOffer } = useSelector<StoreState, MakeOfferState>(
    (state) => state.makeOffer,
  );
  const { offerDetails } = useSelector<StoreState, MakeOfferState>(
    (state) => state.makeOffer,
  );
  const { offerDetailStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const { preivewOfferStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const [componentType, setComponentType] = useState<COMPONENT_TYPE>(
    COMPONENT_TYPE.DEFAULT,
  );

  const [isFailed, setIsFailure] = useState<boolean>(false);
  const [currentNearValue, setCurrentPriceNearValue] = useState(0);
  const [orderId, setOrderID] = useState<string>(``);
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  const fetchOfferDetails = async () => {
    try {
      await getOfferDetails(offerId);
      trackPage(EVENT_PAGE.VIEW_OFFER);
    } catch (error) {
      handleErrorMessage(error);
      onClose();
    }
  };

  useEffect(() => {
    fetchOfferDetails();
  }, []);

  useEffect(() => {
    if (offerDetails?.conversion_factor.conversion_factor) {
      const near =
        parseFloat(offerDetails?.current_price) /
        offerDetails?.conversion_factor.conversion_factor;
      setCurrentPriceNearValue(near);
    }
  }, [offerDetails?.current_price]);

  const onDeleteOffer = async () => {
    try {
      // trackClick(click.deleteOffer, {
      //   acceptOffer_id: offerDetails?.auction_uuid,
      // });
      const response = await deleteOffer(`${offerDetails?.auction_uuid}`);
      if (response) {
        onClose();
        generateToast({
          type: ToastType.SUCCESS,
          content: `Your offer was deleted.`,
        });
      }
      fetchOfferList && fetchOfferList();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const onRejectOffer = async () => {
    try {
      // trackClick(click.rejectOffer, {
      //   acceptOffer_id: offerDetails?.auction_uuid,
      // });
      const response = await rejectOffer(`${offerDetails?.auction_uuid}`);
      if (response) {
        onClose();
        generateToast({
          type: ToastType.SUCCESS,
          content: `Offer has been rejected`,
        });
      }
      fetchOfferList && fetchOfferList();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const onAcceptOffer = async () => {
    try {
      const response = await acceptOffer(`${offerDetails?.auction_uuid}`);
      if (response) {
        if (previewOffer?.recharge.is_required) {
          setComponentType(COMPONENT_TYPE.RECHARGE);
          setOrderID(response.data.order_uuid);
        } else {
          setIsFailure(true);
          onClose();
          generateToast({
            type: ToastType.SUCCESS,
            content: `NFT listed for sale successfully`,
          });
        }
        fetchOfferList && fetchOfferList();
      }
    } catch (error) {
      handleErrorMessage(error);
      setIsFailure(true);
    }
  };

  const onPreviewOffer = async () => {
    try {
      await getPreviewOffer(`${offerDetails?.auction_uuid}`);
      setComponentType(COMPONENT_TYPE.ACCEPT);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const getBuyerInfo = () => {
    if (offerDetails?.is_buyer) {
      if (offerDetails?.owner?.email) {
        return offerDetails?.owner?.email;
      } else if (offerDetails?.owner?.ph_no) {
        return offerDetails?.owner?.ph_no;
      } else if (offerDetails?.owner?.name) {
        return offerDetails?.owner?.name;
      } else {
        return textTruncate(offerDetails?.owner?.user_uuid, 5, 5);
      }
    } else {
      if (offerDetails?.buyer?.email) {
        return offerDetails?.buyer?.email;
      } else if (offerDetails?.buyer?.name) {
        return offerDetails?.buyer?.name;
      } else if (offerDetails?.buyer?.ph_no) {
        return offerDetails?.buyer?.ph_no;
      } else {
        return textTruncate(offerDetails?.buyer?.user_uuid, 5, 5);
      }
    }
  };

  switch (componentType) {
    case COMPONENT_TYPE.ACCEPT:
      return (
        <AcceptOffer
          price={Number(offerDetails?.amount)}
          isFailed={isFailed}
          setIsFailure={setIsFailure}
          onSubmit={onAcceptOffer}
          onBack={() => setComponentType(COMPONENT_TYPE.DEFAULT)}
          onClose={onClose}
        />
      );

    case COMPONENT_TYPE.REJECT:
      return (
        <DeleteOrRejectOffer
          onSuccess={onRejectOffer}
          onCancel={onClose}
          price={Number(offerDetails?.amount)}
          collectionName={translate(`INFINITY_ACCESS_CARD`)}
          actionInfo={translate(`DELETE_OFFER_ACTION_INFO`)}
          actionIcon={AssetsImg.ic_failed.src}
          title={`${translate(`REJECT_OFFER`)}?`}
          buttonTitle={translate(`REJECT_STATE_SUCCESS`)}
          subtitle={translate(`REJECT_OFFER_SUBTITLE`)}
          componentType={`REJECT`}
          auction_uuid={offerDetails?.auction_uuid as string}
          amount={offerDetails?.amount as string}
          currency={offerDetails?.currency as string}
          nft_name={offerDetails?.nft_data.name as string}
        />
      );

    case COMPONENT_TYPE.DELETE:
      return (
        <DeleteOrRejectOffer
          onBack={() => setComponentType(COMPONENT_TYPE.DEFAULT)}
          onSuccess={onDeleteOffer}
          onCancel={onClose}
          price={Number(offerDetails?.amount)}
          collectionName={`Infinity Access Card.`}
          actionInfo={translate(`DELETE_OFFER_ACTION_INFO`)}
          actionIcon={AssetsImg.ic_trash.src}
          title={`${translate(`DELETE_OFFER`)}?`}
          buttonTitle={translate(`YES_DELETE`)}
          componentType={`DELETE`}
          auction_uuid={offerDetails?.auction_uuid as string}
          amount={offerDetails?.amount as string}
          currency={offerDetails?.currency as string}
          nft_name={offerDetails?.nft_data.name as string}
        />
      );

    case COMPONENT_TYPE.RECHARGE:
      return (
        <RechargeOffer
          onBack={() => setComponentType(COMPONENT_TYPE.ACCEPT)}
          price={Number(0)}
          onClose={onClose}
          orderID={orderId}
          setPaymentStatus={setPaymentStatus}
        />
      );

    default:
      return (
        <HeaderWithButtonLayout
          title={`View Offer`}
          onClose={() => {
            trackClick(CLICK.CLOSE_VIEW_OFFER);
            onClose();
          }}
          ctaContent={
            offerDetails?.status === OfferFilter.REJECTED ? (
              <div css={[styles.rejectedOfferContainer]}>
                <p>
                  {translate(`OFFER_WAS_REJECTED_ON`)}
                  {` `}
                  {dateTimeFormat(offerDetails?.created_at)}
                </p>
              </div>
            ) : offerDetails?.status === OfferFilter.ACCEPTED ? (
              <div css={[styles.rejectedOfferContainer]}>
                <p>
                  {translate(`OFFER_WAS_ACCEPTED_ON`)}
                  {` `}
                  {dateTimeFormat(offerDetails?.created_at)}
                </p>
              </div>
            ) : offerDetails?.status === OfferFilter.DELETED ? (
              <div css={[styles.rejectedOfferContainer]}>
                <p>
                  {translate(`OFFER_WAS_DELETED_ON`)}
                  {` `}
                  {dateTimeFormat(offerDetails?.created_at)}
                </p>
              </div>
            ) : offerDetails?.status === OfferFilter.PENDING ? (
              <div css={[styles.rejectedOfferContainer]}>
                <p>{translate(`YOUR_ACTION_IS_IN_PROGRESS`)}</p>
              </div>
            ) : offerDetails?.is_buyer ? (
              <div css={[utils.ml(16), utils.mr(16), utils.mb(26)]}>
                <SecondaryButton
                  disabled={offerDetails.status === OfferFilter.PENDING}
                  onClick={() => {
                    trackClick(CLICK.DELETE_VIEW_OFFER, {
                      auction_uuid: offerDetails?.auction_uuid,
                      amount: offerDetails?.amount,
                      currency: offerDetails?.currency,
                    });
                    setComponentType(COMPONENT_TYPE.DELETE);
                  }}
                >
                  {translate(`DELETE_OFFER`)}
                </SecondaryButton>
              </div>
            ) : offerDetails?.is_owner ? (
              <div css={[mixins.flexAlignCenter, utils.widthPercent(100)]}>
                <SecondaryButton
                  addStyles={styles.rejectButton}
                  onClick={() => {
                    trackClick(CLICK.REJECT_VIEW_OFFER, {
                      auction_uuid: offerDetails?.auction_uuid,
                      amount: offerDetails?.amount,
                      currency: offerDetails?.currency,
                    });
                    setComponentType(COMPONENT_TYPE.REJECT);
                  }}
                  disabled={offerDetails.status === OfferFilter.PENDING}
                >
                  {translate(`REJECT`)}
                </SecondaryButton>
                <PrimaryButton
                  addStyles={styles.acceptbutton}
                  onClick={() => {
                    trackClick(CLICK.ACCEPT_VIEW_OFFER, {
                      auction_uuid: offerDetails?.auction_uuid,
                      amount: offerDetails?.amount,
                      currency: offerDetails?.currency,
                    });
                    onPreviewOffer();
                  }}
                  disabled={offerDetails.status === OfferFilter.PENDING}
                  isLoading={preivewOfferStatus === FetchingState.PENDING}
                >
                  {translate(`ACCEPT`)}
                </PrimaryButton>
              </div>
            ) : null
          }
        >
          <section>
            <article css={[styles.nftCardDetailsContainer, mixins.flex]}>
              {offerDetailStatus === FetchingState.PENDING ? (
                <ShimmerCard height={120} borderRadius={4} />
              ) : (
                <TransactionDetails
                  image={offerDetails?.nft_data.image}
                  title={offerDetails?.nft_data.name}
                  hideStatus
                  mediaType={offerDetails?.nft_data.media_type}
                  currentPrice={`${offerDetails?.current_price} (${limitDecimal(
                    currentNearValue.toString(),
                    5,
                  )} ${offerDetails?.conversion_factor.symbol})`}
                  offerNFTPrice={offerDetails?.current_price}
                  offerNftRedirect={true}
                  nftRedirect={offerDetails?.nft_uuid}
                />
              )}
            </article>
            <article>
              {offerDetailStatus === FetchingState.PENDING ? (
                <div css={styles.shimmerCard}>
                  <ShimmerCard height={284} borderRadius={4} />
                </div>
              ) : (
                <OfferDetails
                  from={getBuyerInfo()}
                  isBuyer={offerDetails?.is_buyer}
                  date={offerDetails?.created_at}
                  amount={offerDetails?.amount}
                  nearRate={offerDetails?.conversion_factor.conversion_factor}
                  status={offerDetails?.status}
                />
              )}
            </article>
          </section>
        </HeaderWithButtonLayout>
      );
  }
};

export default ViewOffer;
