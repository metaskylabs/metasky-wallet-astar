import React, { FC, useEffect, useState } from 'react';
import {
  BottomPopup,
  PrimaryButton,
  SecondaryButton,
} from '@components/Shared';
import { typography, utils } from '@styles/shared';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { State as userProfileState } from '@reducers/user';
import { createOrUpdateToken, getToken } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { Country_Code, Country_Name } from '@constants/countryCode';
import { Languages } from '@constants/languages';
import {
  getUserPreferences,
  updateUserPreference,
} from '@actions/userPreference';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useTranslate } from '@utils/useTranslate';
import { CURRENCY_SYMBOL_UNICODE } from '@constants/currency';
import { useSelector } from 'react-redux';
import { StatusState, StoreState } from '@reducers';
import { FetchingState } from '@constants/redux';
import { useRouter } from 'next/router';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';

const DEFAULT_LANGUAGE = Languages.ENGLISH;

const ConfirmPreferenceChange: FC = () => {
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const router = useRouter();
  const { translate } = useTranslate();
  const [fetchedPreference, setFetchedPreference] = useState<{
    language: Languages;
    currency: keyof typeof CURRENCY_SYMBOL_UNICODE;
    region: Country_Code;
  }>();
  const [showBottomsheet, setShowBottomSheet] = useState<boolean>(false);
  const { profileStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const bottomSheetHandler = (
    fetchedLanguage: Languages,
    fetchedCurrency: keyof typeof CURRENCY_SYMBOL_UNICODE,
    region: Country_Code,
  ) => {
    if (fetchedLanguage !== DEFAULT_LANGUAGE) {
      const oldLanguage = getToken(LocalStorageVariables.PREFERRED_LANGUAGE);
      if (oldLanguage && oldLanguage === fetchedLanguage) {
      } else {
        setShowBottomSheet(true);
      }
    } else {
      createOrUpdateToken(
        LocalStorageVariables.PREFERRED_LANGUAGE,
        fetchedLanguage,
      );
      createOrUpdateToken(
        LocalStorageVariables.PREFERRED_CURRENCY,
        fetchedCurrency,
      );
      createOrUpdateToken(LocalStorageVariables.USER_REGION, region);
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await getUserPreferences();
      setFetchedPreference({
        language: response.data.user_preferences.preferred_language,
        currency: response.data.user_preferences.preferred_currency,
        region: response.data.user_preferences.region,
      });
      bottomSheetHandler(
        response.data.user_preferences.preferred_language,
        response.data.user_preferences.preferred_currency,
        response.data.user_preferences.region,
      );
    } catch (e) {}
  };

  const updatePreference = async (revert = false) => {
    try {
      if (user.isLogin) {
        const payload = {
          countryCode: revert
            ? Country_Code.GLOBAL
            : (fetchedPreference?.region as Country_Code),
        };
        const response = await updateUserPreference(payload);
        createOrUpdateToken(
          LocalStorageVariables.PREFERRED_LANGUAGE,
          response.data.user_preferences.preferred_language,
        );
        createOrUpdateToken(
          LocalStorageVariables.PREFERRED_CURRENCY,
          response.data.user_preferences.preferred_currency,
        );
        createOrUpdateToken(
          LocalStorageVariables.USER_REGION,
          response.data.user_preferences.region,
        );
        revert && location.reload();
      } else {
        createOrUpdateToken(
          LocalStorageVariables.PREFERRED_LANGUAGE,
          revert
            ? Languages.ENGLISH
            : (fetchedPreference?.language as Languages),
        );
        createOrUpdateToken(
          LocalStorageVariables.PREFERRED_CURRENCY,
          revert
            ? `USD`
            : (fetchedPreference?.currency as keyof typeof CURRENCY_SYMBOL_UNICODE),
        );
        createOrUpdateToken(
          LocalStorageVariables.USER_REGION,
          revert
            ? Country_Code.GLOBAL
            : (fetchedPreference?.region as Country_Code),
        );
      }

      generateToast({
        type: ToastType.SUCCESS,
        content: translate(`LANGUAGE_CHANGED`),
      });
      setShowBottomSheet(false);
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  useEffect(() => {
    const clientId =
      router.query.client_id || getToken(LocalStorageVariables.METACLIENTID);
    if (clientId === `tanuki`) {
      if (profileStatus === FetchingState.FAIL) {
        const isPrefSet = getToken(LocalStorageVariables.PREFERRED_LANGUAGE);
        !isPrefSet && fetchUserPreferences();
      } else if (profileStatus === FetchingState.SUCCESS) {
        if (user && user.isLogin && user.profile) {
          setFetchedPreference({
            language: user.profile.user_preferences.preferred_language,
            currency: user.profile.user_preferences.preferred_currency,
            region: user.profile.user_preferences.region,
          });
          const isPrefSet = getToken(LocalStorageVariables.PREFERRED_LANGUAGE);
          if (isPrefSet) {
            createOrUpdateToken(
              LocalStorageVariables.PREFERRED_LANGUAGE,
              user.profile.user_preferences.preferred_language,
            );
            createOrUpdateToken(
              LocalStorageVariables.PREFERRED_CURRENCY,
              user.profile.user_preferences.preferred_currency,
            );
            createOrUpdateToken(
              LocalStorageVariables.USER_REGION,
              user.profile.user_preferences.region,
            );
          } else {
            bottomSheetHandler(
              user.profile.user_preferences.preferred_language,
              user.profile.user_preferences.preferred_currency,
              user.profile.user_preferences.region,
            );
          }
        }
      }
    }
  }, [profileStatus, user]);

  return (
    <BottomPopup isOpen={showBottomsheet}>
      <HeaderWithButtonLayout
        ctaContent={
          <div css={styles.buttonWrapper}>
            <SecondaryButton onClick={() => updatePreference(true)}>
              RESTORE
            </SecondaryButton>
            <PrimaryButton
              onClick={() => updatePreference(false)}
              addStyles={utils.widthPercent(50)}
            >
              CONTINUE
            </PrimaryButton>
          </div>
        }
        onClose={() => setShowBottomSheet(false)}
      >
        <div css={utils.pb(90)}>
          <div css={styles.contentWrapper}>
            <div css={styles.imageContainer}>
              <img src={AssetsImg.ic_location.src} />
            </div>
            <div css={styles.infoContainer}>
              <div css={typography.T_20_Bold}>Language & Currency Updated</div>
              <div css={utils.mt(12)}>
                We detected you are browsing from {` `}
                <span css={typography.T_16_Bold}>
                  {
                    Country_Name[
                      fetchedPreference?.region as keyof typeof Country_Name
                    ]
                  }
                </span>
                {` `}
                and we have updated your language and currency accordingly.
              </div>
              <div css={utils.mt(16)}>
                Do you want to continue or revert to default language?
              </div>
            </div>
          </div>
        </div>
      </HeaderWithButtonLayout>
    </BottomPopup>
  );
};

export default ConfirmPreferenceChange;
