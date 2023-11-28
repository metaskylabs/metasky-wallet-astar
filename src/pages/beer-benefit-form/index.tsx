import {
  Checkbox,
  InputBaseSecondary,
  SwipeMainButton,
} from '@components/Shared';
import { CLICK } from '@constants/analytics';
import { InputType } from '@utils/constants';
import { emailRegex, phoneRegex } from '@utils/regexes';
import { useAnalytics } from '@utils/useAnalytics';
import { useTranslate } from '@utils/useTranslate';
import { Formik, FormikErrors, FormikValues } from 'formik';
import * as styles from '../../components/beer-benefit-form/styles';
import { purchaseBeerBenefit } from '@actions/beer-benefit';
import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { State as userProfileState } from '@reducers/user';
import useCustomBack from '@utils/hooks/custom-back';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { useRouter } from 'next/router';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useRef } from 'react';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';

const initialValues: { [key: string]: string | boolean } = {
  name: ``,
  email: ``,
  address: ``,
  pincode: ``,
  phone: ``,
  country: ``,
  region: `jpy`,
  tncAccepted: false,
};

export default function BeerBenefiitForm() {
  const { translate } = useTranslate();
  const amplitude = useAnalytics();
  const { onBack } = useCustomBack();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );

  /* validator */
  const validateFields = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (values.name.trim().length === 0) {
      errors.name = `Enter a valid name`;
    }
    if (values.name.trim().length > 50) {
      errors.name = `Name should be less than 50 character`;
    }
    if (!phoneRegex.test(values.phone)) {
      errors.phone = translate(`ENTER_VALID_PHONE`);
    }
    if (!emailRegex.test(values.email)) {
      errors.email = translate(`ENTER_VALID_EMAIL_ID`);
    }
    if (values.address.trim().length === 0) {
      errors.address = `Enter a valid address`;
    }
    if (values.address.trim().length > 255) {
      errors.address = `Address should be less than 255 characters`;
    }
    if (
      values.pincode.trim().length === 0 ||
      values.pincode.trim().length > 50
    ) {
      errors.pincode = `Enter a valid postal code/zip code`;
    }
    if (
      values.region !== `jpy` &&
      (values.country.trim().length === 0 || values.country.trim().length > 100)
    ) {
      errors.country = translate(`ENTER_VALID_COUNTRY`);
    }
    if (!values.tncAccepted) {
      errors.tncAccepted = `Please accept terms and conditions`;
    }
    return errors;
  };

  /* on form submit */
  const onSubmit = async (values: FormikValues) => {
    if (profile !== null) {
      const walletAddress = profile.allWalletAddresses[0];
      const payload = {
        wallet_uuid: walletAddress ? walletAddress.wallet_uuid : ``,
        name: values.name,
        email: values.email,
        address: values.address,
        phone: values.phone.toString(),
        country: values.region === `jpy` ? `japan` : values.country,
        region: values.region,
        pin_code: values.pincode,
      };
      const resp = await purchaseBeerBenefit(payload);
      if (resp.data.data.paymentUrl) {
        window.open(resp.data.data.paymentUrl, `_blank`);
        router.push(`/transaction-details/${resp.data.data.order_uuid}`);
        generateToast({
          type: ToastType.INFO,
          content: `For a seamless payment, ensure popups are enabled if the payment page doesn't open in a new tab.`,
        });
      } else {
        handleErrorMessage(null, `Unable to generate payment link`);
      }
    }
  };

  return (
    <BottomNav currentTab={NavTabs.HOME}>
      <HeaderWithButtonLayout
        secondaryBack
        onBack={onBack}
        title={`Beer Benefit`}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validate={validateFields}
          onSubmit={async (values: FormikValues, { setSubmitting }) => {
            try {
              amplitude.trackClick(CLICK.BUY_BEER_BENEFIT, {
                walletUUID: profile === null ? null : profile.walletUUID,
                ...values,
              });
              await onSubmit(values);
            } catch (err: any) {
              handleErrorMessage(err, err.response.data.errorMessage);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} ref={ref}>
              <div css={styles.loginForm}>
                {/* name */}
                <p css={styles.formLabel}>{translate(`NAME`)}*</p>
                <div css={[styles.mobile, styles.formGroup]}>
                  <InputBaseSecondary
                    type={InputType.text}
                    placeholder={translate(`NAME`)}
                    name="name"
                    customStyles={styles.input}
                    addStyles={
                      touched.name && errors.name ? styles.error : undefined
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <p css={styles.errorMessage}>{errors.name}</p>
                  )}
                </div>
                {/* email */}
                <p css={styles.formLabel}>{translate(`EMAIL`)}*</p>
                <div css={[styles.mobile, styles.formGroup]}>
                  <InputBaseSecondary
                    type={InputType.email}
                    placeholder={translate(`EMAIL`)}
                    name="email"
                    customStyles={styles.input}
                    addStyles={
                      touched.email && errors.email ? styles.error : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <p css={styles.errorMessage}>{errors.email}</p>
                  )}
                </div>
                {/* address */}
                <p css={styles.formLabel}>{translate(`ADDRESS`)}*</p>
                <div css={[styles.mobile, styles.formGroup]}>
                  <InputBaseSecondary
                    type={InputType.text}
                    placeholder={translate(`ADDRESS`)}
                    name="address"
                    customStyles={styles.input}
                    addStyles={
                      touched.address && errors.address
                        ? styles.error
                        : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  {touched.address && errors.address && (
                    <p css={styles.errorMessage}>{errors.address}</p>
                  )}
                </div>
                {/* pincode */}
                <p css={styles.formLabel}>{translate(`POSTAL_CODE`)}*</p>
                <div css={[styles.mobile, styles.formGroup]}>
                  <InputBaseSecondary
                    type={InputType.text}
                    placeholder={translate(`POSTAL_CODE`)}
                    name="pincode"
                    customStyles={styles.input}
                    addStyles={
                      touched.pincode && errors.pincode
                        ? styles.error
                        : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pincode}
                  />
                  {touched.pincode && errors.pincode && (
                    <p css={styles.errorMessage}>{errors.pincode}</p>
                  )}
                </div>
                {/* phone */}
                <p css={styles.formLabel}>{translate(`PHONE`)}*</p>
                <div css={[styles.mobile, styles.formGroup]}>
                  <InputBaseSecondary
                    type={InputType.text}
                    placeholder={translate(`PHONE_WITH_EXAMPLE`)}
                    name="phone"
                    customStyles={styles.input}
                    addStyles={
                      touched.phone && errors.phone ? styles.error : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  {touched.phone && errors.phone && (
                    <p css={styles.errorMessage}>{errors.phone}</p>
                  )}
                </div>
                {/* region dropdown */}
                <p css={styles.formLabel}>{translate(`REGION`)}*</p>
                <div css={[styles.mobile, styles.formGroup]}>
                  <select
                    name="region"
                    css={styles.dropdown}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.region}
                  >
                    <option value="jpy">Japan</option>
                    <option value="asia">Asia (Not Japan)</option>
                    <option value="rest">Rest of the world</option>
                  </select>
                </div>
                {/* country */}
                {values.region !== `jpy` && (
                  <>
                    <p css={styles.formLabel}>{translate(`COUNTRY`)}*</p>
                    <div css={[styles.mobile, styles.formGroup]}>
                      <InputBaseSecondary
                        type={InputType.text}
                        placeholder={translate(`COUNTRY`)}
                        name="country"
                        customStyles={styles.input}
                        addStyles={
                          touched.country && errors.country
                            ? styles.error
                            : undefined
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                      />
                      {touched.country && errors.country && (
                        <p css={styles.errorMessage}>{errors.country}</p>
                      )}
                    </div>
                  </>
                )}
                <Checkbox
                  checked={values.tncAccepted}
                  handleOption={handleChange}
                  name={`tncAccepted`}
                  id={`accepted_tnc`}
                  label={
                    <p>
                      By checking this box, I confirm that I am of legal
                      drinking age in my country of residence and that I
                      understand and agree to the{` `}
                      <a
                        href={`https://skywallet-public-resources.s3.ap-southeast-1.amazonaws.com/tanukiverse/T%26C.pdf`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms and conditions
                      </a>
                    </p>
                  }
                />
                <div css={[styles.button]}>
                  {/*  <PrimaryButton disabled={isSubmitting} onClick={handleSubmit}>
                    Pay Now
                  </PrimaryButton> */}
                  <SwipeMainButton
                    onComplete={() => {
                      if (
                        (Object.keys(errors).length === 1 &&
                          `tncAccepted` in errors) ||
                        !values.tncAccepted
                      ) {
                        handleErrorMessage(
                          null,
                          `Please accept terms and conditions`,
                        );
                      } else if (
                        (Object.keys(errors).length > 0 ||
                          !values.tncAccepted) &&
                        ref.current
                      ) {
                        ref.current.scrollIntoView(true);
                      }
                      handleSubmit();
                    }}
                    resetMode={!isSubmitting}
                    flow={`Pay Now`}
                    setIsFailure={() => null}
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </HeaderWithButtonLayout>
    </BottomNav>
  );
}
