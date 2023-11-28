import AirpayPaymentForm from '@components/AirpayPaymentForm';
import { useRouter } from 'next/router';
import { AirpayData } from '@typings/api/payment';
import { Pages } from '@utils/navigation';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'preact';
import { FullScreenKiteLoader } from '@components/Shared';

export default function AirpayForm() {
  const router = useRouter();
  const { airpaydata, orderId } = router.query;
  const [airpayMetadata, setAirpayMetaData] = useState<AirpayData>();
  const [orderingId, setSrderingId] = useState<string>(``);

  useEffect(() => {
    if (router.isReady) {
      if (!airpaydata && !orderId) {
        router.push(Pages.PAGE_NOT_FOUND);
      } else {
        const airpayData: AirpayData = JSON.parse(airpaydata as string);
        setAirpayMetaData(airpayData);
        setSrderingId(orderId as string);
        console.log(airpayData);
      }
    }
  }, [router.isReady]);

  return (
    <Fragment>
      {airpayMetadata && orderingId ? (
        <AirpayPaymentForm airpayData={airpayMetadata} orderId={orderingId} />
      ) : (
        <FullScreenKiteLoader isOpen={true}>Loading ..</FullScreenKiteLoader>
      )}
    </Fragment>
  );
}
