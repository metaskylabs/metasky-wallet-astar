import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import { mixins, utils } from '@styles/shared';
import React, { FC } from 'react';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';

interface MakePaymentProps {
  onBack: () => void;
  onContinue: () => void;
}

const MakePayment: FC<MakePaymentProps> = ({ onBack, onContinue }) => {
  const { translate } = useTranslate();
  return (
    <ButtonLayout
      buttonComponent={
        <div css={[styles.buttonContainer]}>
          <PrimaryButton
            addStyles={utils.widthPercent(100)}
            onClick={onContinue}
          >
            {translate(`CONTINUE`)}
          </PrimaryButton>
        </div>
      }
      addStyles={utils.widthPercent(100)}
    >
      <article onClick={onBack} css={styles.close}>
        <img src={AssetsImg.ic_close.src} alt="" />
      </article>
      <article
        css={[
          styles.container,
          mixins.flexColumn,
          mixins.flexAlignJustifiedCenter,
        ]}
      >
        <div css={[styles.walletIcon, mixins.flexAlignJustifiedCenter]}>
          <img src={AssetsImg.ic_wallet.src} alt="" width="82" height="81" />
        </div>
        <p css={styles.paymentDescription}>
          {translate(`CLICK_BELOW_FOR_PAYMENT`)}
        </p>
      </article>
    </ButtonLayout>
  );
};

export default MakePayment;
