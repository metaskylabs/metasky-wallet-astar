import React, { FC, useEffect } from 'react';
import { AirpayData } from '@typings/api/payment';
import { FullScreenKiteLoader } from '@components/Shared';

interface AirpayPaymentFormProps {
  airpayData: AirpayData;
  orderId: string;
}

const AirpayPaymentForm: FC<AirpayPaymentFormProps> = ({
  airpayData,
  orderId,
}) => {
  let formRef: HTMLFormElement | null;
  useEffect(() => {
    if (formRef) {
      formRef.submit();
    }
  }, []);

  return (
    <div>
      <FullScreenKiteLoader isOpen={true}>Loading ..</FullScreenKiteLoader>
      <form
        method="POST"
        action="https://payments.airpay.co.in/pay/index.php"
        id="popupForm"
        // target="_blank"
        ref={(ref) => {
          if (ref) {
            formRef = ref;
            // console.log(`Form re`, formRef);
          }
        }}
        onSubmit={(e) => {
          // e.preventDefault();
        }}
      >
        <input
          id="privatekey"
          type="hidden"
          name="privatekey"
          value={airpayData.privatekey}
        />
        <input
          id="mercid"
          type="hidden"
          name="mercid"
          value={Number(airpayData.mid)}
        />
        <input
          id="currency"
          type="hidden"
          name="currency"
          value={airpayData.airpayCurrency}
        />
        <input
          id="isocurrency"
          type="hidden"
          name="isocurrency"
          value={airpayData.isocurrency}
        />
        <input id="chmod" type="hidden" name="chmod" value={airpayData.chmod} />
        <input
          id="buyerEmail"
          type="hidden"
          name="buyerEmail"
          value={airpayData.user.email}
        />
        <input
          id="buyerPhone"
          type="hidden"
          name="buyerPhone"
          value={airpayData.user.phoneNumber}
        />
        <input
          id="buyerFirstName"
          type="hidden"
          name="buyerFirstName"
          value={airpayData.user.firstName}
        />
        <input
          id="buyerLastName"
          type="hidden"
          name="buyerLastName"
          value={airpayData.user.lastName}
        />
        <input id="orderid" type="hidden" name="orderid" value={orderId} />
        <input
          id="amount"
          type="hidden"
          name="amount"
          value={airpayData.amount}
        />
        <input
          id="checksum"
          type="hidden"
          name="checksum"
          value={airpayData.checksum}
        />
        <input
          id="arpyVer"
          type="hidden"
          name="arpyVer"
          value={airpayData.arpyVer}
        />

        <input id="buyerAddress" type="hidden" name="buyerAddress" value="" />
        <input id="buyerCity" type="hidden" name="buyerCity" value="" />
        <input id="buyerState" type="hidden" name="buyerState" value="" />
        <input id="buyerCountry" type="hidden" name="buyerCountry" value="" />
        <input id="buyerPinCode" type="hidden" name="buyerPinCode" value="" />
      </form>
    </div>
  );
};

export default AirpayPaymentForm;
