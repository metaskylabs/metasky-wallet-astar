import CountdownTimer from '@components/Auction/CountdownTimer';
import AssetsImg from '@public/images';
import { AccessBenefit, WalletBenefitsResponse } from '@typings/api/wallet';
import { getTimeDifferenceFromNow, isTimeRemaining } from '@utils/Time';
import moment from 'moment';
import * as styles from './styles';
import React, { useState } from 'react';
import NOOB from '@constants/noob';
import { useTranslate } from '@utils/useTranslate';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import { getBenefitAccessInfo } from '@actions/wallet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import useLinkHandler from '@utils/hooks/useLinkHandler';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import { BottomPopup, FullScreenKiteLoader } from '@components/Shared';
import { useUserSession } from '@utils/hooks/useUserSession';
import ClaimBenefit from '@components/Benefits/Claim';

enum SheetType {
  BENEFIT_ERROR,
}

export default function BenefitCardEnhanced(props: {
  benefits: WalletBenefitsResponse;
  onAccess?: () => void;
  onClick?: () => void;
  notAuthorized?: () => void;
  nftId?: string;
  hideActions?: boolean;
}) {
  const { translate } = useTranslate();
  const session = useUserSession();
  const { linkHandler } = useLinkHandler();
  const [isKiteLoader, setIsKiteLoader] = useState<boolean>(false);
  const [currentBottomSheet, setCurrentBottomSheet] = useState<{
    size?: BottomPopupSize;
    isOpen: boolean;
    component?: SheetType;
    onClose?: () => void;
  }>({ isOpen: false });
  const [claimBenefitOpen, setClaimBenefitOpen] = useState<boolean>(false);
  const [accessBenefitResponse, setAccessBenefitResponse] =
    useState<AccessBenefit>();
  const [benefitError, setBenefitError] = useState<{
    open: boolean;
    title: string;
    description: string;
    img?: string;
    hasAction?: boolean;
    actionButtonText?: string;
    actionUrl?: string;
  }>({ open: false, title: ``, description: `` });
  const allowAccess = !Boolean(props.benefits.unClickable);

  const onAccessBenefit = (benefitId: string) => {
    if (!session.isLoggedIn) {
      props.notAuthorized && props.notAuthorized();
      return;
    }
    setIsKiteLoader(true);
    getBenefitAccessInfo(benefitId, props.nftId)
      .then(async (response) => {
        if (response.data.ctaLink) {
          await linkHandler(
            response?.data?.type,
            response?.data?.ctaLink,
            response?.data?.ctaTarget,
            response?.data?.ctaLinkAs,
          );
        } else {
          setClaimBenefitOpen(true);
          setAccessBenefitResponse(response.data);
        }
        setIsKiteLoader(false);
      })
      .catch((err) => {
        setIsKiteLoader(false);
        if (err?.response?.data?.toastContext?.show_toast === false) {
          setBenefitError({
            open: true,
            img: err?.response?.data?.toastContext?.toast_image,
            title: err?.response?.data?.toastContext?.toast_message,
            description: err?.response?.data?.toastContext?.toast_description,
            hasAction: err?.response?.data?.toastContext?.has_action,
            actionButtonText:
              err?.response?.data?.toastContext?.action_button_text,
            actionUrl: err?.response?.data?.toastContext?.navigate_to,
          });
          setCurrentBottomSheet({
            component: SheetType.BENEFIT_ERROR,
            isOpen: true,
            size: BottomPopupSize.MEDIUM,
            onClose: () => setCurrentBottomSheet({ isOpen: false }),
          });
        } else {
          handleErrorMessage(err);
        }
      });
  };

  const renderSheet = () => {
    switch (currentBottomSheet.component) {
      case SheetType.BENEFIT_ERROR:
        return (
          <ErrorBottomSheet
            img={benefitError.img}
            title={benefitError.title}
            description={benefitError.description}
            hasAction={benefitError.hasAction}
            buttonText={benefitError.actionButtonText}
            onActionClick={() => {
              if (benefitError.actionUrl) {
                linkHandler(``, benefitError.actionUrl);
              }
            }}
          />
        );
    }
  };

  return (
    <div css={styles.benefitContainer}>
      <div css={styles.benefitInfoContainer} onClick={props.onClick}>
        <div css={styles.rightCut} />
        <div css={styles.leftCut} />
        <img src={props.benefits.image} css={styles.benefitImg} />
        <div>
          <div css={styles.benefitName}>{props.benefits.name}</div>
          <div
            css={styles.benefitDescription}
            dangerouslySetInnerHTML={{
              __html: props.benefits.description,
            }}
          ></div>
          {!props.hideActions && props.benefits?.endTime && (
            <div css={styles.benefitExpiry}>
              <img src={AssetsImg.ic_yellow_info.src} />
              {new Date(props.benefits?.endTime).getTime() <
              new Date().getTime()
                ? translate(`EXPIRED`)
                : translate(`EXPIRES`)}
              {` ${moment(props.benefits?.endTime).fromNow()}`}
            </div>
          )}
        </div>
      </div>
      {(!props.hideActions && props.benefits?.ctaButton) ||
      (props.benefits?.startTime &&
        isTimeRemaining(
          new Date(props.benefits?.startTime).getTime().toString(),
        )) ? (
        <div css={styles.benefitActionContainer}>
          {props.benefits?.startTime &&
            isTimeRemaining(
              new Date(props.benefits?.startTime).getTime().toString(),
            ) && (
              <CountdownTimer
                addedStyles={styles.timerContainer}
                onTimerFinish={NOOB}
                remainingTimeInSecond={getTimeDifferenceFromNow(
                  new Date(props.benefits?.startTime).getTime(),
                )}
              />
            )}
          {props.benefits?.ctaButton ? (
            <div
              css={
                !allowAccess ? styles.disabledActionButton : styles.actionButton
              }
              onClick={
                !allowAccess
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAccessBenefit(props.benefits.id);
                    }
              }
            >
              {props.benefits?.ctaButton}
              &nbsp;
              {!allowAccess ? (
                <img src={AssetsImg.i_lock.src} width={20} />
              ) : (
                <img src={AssetsImg.ic_blue_follow.src} />
              )}
            </div>
          ) : null}
        </div>
      ) : null}
      <BottomPopup
        isOpen={currentBottomSheet.isOpen}
        size={currentBottomSheet.size}
        onClose={currentBottomSheet.onClose}
      >
        {renderSheet()}
      </BottomPopup>
      {claimBenefitOpen && accessBenefitResponse && (
        <ClaimBenefit
          image={props.benefits.image}
          onClose={() => setClaimBenefitOpen(false)}
          benefitDetails={accessBenefitResponse}
        />
      )}
      <FullScreenKiteLoader isOpen={isKiteLoader}>
        <div css={styles.loaderContentInfo}>{translate(`PAGE_LOADING`)}...</div>
      </FullScreenKiteLoader>
    </div>
  );
}
