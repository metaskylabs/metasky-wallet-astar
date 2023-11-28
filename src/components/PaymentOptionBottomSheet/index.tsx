import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import LabelledRadioButton from '@components/LabelledRadioButton';
import { BottomSheet, PrimaryButton } from '@components/Shared';
import { PaymentOption } from '@constants/payment';
import { mixins, typography } from '@styles/shared';
import { useEffect, useState } from 'react';
import * as styles from './styles';

export default function PaymentOptionBottomSheet(props: {
  paymentOptions: { option: PaymentOption; displayName: string }[];
  onSuccess: (paymentOption: PaymentOption) => void;
  open: boolean;
  onClose: () => void;
}) {
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(
    PaymentOption.FIAT,
  );

  useEffect(() => {
    if (props.paymentOptions.length > 0)
      setPaymentOption(props.paymentOptions[0].option);
  }, [props.paymentOptions]);

  return (
    <BottomSheet
      isOpen={props.open}
      onClose={props.onClose}
      addStyles={styles.bottomSheet}
    >
      <div css={styles.bottomSheetBody}>
        <div css={[typography.T_20_Bold]}>Select Payment Method</div>
        <div css={styles.paymentList}>
          {props.paymentOptions.map((option, index) => (
            <LabelledRadioButton
              key={index}
              checked={paymentOption === option.option}
              id={option.option}
              onChange={() => setPaymentOption(option.option)}
              name={option.option}
            >
              <h4 css={styles.paymentMethodTitle}>{option.displayName}</h4>
            </LabelledRadioButton>
          ))}
        </div>
      </div>
      <section css={styles.buttonContainer}>
        <PrimaryButton
          addStyles={styles.ctaButton}
          onClick={() => props.onSuccess(paymentOption)}
        >
          CONTINUE
        </PrimaryButton>
      </section>
    </BottomSheet>
  );
}
