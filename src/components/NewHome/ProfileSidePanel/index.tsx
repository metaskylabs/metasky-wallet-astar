import React, { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import {
  State as userProfileState,
  State as profileState,
} from '@reducers/user';
import { getToken } from '@utils/helper';
import { PROFILE_SETTINGS } from '@constants/profile';
import { CLICK, screen } from '@constants/analytics';
import { Pages } from '@utils/navigation';
import { getUserProfile } from '@actions/user';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { BottomFadeInAnimation, DividerLine } from '@components/Shared';
import Avatar from '@components/Profile/Avatar';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import Option from '@components/Profile/Option';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import { BottomSheetComponent } from '@pages/home';
import { LocalStorageVariables } from '@constants/authentication';
import { WalletType } from '@constants/wallet';
import { useAnalytics } from '@utils/useAnalytics';
import { useUserSession } from '@utils/hooks/useUserSession';

interface ProfileSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  handleBottomSheetCom: (
    sheetType: BottomSheetComponent,
    size: BottomPopupSize,
  ) => void;
}

const ProfileSidePanel: FC<ProfileSidePanelProps> = ({
  isOpen,
  onClose,
  handleBottomSheetCom,
}) => {
  const router = useRouter();
  const { profile } = useSelector<StoreState, profileState>(
    (state) => state.user,
  );
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const session = useUserSession();

  const [updatedProfileSetting, setUpdatedProfileSetting] =
    useState(PROFILE_SETTINGS);

  const unreadMessagesCount = useSelector<StoreState, number | null>(
    (state) => state.intercom?.unReadMessagesCount,
  );
  const [clientID, setClientID] = useState<string | boolean>(``);

  const { trackClick } = useAnalytics();

  useEffect(() => {
    setClientID(
      (router.query.client_id as string) ||
        getToken(LocalStorageVariables.METACLIENTID) ||
        ``,
    );
  }, [router.isReady]);

  useEffect(() => {
    if (!session.isLoggedIn) {
      router.push(Pages.LOGIN);
    }
  }, [session.isLoggedIn]);

  async function fetchProfile() {
    try {
      await getUserProfile();
    } catch (err) {
      handleErrorMessage(err);
    }
  }

  useEffect(() => {
    if (user.isLogin) {
      fetchProfile();
    }
  }, [user.isLogin]);

  const handleEditProfileRoute = () => {
    handleBottomSheetCom(
      BottomSheetComponent.EDIT_PROFILE,
      BottomPopupSize.BIG,
    );
  };

  const handleLinkClick = (option: string) => {
    switch (option) {
      case `Change PIN`:
        handleBottomSheetCom(
          BottomSheetComponent.CHANGE_PIN,
          BottomPopupSize.MEDIUM,
        );
        break;
      case `Customer Support`:
        handleBottomSheetCom(
          BottomSheetComponent.CUSTOMER_SUPPORT,
          BottomPopupSize.MEDIUM,
        );
        break;
      case `Refer & Earn`:
        handleBottomSheetCom(
          BottomSheetComponent.REFER_EARN,
          BottomPopupSize.BIG,
        );
        break;
      case `Language & Currency`:
        handleBottomSheetCom(
          BottomSheetComponent.LANGUAGE_AND_CURRENCY,
          BottomPopupSize.MEDIUM,
        );
        break;
      case `Rewards`:
        handleBottomSheetCom(BottomSheetComponent.REWARDS, BottomPopupSize.BIG);
        break;
      default:
        return ``;
    }
  };
  useEffect(() => {
    const profileSetting = updatedProfileSetting.filter((option) =>
      session.wallets?.includes(WalletType.SKYWALLET)
        ? option
        : option !== `Change PIN`,
    );
    setUpdatedProfileSetting(profileSetting);
  }, [profile]);

  return (
    <>
      {isOpen && <div css={styles.blurBg} onClick={onClose} />}
      <aside css={[styles.sideContainer, isOpen && styles.openSideContainer]}>
        <BottomFadeInAnimation addedStyle={styles.detailsContainer}>
          <div>
            <Avatar avatarLink={AssetsImg.i_profile.src} />
          </div>
          <div css={styles.details}>
            <div css={styles.detailsDark}>
              {profile && profile.name ? profile.name?.split(` `)[0] : `Guest`}
            </div>
            {profile?.email && (
              <div css={styles.detailsLight}>{profile?.email}</div>
            )}
            <div css={styles.detailsLight}>{profile?.contactNumber}</div>
          </div>
          {session.wallets?.includes(WalletType.SKYWALLET) && (
            <div
              css={styles.editIcon}
              onClick={() => {
                trackClick(CLICK.EDIT_PROFILE);
                handleEditProfileRoute();
              }}
            >
              <img
                src={AssetsImg.ic_edit.src}
                css={mixins.cursorPointer}
                alt="edit icon"
              />
            </div>
          )}
        </BottomFadeInAnimation>
        <DividerLine />

        {[
          ...updatedProfileSetting,
          ...(clientID === `tanuki` &&
          session.wallets?.includes(WalletType.SKYWALLET)
            ? [`Language & Currency`]
            : []),
        ].map((option, index) => (
          <BottomFadeInAnimation key={index} delay={index * 0.3}>
            <Option
              key={index}
              isBlueArrow
              index={index}
              text={option}
              font="bold"
              onClick={() => {
                trackClick(`${option} in User Profile Side Panel`);
                handleLinkClick(option);
              }}
              unreadMessagesCount={unreadMessagesCount}
            />
          </BottomFadeInAnimation>
        ))}
        <div css={styles.logOutContainer}>
          <DividerLine />
          <BottomFadeInAnimation addedStyle={styles.logOutContent}>
            <img src={AssetsImg.ic_logout.src} alt="logout icon" />
            <button
              css={styles.logOutText}
              onClick={() => {
                handleBottomSheetCom(
                  BottomSheetComponent.LOGOUT,
                  BottomPopupSize.MEDIUM,
                );
                trackClick(CLICK.LOGOUT);
              }}
            >
              Log Out
            </button>
          </BottomFadeInAnimation>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidePanel;
