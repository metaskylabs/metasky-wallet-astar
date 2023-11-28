import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import { mixins, utils } from '@styles/shared';
import React, { FC } from 'react';
import * as styles from '../MakePayment/styles';
import * as checkAnimation from '@public/lottie/checkAnimation.json';
import * as whitelistedAnimation from '@public/lottie/whitelistedAnimation.json';
import Lottie from 'react-lottie';
import { useTranslate } from '@utils/useTranslate';

interface SuccessTransactionInterface {
  onContinue: () => void;
}

const SuccessTransaction: FC<SuccessTransactionInterface> = ({
  onContinue,
}) => {
  const { translate } = useTranslate();
  const checkOptions = {
    loop: false,
    autoplay: true,
    animationData: checkAnimation,
  };

  const WhitelisteOptions = {
    loop: false,
    autoplay: true,
    animationData: whitelistedAnimation,
  };

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
      <article
        css={[
          styles.container,
          mixins.flexColumn,
          mixins.flexAlignJustifiedCenter,
        ]}
      >
        <div
          css={[
            mixins.flexAlignJustifiedCenter,
            utils.mb(64),
            utils.width(134),
            utils.height(134),
            styles.success,
          ]}
        >
          <Lottie options={checkOptions} />
          <div css={styles.confetiAnimation}>
            <Lottie options={WhitelisteOptions} />
          </div>
        </div>
        <h2 css={[styles.successTitle, utils.mb(15)]}>
          {translate(`CONGRATULATIONS`)}
        </h2>
        <p css={styles.successDescription}>{translate(`RECHARGE_DONE`)}</p>
      </article>
    </ButtonLayout>
  );
};

export default SuccessTransaction;
