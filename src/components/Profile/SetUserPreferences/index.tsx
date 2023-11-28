import React, { FC, useEffect, useState } from 'react';
import {
  getUserPreferences,
  updateUserPreference,
} from '@actions/userPreference';
import { Country_Code } from '@constants/countryCode';
import { DividerLine, PrimaryButton } from '@components/Shared';
import { useTranslate } from '@utils/useTranslate';
import { mixins, typography, utils } from '@styles/shared';
import * as styles from './styles';
import {
  buttonArrowIcon,
  buttonArrowOpen,
} from '@components/WalletBalanceSelect/styles';
import AssetsImg from '@public/images';
import { CountryData } from '@components/Profile/SetUserPreferences/constants';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { createOrUpdateToken, getToken, STORAGE } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { getBalanceSummary } from '@actions/profile';
import { getUserProfile } from '@actions/user';

interface SetUserPreferencesProps {
  onClose: () => void;
  isOpen: boolean;
}
const SetUserPreferences: FC<SetUserPreferencesProps> = ({
  onClose,
  isOpen,
}) => {
  const { translate } = useTranslate();
  const user = useSelector<StoreState, userProfileState>((state) => state.user);

  const [dropDown, setDropDown] = useState<boolean>(false);

  const [selectedCountry, setSelectedCountry] =
    useState<keyof typeof CountryData>(`GLOBAL`);

  const setRegion = (selectedPref: Country_Code) => {
    switch (selectedPref) {
      case Country_Code.JAPAN:
        setSelectedCountry(`JAPAN`);
        break;
      case Country_Code.US:
        setSelectedCountry(`GLOBAL`);
        break;
      case Country_Code.INDIA:
        setSelectedCountry(`INDIA`);
    }
  };
  useEffect(() => {
    const selectedPref = getToken(LocalStorageVariables.USER_REGION);
    selectedPref && setRegion(selectedPref as Country_Code);
  }, []);

  if (typeof window !== `undefined`) {
    window.addEventListener(STORAGE, () => {
      const region = getToken(LocalStorageVariables.USER_REGION);
      region && setRegion(region as Country_Code);
    });
  }

  const updatePreference = async (revert = false) => {
    try {
      let response;
      if (user.isLogin) {
        const payload = {
          countryCode: revert
            ? Country_Code.GLOBAL
            : CountryData[selectedCountry].code,
        };
        response = await updateUserPreference(payload);
      } else {
        response = await getUserPreferences(CountryData[selectedCountry].code);
      }
      getBalanceSummary();
      getUserProfile();
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
      generateToast({
        type: ToastType.SUCCESS,
        content: translate(`LANGUAGE_CHANGED`),
      });
      onClose();
      setDropDown(false);
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  return (
    <HeaderWithButtonLayout
      ctaContent={
        <div css={utils.ctaContainer}>
          <PrimaryButton
            onClick={() => updatePreference(false)}
            addStyles={utils.widthPercent(100)}
          >
            SAVE
          </PrimaryButton>
        </div>
      }
    >
      <div css={styles.wrapper}>
        <div>
          <span css={styles.mssg}>{translate(`PREFERRED_LANGUAGE_MSG`)}</span>
          <div css={styles.countrySelector}>
            <div css={styles.selectorWrapper}>
              <span css={styles.subText}>{translate(`COUNTRY`)}</span>
              <div
                onClick={() => setDropDown(!dropDown)}
                css={[
                  styles.selectedContainer,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                <div css={styles.countryItem}>
                  <span>
                    <img src={CountryData[selectedCountry].icon} />
                  </span>
                  <span>{CountryData[selectedCountry].name}</span>
                </div>

                <img
                  src={AssetsImg.ic_arrowDown.src}
                  alt="arrow"
                  css={[
                    utils.ml(4),
                    utils.mr(4),
                    dropDown && buttonArrowOpen,
                    buttonArrowIcon,
                  ]}
                />
              </div>
            </div>

            {dropDown && (
              <div css={styles.optionContainer}>
                <div
                  key={`As`}
                  css={styles.optionItem}
                  onClick={() => {
                    setSelectedCountry(`INDIA`);
                    setDropDown(false);
                  }}
                >
                  <div css={styles.countryItem}>
                    <span>
                      <img src={CountryData.INDIA.icon} />
                    </span>
                    <span>{CountryData.INDIA.name}</span>
                  </div>
                </div>

                <div>
                  <DividerLine addStyles={utils.margin(0)} />
                </div>

                <div
                  key={`Ass`}
                  css={styles.optionItem}
                  onClick={() => {
                    setSelectedCountry(`JAPAN`);
                    setDropDown(false);
                  }}
                >
                  <div css={styles.countryItem}>
                    <span>
                      <img src={CountryData.JAPAN.icon} />
                    </span>
                    <span>{CountryData.JAPAN.name}</span>
                  </div>
                </div>

                <div>
                  <DividerLine addStyles={utils.margin(0)} />
                </div>

                <div
                  key={`Aas`}
                  css={styles.optionItem}
                  onClick={() => {
                    setSelectedCountry(`GLOBAL`);
                    setDropDown(false);
                  }}
                >
                  <div css={styles.countryItem}>
                    <span>
                      <img src={CountryData.GLOBAL.icon} />
                    </span>
                    <span>{CountryData.GLOBAL.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div css={styles.info}>
            <div css={typography.T_16_Regular}>
              <span css={typography.T_16_Semibold}>Language:</span>
              {` ${CountryData[selectedCountry].language}`}
            </div>
            <div css={typography.T_16_Regular}>
              <span css={typography.T_16_Semibold}>Currency:</span>
              {` ${CountryData[selectedCountry].currency}`}
            </div>
          </div>
        </div>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default SetUserPreferences;
