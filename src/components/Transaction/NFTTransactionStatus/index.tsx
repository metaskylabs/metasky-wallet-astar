import { FC, useState, Fragment, useEffect } from 'react';
import * as styles from './styles';
import { mixins, typography } from '@styles/shared';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import { Fees } from '@/typings/api/wallet';
import AssetsImg from '@public/images';
import { TransactionDetails as TransactionDetailsTypings } from '@typings/api/wallet';
import { transactionStatus } from '@constants/transaction';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { BottomPopup, MSecondaryLottie } from '@components/Shared';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { dateTimeFormat } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';
import { transactionsListTitle } from '../TransactionsList/styles';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import CustomerSupport from '@components/CustomerSupportBottomSheet';
interface TransactionStatusProps {
  icon: string;
  createdAt: string;
  status: TransactionDetailsTypings['status'];
  statusText: TransactionDetailsTypings['status_text'];
  sub_status: TransactionDetailsTypings['sub_status'];
}

const CopyComponent: FC<{
  actionText: string;
  actionPlaceholder: string;
  actionData: string;
}> = ({ actionText, actionPlaceholder, actionData }) => {
  const [openInfo, setOpenInfo] = useState(false);
  const { translate } = useTranslate();
  return (
    <>
      {openInfo && (
        <div
          css={[
            styles.transactionStatusDetailInfo,
            styles.transactionContentLineItem,
          ]}
        >
          {actionPlaceholder || actionData}
          {` `}
          <img
            css={styles.transactionInfoCopyIcon}
            src={AssetsImg.ic_copy_blue.src}
            onClick={() => {
              navigator.clipboard.writeText(actionData);
              generateToast({
                content: translate(`COPIED`),
                type: ToastType.SUCCESS,
              });
            }}
          />
        </div>
      )}
      <div
        css={[
          styles.transactionStatusDetailLink,
          styles.transactionContentLineItem,
        ]}
        onClick={() => setOpenInfo(!openInfo)}
      >
        {openInfo ? translate(`HIDE`) : actionText}
      </div>
    </>
  );
};

const URLComponent: FC<{ actionText: string; actionData: string }> = ({
  actionText,
  actionData,
}) => {
  return (
    <div
      css={
        actionData
          ? [
              styles.transactionStatusDetailLink,
              styles.transactionContentLineItem,
            ]
          : [styles.transactionContentLineItem]
      }
      onClick={() => {
        if (actionData) window.open(actionData, `_blank`);
      }}
    >
      {actionText}
    </div>
  );
};

const getStatusChipStyle = (status: Constants.TransactionStatus) => {
  if (
    [
      Constants.TransactionStatus.completed,
      Constants.TransactionStatus.received,
      Constants.TransactionStatus.sent,
    ].includes(status)
  )
    return styles.transactionStatusStateSuccess;
  if (
    [
      Constants.TransactionStatus.failed,
      Constants.TransactionStatus.expired,
    ].includes(status)
  )
    return styles.transactionStatusStateFailure;
  return styles.transactionStatusStatePending;
};

const getStatusLineStyle = (nextStatus: string) => {
  if (nextStatus === `COMPLETED`) return styles.transactionStatusSuccessLine;
  if (nextStatus === `FAILED`) return styles.transactionStatusFailureLine;
  return styles.transactionStatusPendingLine;
};

const getStatusIcon = (status: string) => {
  if (status === `COMPLETED`)
    return (
      <img
        css={styles.transactionStatusIconItem}
        src={AssetsImg.ic_greenTick.src}
        alt={`Success`}
      />
    );
  if (status === `FAILED`)
    return (
      <img
        css={styles.transactionStatusIconItem}
        src={AssetsImg.ic_redFailed.src}
        alt={`Failed`}
      />
    );
  if (status === `PENDING`)
    return (
      <img
        css={styles.transactionStatusIconItem}
        src={AssetsImg.ic_staticLoader.src}
        alt={`Pending`}
      />
    );
  return <MSecondaryLottie addStyles={styles.statusAnimationIcon} />;
  // return AssetsImg.ic_crossIconRed.src;
};

const TransactionStatus: FC<TransactionStatusProps> = ({
  icon,
  createdAt,
  status,
  statusText,
  sub_status,
}) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const [showSupport, setShowSupport] = useState(false);
  const hasPastTenMin =
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60) > 10;
  return (
    <div css={styles.transactionsStatusInfoTab}>
      <div
        css={[
          styles.transactionsStatusInfoTabTitle,
          mixins.flexAlignCenterJustifiedBetween,
        ]}
      >
        <div css={mixins.flexAlignCenter}>
          <div
            css={[styles.transactionsStatusTabImage, mixins.flexAlignCenter]}
          >
            <img src={icon} alt="info" />
          </div>
          <span css={styles.transactionsStatusInfoTitleContent}>
            {translate(`TRANSACTION_STATUS`)}
          </span>
        </div>
        <div css={[styles.transactionStatusState, getStatusChipStyle(status)]}>
          {statusText?.toLowerCase()}
        </div>
      </div>
      <div css={styles.transactionsStatusInfoTabContainer}>
        {sub_status.map((statusData, index) => (
          <div
            key={index.toString()}
            css={
              index === sub_status.length - 1
                ? [mixins.flexAlignStart]
                : [mixins.flex, styles.transactionStatusTimelineItem]
            }
          >
            <div css={[styles.transactionStatusTimelineDate]}>
              {dateTimeFormat(statusData.time)}
            </div>
            <div
              css={[
                styles.transactionStatusIconContainer,
                getStatusLineStyle(sub_status[index + 1]?.status),
              ]}
            >
              <div css={styles.transactionStatusIcon}>
                {getStatusIcon(
                  statusData.status === `PENDING`
                    ? sub_status[index - 1]?.status === `PENDING`
                      ? `PENDING`
                      : `RUNNING`
                    : statusData.status,
                )}
              </div>
            </div>
            <div css={styles.transactionStatusDetail}>
              <div css={styles.transactionStatusDetailHeading}>
                {statusData.title}
              </div>
              {(statusData.metadata || []).map((step, index) => {
                if (!step.action?.actionData)
                  return (
                    <div
                      css={styles.transactionStatusDetailInfo}
                      key={index.toString()}
                    >
                      {step.text}
                    </div>
                  );
                return step.action?.actionType === `COPY` ? (
                  <CopyComponent
                    key={index.toString()}
                    actionText={step.text}
                    actionData={step.action?.actionData}
                    actionPlaceholder={step.action?.actionPlaceHolder}
                  />
                ) : (
                  <URLComponent
                    key={index.toString()}
                    actionText={step.text}
                    actionData={step.action?.actionData}
                  />
                );
              })}
            </div>
          </div>
        ))}
        {(hasPastTenMin ||
          status === Constants.TransactionStatus.failed ||
          status === Constants.TransactionStatus.expired) && (
          <>
            <hr css={styles.divider} />
            <div css={[mixins.flexJustifiedCenter, typography.T_12_Semibold]}>
              <span>{translate(`SOMETHING_WENT_WRONG`)}</span>&nbsp;
              <span css={styles.support} onClick={() => setShowSupport(true)}>
                {translate(`CONTACT_SUPPORT`)}
              </span>
            </div>
          </>
        )}
        <BottomPopup
          isOpen={showSupport}
          size={BottomPopupSize.MEDIUM}
          onClose={() => setShowSupport(false)}
        >
          <CustomerSupport />
        </BottomPopup>
      </div>
    </div>
  );
};

export default TransactionStatus;
