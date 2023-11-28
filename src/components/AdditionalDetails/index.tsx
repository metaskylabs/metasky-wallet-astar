import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import { motion } from 'framer-motion';
import AssetsImg from '@public/images';
import {
  FullScreenPopUp,
  InputBaseSecondary,
  MLottie,
  PrimaryButton,
} from '@components/Shared';
import { ButtonType, InputType } from '@utils/constants';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { charaterOnlyRegex, emailRegex } from '@utils/regexes';
import { WhitelistRefType } from '@typings/api/auth';
import { updateDemography } from '@actions/profile';
import { handleErrorMessage } from '@utils/handleResponseToast';
import router from 'next/router';
import { Pages } from '@utils/navigation';
import OtpVerification from '@components/Authentication/otpVerification';
import { loginUserByEmailSendOtp } from '@actions/auth';
import { utils } from '@styles/shared';
import { AxiosError } from 'axios';
import { getUserProfile } from '@actions/user';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { trackClick, trackScreen } from '@utils/analytics';
import { click, screen } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import { APIStatusType } from '@typings/api/wrapper';

interface AdditionalDetailsProps {
  email: {
    required: boolean;
  } | null;
  city: {
    required: boolean;
  } | null;
  name: {
    required: boolean;
  } | null;
}

const AdditionalDetails: FC<AdditionalDetailsProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [EmailID, setEmailID] = useState<string | undefined>();
  const [nameDetail, setNameDetail] = useState<string | undefined>();
  const [cityDetail, setCityDetail] = useState<string | undefined>();
  const [isOTP, setIsOTP] = useState<boolean>(false);
  const { translate } = useTranslate();

  useEffect(() => {
    trackScreen(screen.babbuScreen);
  }, []);

  const initialValues: { [key: string]: string } = {
    emailID: ``,
    name: ``,
    city: ``,
  };
  const validateFields = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (props.email || values.emailID) {
      if (
        (props.email?.required && !values.emailID) ||
        (values.emailID && !emailRegex.test(values.emailID))
      ) {
        errors.emailID = translate(`PLEASE_ENTER_VALID_EMAIL_ID`);
      }
    }
    if (props.city || values.city) {
      if (
        (props.city?.required && !values.city) ||
        (values.city && !charaterOnlyRegex.test(values.city))
      ) {
        errors.city = translate(`ENTER_A_VALID_CITY`);
      }
    }
    if (props.name || values.name) {
      if (
        (props.name?.required && !values.name) ||
        (values.name && !charaterOnlyRegex.test(values.name))
      ) {
        errors.name = translate(`NAME_CAN_CONTAIN_ONLY_ALPHABETS`);
      }
    }
    return errors;
  };

  const handleSubmitDetails = async (
    name: string,
    emailID: string,
    city: string,
  ) => {
    try {
      setIsLoading(true);
      const payload = {
        name: name || undefined,
        email: emailID || undefined,
        city: city || undefined,
      };
      const response = await updateDemography(payload);
      if (response) {
        setIsLoading(false);
        getUserProfile().catch((err) => console.log(err));
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(error);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status == 402) {
        router.push(Pages.LOGIN);
      }
    }
  };

  const handleLoginWithEmail = async (EmailID: string, isOTP?: boolean) => {
    try {
      setIsLoading(true);
      const payload = { email: EmailID };
      const response = await loginUserByEmailSendOtp(payload);
      if (response.status === APIStatusType.SUCCESS) {
        setIsLoading(false);
        if (isOTP) {
          setIsOTP(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(error);
    }
  };

  return (
    <>
      <FullScreenPopUp isOpen={isOTP}>
        <OtpVerification
          authType={WhitelistRefType.EMAIL}
          emailID={EmailID}
          name={nameDetail}
          city={cityDetail}
          resendOtp={handleLoginWithEmail}
          mobileNo={``}
          setRecoveryStatus={() => console.log(``)}
          handleScreen={() => console.log(``)}
          resendOtpForForgetPin={() => console.log(``)}
          handleUserBlockerDetails={isOTP}
          setUserBlockerDetails={setIsOTP}
          onDemographyUpdateSuccess={() => {
            getUserProfile().catch((err) => console.log(err));
          }}
        />
      </FullScreenPopUp>
      <FullScreenPopUp isOpen={!isOTP}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validate={validateFields}
          onSubmit={(values: FormikValues) => {
            trackClick(click.babbuScreenSubmit);
            if (values.emailID) {
              setEmailID(values.emailID);
              setNameDetail(values.name);
              setCityDetail(values.city);
              handleLoginWithEmail(values.emailID, true);
            } else {
              handleSubmitDetails(values.name, values.emailID, values.city)
                .then(() => {
                  return getUserProfile();
                })
                .catch((err) => console.log(err));
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <ButtonLayout
              buttonComponent={
                <motion.div
                  css={[styles.buttonContainer]}
                  className="popup-button"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    default: { duration: 0.3 },
                    ease: `easeIn`,
                  }}
                >
                  <PrimaryButton
                    addStyles={styles.button}
                    disabled={isLoading}
                    type={ButtonType.submit}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {!isLoading && translate(`COMPLETE_PROFILE`)}
                    <span>
                      {isLoading && <MLottie addStyles={styles.loader} />}
                    </span>
                  </PrimaryButton>
                </motion.div>
              }
            >
              <div css={styles.userBlockerContainer}>
                <div css={styles.banner}>
                  <img
                    src={AssetsImg.ic_humanFigure.src}
                    alt=""
                    css={styles.humanFigure}
                  />
                  <div css={styles.bannerTextContainer}>
                    <h4 css={styles.bannerTitle}>
                      {translate(`BABBU_SCREEN_TITLE`)}
                      {` `}
                    </h4>
                    <p css={styles.bannerDesc}>
                      {translate(`BABBU_SCREEN_SUBTITLE`)}
                    </p>
                  </div>
                </div>
                <p css={styles.title}>
                  {translate(`BABBU_SCREEN_DESCRIPTION`)}
                </p>
                <div css={styles.formContainer}>
                  {props.name && (
                    <div>
                      <div css={styles.labelContainer}>
                        <h4 css={styles.formLabel}>{translate(`NAME`)}</h4>
                        {props.name?.required && (
                          <h4 css={styles.redText}>*</h4>
                        )}
                      </div>
                      <div>
                        <div css={styles.inputContainer}>
                          <InputBaseSecondary
                            type={InputType.text}
                            placeholder={translate(`NAME_PLACEHOLDER`)}
                            name="name"
                            addStyles={styles.input}
                            onChange={handleChange}
                            value={values.name}
                          />
                          {touched.name && errors.name && (
                            <p css={styles.errorMessage}>{errors.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {props.city && (
                    <div>
                      <div css={styles.labelContainer}>
                        <h4 css={styles.formLabel}>{translate(`CITY`)}</h4>
                        {props.city?.required && (
                          <h4 css={styles.redText}>*</h4>
                        )}
                      </div>
                      <div>
                        <div css={styles.inputContainer}>
                          <InputBaseSecondary
                            type={InputType.text}
                            placeholder={translate(`CITY_PLACEHOLDER`)}
                            name="city"
                            addStyles={styles.input}
                            onChange={handleChange}
                            value={values.city}
                          />
                          {touched.city && errors.city && (
                            <p css={styles.errorMessage}>{errors.city}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {props.email && (
                    <div css={utils.mb(60)}>
                      <div css={styles.labelContainer}>
                        <h4 css={styles.formLabel}>{translate(`EMAIL`)}</h4>
                        {props.email?.required && (
                          <h4 css={styles.redText}>*</h4>
                        )}
                      </div>
                      <div>
                        <div css={styles.inputContainer}>
                          <InputBaseSecondary
                            type={InputType.email}
                            placeholder={translate(`EMAIL_PLACEHOLDER`)}
                            name="emailID"
                            addStyles={styles.input}
                            onChange={handleChange}
                            value={values.emailID}
                          />
                          {touched.emailID && errors.emailID && (
                            <p css={styles.errorMessage}>{errors.emailID}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ButtonLayout>
          )}
        </Formik>
      </FullScreenPopUp>
    </>
  );
};

export default AdditionalDetails;
