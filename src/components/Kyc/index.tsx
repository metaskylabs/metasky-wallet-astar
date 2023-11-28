import { FC, useState } from 'react';
import * as styles from './styles';
import { Header, MLottie, PrimaryButton } from '@components/Shared';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { mixins } from '@styles/shared';
import { ButtonType, InputType, maxLength } from '@utils/constants';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import AssetsImg from '@public/images';
import { panRegex } from '@utils/regexes';
import { verifyPan } from '@actions/payment';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { motion } from 'framer-motion';
import { InitialValueProps } from '@typings/api/kyc';
import { useTranslate } from '@utils/useTranslate';

interface KycProps {
  setOpenKyc: (status: boolean) => void;
}

const KYC: FC<KycProps> = ({ setOpenKyc }) => {
  const { translate } = useTranslate();
  const initialValues: InitialValueProps = {
    name: ``,
    pan: ``,
    dateofbirth: new Date(),
  };
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  const submitForm = async (values: FormikValues) => {
    const payload = {
      pan_number: values.pan,
      name_on_pan: values.name,
      birth_month_on_pan: (values.dateofbirth.getMonth() + 1).toString(),
      birth_day_on_pan: values.dateofbirth.getDate().toString(),
      birth_year_on_pan: values.dateofbirth.getFullYear().toString(),
    };
    // console.log(`payload`, payload);

    try {
      setVerifyLoading(true);
      const response = await verifyPan(payload);
      setVerifyLoading(false);

      if (response.data.pan_verified) {
        setOpenKyc(false);
      }
    } catch (error) {
      handleErrorMessage(error);
      setVerifyLoading(false);
    }
  };

  const validateFields = (values: FormikValues) => {
    const errors: FormikErrors<Record<string, any>> = {};
    if (!values.name) {
      errors.name = translate(`REQUIRED_TO_BE_FILLED`);
    }
    if (!values.pan) {
      errors.pan = translate(`REQUIRED_TO_BE_FILLED`);
    } else if (!panRegex.test(values.pan)) {
      errors.pan = translate(`INVALID_PAN`);
    }
    if (!values.dateofbirth) {
      errors.dateofbirth = translate(`REQUIRED_TO_BE_FILLED`);
    }
    return errors;
  };

  return (
    <div
      css={[
        styles.kycContainer,
        mixins.flexJustifiedBetween,
        mixins.flexColumn,
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <Header
          title={translate(`KYC_VERIFICATION`)}
          isBackEnabled={true}
          customBack={() => setOpenKyc(false)}
        />
      </motion.div>
      <motion.p
        css={styles.kycContent}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        {translate(`KYC_DISCLAIMER`)}
      </motion.p>
      <Formik
        initialValues={initialValues}
        validate={validateFields}
        onSubmit={(values: FormikValues, { setSubmitting }) => {
          // console.log(`data`, values);
          submitForm(values);
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
          setFieldValue,
        }) => (
          <div
            css={[
              styles.formHeight,
              mixins.flexJustifiedBetween,
              mixins.flexColumn,
            ]}
          >
            <motion.section
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              <div css={styles.loginForm}>
                <div css={[styles.loginContainer, mixins.flexColumn]}>
                  <div
                    css={[
                      styles.kycFormContainer,
                      mixins.flexAlignCenterJustifiedBetween,
                    ]}
                  >
                    <label css={styles.label}>{translate(`NAME`)}</label>
                    <img
                      src={AssetsImg.ic_encrypted.src}
                      alt="encrypted"
                      css={styles.kycEncryptedImg}
                    />
                  </div>
                  <input
                    type={InputType.text}
                    name="name"
                    placeholder={translate(`ENTER_NAME_AS_PER_PAN`)}
                    onChange={handleChange}
                    value={values.name}
                    css={[styles.input, mixins.placeholderTextstyle]}
                    autoComplete="off"
                  />
                  {touched.name && errors.name && (
                    <p css={styles.errorMessage}>{errors.name}</p>
                  )}
                </div>
                <div css={[styles.loginContainer, mixins.flexColumn]}>
                  <div
                    css={[
                      styles.kycFormContainer,
                      mixins.flexAlignCenterJustifiedBetween,
                    ]}
                  >
                    <label css={styles.label}>{translate(`PAN_NUMBER`)}</label>
                    <img
                      src={AssetsImg.ic_encrypted.src}
                      alt="encrypted"
                      css={styles.kycEncryptedImg}
                    />
                  </div>
                  <input
                    type={InputType.text}
                    name="pan"
                    placeholder={translate(`ENTER_YOUR_PAN`)}
                    onChange={handleChange}
                    value={values.pan}
                    css={[
                      styles.input,
                      mixins.placeholderTextstyle,
                      styles.uppercase,
                    ]}
                    maxLength={maxLength.panCard}
                    autoComplete="off"
                  />
                  {touched.pan && errors.pan && (
                    <p css={styles.errorMessage}>{errors.pan}</p>
                  )}
                </div>
                <div css={[styles.loginContainer, mixins.flexColumn]}>
                  <div
                    css={[
                      styles.kycFormContainer,
                      mixins.flexAlignCenterJustifiedBetween,
                    ]}
                  >
                    <label css={styles.label}>{translate(`DOB`)}</label>
                    <img
                      src={AssetsImg.ic_encrypted.src}
                      alt="encrypted"
                      css={styles.kycEncryptedImg}
                    />
                  </div>
                  <DatePicker
                    name="dateofbirth"
                    onChange={(newDate: Date) =>
                      setFieldValue(`dateofbirth`, newDate)
                    }
                    value={values.dateofbirth}
                    css={[styles.input, mixins.placeholderTextstyle]}
                  />
                  {touched.dateofbirth && errors.dateofbirth && (
                    <p css={styles.errorMessage}>{errors.dateofbirth}</p>
                  )}
                </div>
              </div>
            </motion.section>
            <motion.div
              css={[styles.buttonContainer]}
              className="popup-button"
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              <PrimaryButton
                addStyles={styles.button}
                disabled={isSubmitting}
                type={ButtonType.submit}
                onClick={handleSubmit}
              >
                {!verifyLoading && translate(`VERIFY`)}
                <span>
                  {verifyLoading && <MLottie addStyles={styles.loader} />}
                </span>
              </PrimaryButton>
            </motion.div>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default KYC;
