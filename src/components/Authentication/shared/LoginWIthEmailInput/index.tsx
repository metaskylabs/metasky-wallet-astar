import { InputBaseSecondary, MLottie, PrimaryButton } from '@components/Shared';
import { CLICK } from '@constants/analytics';
import { InputType } from '@utils/constants';
import { emailRegex } from '@utils/regexes';
import { useAnalytics } from '@utils/useAnalytics';
import { useTranslate } from '@utils/useTranslate';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { motion } from 'framer-motion';
import { FC } from 'react';
import * as styles from './styles';

interface LoginWIthEmailInputProps {
  handleLoginWithEmail: (emailId: string) => void;
  setEmailID: (emailID: string) => void;
  loading: boolean;
}
const LoginWIthEmailInput: FC<LoginWIthEmailInputProps> = ({
  handleLoginWithEmail,
  setEmailID,
  loading,
}) => {
  const { translate } = useTranslate();
  const amplitude = useAnalytics();
  const initialValues: { [key: string]: string } = {
    emailID: ``,
  };
  const validateFields = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (!emailRegex.test(values.emailID)) {
      errors.emailID = translate(`ENTER_VALID_EMAIL_ID`);
    }
    setEmailID(values.emailID);
    return errors;
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validate={validateFields}
      onSubmit={(values: FormikValues, { setSubmitting }) => {
        amplitude.trackClick(CLICK.CONTINUE_LOGIN, { type: `email` });
        handleLoginWithEmail(values.emailID);
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
          <div css={styles.loginForm}>
            <h4 css={styles.formLabel}>
              {translate(`CONTINUE_USING_EMAIL_ID`)}
            </h4>
            <div css={styles.formGroup}>
              <div css={styles.mobile}>
                <InputBaseSecondary
                  type={InputType.email}
                  placeholder={translate(`ENTER_EMAIL_ID`)}
                  name="emailID"
                  customStyles={styles.input}
                  addStyles={
                    touched.emailID && errors.emailID ? styles.error : undefined
                  }
                  onChange={handleChange}
                  value={values.emailID}
                  autoFocus={true}
                />
                {touched.emailID && errors.emailID && (
                  <p css={styles.errorMessage}>{errors.emailID}</p>
                )}
              </div>
            </div>
          </div>
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
              disabled={loading || isSubmitting}
              onClick={handleSubmit}
            >
              {!loading && <p>{translate(`CONTINUE`)}</p>}
              <span>
                {(loading || isSubmitting) && (
                  <MLottie addStyles={styles.loader} />
                )}
              </span>
            </PrimaryButton>
          </motion.div>
        </form>
      )}
    </Formik>
  );
};

export default LoginWIthEmailInput;
