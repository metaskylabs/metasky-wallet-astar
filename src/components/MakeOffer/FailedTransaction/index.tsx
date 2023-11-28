import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { BottomPopup, DividerLine, PrimaryButton } from '@components/Shared';
import { colors, mixins, utils } from '@styles/shared';
import React, { FC, useState } from 'react';
import * as styles from '../MakePayment/styles';
import AssetsImg from '@public/images';
import { onCopy } from '@utils/helper';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { useTranslate } from '@utils/useTranslate';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import CustomerSupport from '@components/CustomerSupportBottomSheet';
interface FailedTransactionInterface {
  onTryAgain: () => void;
  onBack: () => void;
  orderID: string;
}

const FailedTransaction: FC<FailedTransactionInterface> = ({
  onTryAgain,
  onBack,
  orderID,
}) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const [showSupport, setShowSupport] = useState(false);
  return (
    <ButtonLayout
      buttonComponent={
        <div css={[styles.buttonContainer]}>
          <PrimaryButton
            addStyles={utils.widthPercent(100)}
            onClick={onTryAgain}
          >
            {translate(`TRY_AGAIN`)}
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
        <div
          css={[
            mixins.flexAlignJustifiedCenter,
            utils.mb(64),
            utils.width(134),
            utils.height(134),
          ]}
        >
          <img
            src={AssetsImg.ic_failed.src}
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <h2 css={[styles.successTitle, utils.mb(15)]}>
          {translate(`TRANSACTION_FAILED`)}
        </h2>
        <p
          css={[
            styles.successDescription,
            utils.pl(30),
            utils.pr(30),
            utils.mb(24),
          ]}
        >
          {translate(`SOMETHING_WENT_WRONG_TRY_AGAIN`)}
        </p>
        <div css={styles.transactionStatusContainer}>
          <div
            css={[mixins.flexAlignJustifiedCenter, utils.mt(5), utils.mb(5)]}
          >
            <p css={[styles.regularText, utils.mr(6)]}>
              {`${translate(`TRANSACTION_ID`)}: ${orderID}`}
            </p>
            <div
              css={[mixins.flex, mixins.cursorPointer]}
              onClick={() => onCopy(`${orderID}`, translate(`Copied`))}
            >
              <img src={AssetsImg.ic_copy_blue.src} alt="" />
            </div>
          </div>
          <DividerLine addStyles={styles.divider} />
          <p css={styles.semiBoldText}>
            {`${translate(`SOMETHING_WENT_WRONG`)} `}
            <span
              onClick={() => setShowSupport(true)}
              css={[{ color: colors.Primary_Blue }]}
            >
              {translate(`CONTACT_SUPPORT`)}
            </span>
          </p>
        </div>
      </article>
      <BottomPopup
        isOpen={showSupport}
        size={BottomPopupSize.MEDIUM}
        onClose={() => setShowSupport(false)}
      >
        <CustomerSupport />
      </BottomPopup>
    </ButtonLayout>
  );
};

export default FailedTransaction;
