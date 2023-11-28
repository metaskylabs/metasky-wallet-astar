import { getOfferDetails } from '@actions/makeOffer';
import ViewOffer from '@components/MakeOffer/ViewOffer';
import PrivateRoute from '@components/PrivateRoute';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { Pages } from '@utils/navigation';
import { StatusType } from '@typings/api/shared';
import { FullScreenKiteLoader } from '@components/Shared';
import { colors } from '@styles/shared';
import { FetchingState } from '@constants/redux';
import { StatusState, StoreState } from '@reducers';
import { trackScreen } from '@utils/analytics';
import { screen } from '@constants/analytics';

export default function ViewMyOffer() {
  const router = useRouter();
  const { query } = router;

  const { offerDetails } = useSelector<StoreState, MakeOfferState>(
    (state) => state.makeOffer,
  );
  const { offerDetailStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const [offerStatus, setOfferStatus] = useState<{ status?: StatusType }>();
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);

  const fetchOfferDetails = async () => {
    try {
      setOfferStatus({ status: StatusType.LOADING });
      if (query.id) {
        trackScreen(screen.offerDetail, {
          offer_id: query.id,
        });
        await getOfferDetails(query.id as string);
        setOfferStatus({ status: StatusType.SUCCESS });
      }
    } catch (error) {
      setOfferStatus({ status: StatusType.ERROR });
      handleErrorMessage(error);
      router.push(Pages.PAGE_NOT_FOUND);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchOfferDetails();
    }
  }, [router.isReady, paymentStatus]);

  if (
    offerStatus?.status === StatusType.LOADING &&
    offerDetailStatus === FetchingState.PENDING
  ) {
    return (
      <FullScreenKiteLoader isOpen={offerStatus?.status === StatusType.LOADING}>
        <div
          css={[
            {
              textAlign: `center`,
              color: colors.Secondary_Black_Text,
            },
          ]}
        >
          Page is Loading. Please wait...
        </div>
      </FullScreenKiteLoader>
    );
  } else if (
    offerStatus?.status === StatusType.SUCCESS &&
    offerDetailStatus === FetchingState.SUCCESS
  ) {
    return (
      <PrivateRoute>
        {/*<ViewOffer*/}
        {/*  onBack={() => router.back()}*/}
        {/*  offerDetails={offerDetails}*/}
        {/*  setPaymentStatus={setPaymentStatus}*/}
        {/*/>*/}
      </PrivateRoute>
    );
  } else {
    return null;
  }
}
