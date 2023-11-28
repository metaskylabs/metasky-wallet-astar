import { FC, useEffect, useState } from 'react';
import { Fragment } from 'preact';
import { Formik, FormikErrors, FormikValues } from 'formik';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import CountryCodeSelect from '@components/CountryCodeSelect';
import {
  BottomFadeInAnimation,
  InputBaseSecondary,
  MLottie,
  PrimaryButton,
} from '@components/Shared';
import { InputType } from '@utils/constants';
import { CountryCodePayload } from '@typings/api/auth';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { State as countryCodeState } from '@reducers/countryCode';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
interface LoginWithMobileInputProps {
  sendOtp: (number: string) => void;
  loading: boolean;
  setMobileNumber: (mobileNo: string) => void;
}

const LoginWithMobileInput: FC<LoginWithMobileInputProps> = ({
  sendOtp,
  loading,
  setMobileNumber,
}) => {
  const [countryCodeList, setCountryCodeList] = useState<
    CountryCodePayload[] | undefined
  >([]);
  const [countryValue, setCountryValue] = useState<
    CountryCodePayload | undefined
  >();
  const countryCode = useSelector<StoreState, countryCodeState>(
    (state) => state.countryCode,
  );
  const { translate } = useTranslate();
  const amplitude = useAnalytics();
  useEffect(() => {
    async function fetchCountryCode() {
      try {
        setCountryCodeList(countryCode.list);
        const defaultCountry = countryCode.list.filter(
          (country) => country.name === `India`,
        );
        setCountryValue(defaultCountry[0]);
      } catch (err) {
        handleErrorMessage(err);
      }
    }
    fetchCountryCode();
    amplitude.trackPage(EVENT_PAGE.LOGIN_MOBILE, {
      page_url: window && window.location.href,
    });
  }, []);

  const initialValues: { [key: string]: string } = {
    mobileNo: ``,
    countryCode: `+${countryValue && countryValue.isd_code}`,
  };

  const validateFields = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (!values.mobileNo) {
      errors.mobileNo = translate(`ENTER_A_VALID_MOBILE_NUMBER`);
    }
    if (typeof values.mobileNo !== `number`) {
      errors.mobileNo = translate(`ENTER_A_VALID_MOBILE_TYPE`);
    }
    if (!values.countryCode) {
      errors.countryCode = translate(`COUNTRY_CODE_IS_REQUIRED`);
    }
    if (countryValue) {
      const phoneReg = new RegExp(countryValue.phone_regex);
      if (!phoneReg.test(values.mobileNo)) {
        errors.mobileNo = translate(`ENTER_A_VALID_MOBILE`);
      }
    }
    setMobileNumber(values.countryCode + values.mobileNo);
    return errors;
  };

  return (
    <Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validate={validateFields}
        onSubmit={(values: FormikValues, { setSubmitting }) => {
          amplitude.trackClick(CLICK.CONTINUE_LOGIN, { type: `mobile` });
          sendOtp(`${values.countryCode}${values.mobileNo}`);
          setSubmitting(false);
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
          <form onSubmit={handleSubmit}>
            <BottomFadeInAnimation addedStyle={styles.loginForm} delay={0.2}>
              <h4 css={styles.formLabel}>
                {translate(`CONTINUE_WITH_MOBILE_NUMBER`)}
              </h4>
              <div css={styles.formGroup}>
                <div css={[styles.country, styles.input, mixins.flex]}>
                  <CountryCodeSelect
                    countryList={countryCodeList}
                    onChange={(val) => setCountryValue(val)}
                    value={countryValue}
                  />
                </div>
                <div css={styles.mobile}>
                  <InputBaseSecondary
                    type={InputType.number}
                    name="mobileNo"
                    placeholder={translate(`ENTER_MOBILE_NUMBER`)}
                    customStyles={styles.input}
                    addStyles={
                      touched.mobileNo && errors.mobileNo
                        ? styles.error
                        : undefined
                    }
                    onChange={handleChange}
                    value={values.mobileNo}
                    autoFocus={false}
                  />
                  {touched.mobileNo && errors.mobileNo && (
                    <p css={styles.errorMessage}>{errors.mobileNo}</p>
                  )}
                </div>
              </div>
            </BottomFadeInAnimation>
            <BottomFadeInAnimation
              addedStyle={styles.buttonContainer}
              delay={0.2}
            >
              <PrimaryButton onClick={handleSubmit} addStyles={styles.button}>
                {!loading && <p>{translate(`CONTINUE`)}</p>}
                <span>{loading && <MLottie addStyles={styles.loader} />}</span>
              </PrimaryButton>
            </BottomFadeInAnimation>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default LoginWithMobileInput;
