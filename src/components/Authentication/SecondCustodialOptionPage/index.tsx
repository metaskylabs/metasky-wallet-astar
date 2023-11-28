import LoginWIthEmailInput from '@components/Authentication/shared/LoginWIthEmailInput';
import LoginWithMobileInput from '@components/Authentication/shared/LoginWithMobileInput';
import HeaderWithCloseAndBack from '@components/Shared/Header/WithCloseAndBack';
import { AuthenticationScreen } from '@constants/authentication';
import AssetsImg from '@public/images';
import { LoginMethods } from '@typings/api/wallet';
import { motion } from 'framer-motion';
import { FC } from 'react';
import * as styles from './styles';

interface SecondCustodialOptionPageProps {
  sendOtp: (number: string) => void;
  handleScreen: (screeName: AuthenticationScreen) => void;
  setMobileNumber: (mobileNo: string) => void;
  loading: boolean;
  secondCustodialLoginOption: LoginMethods;
  setEmailID: (emailID: string) => void;
  handleLoginWithEmail: (emailId: string) => void;
}

const SecondCustodialOptionPage: FC<SecondCustodialOptionPageProps> = ({
  handleScreen,
  sendOtp,
  setMobileNumber,
  loading,
  secondCustodialLoginOption,
  handleLoginWithEmail,
  setEmailID,
}) => {
  return (
    <div>
      <HeaderWithCloseAndBack
        isBackEnabled={true}
        secondaryBack={true}
        addedContainerStyles={styles.headerWrapper}
      />
      <motion.div
        css={styles.icon}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <img src={AssetsImg.ic_emailBanner.src} alt="Login" />
      </motion.div>
      {secondCustodialLoginOption === LoginMethods.PHONE ? (
        <LoginWithMobileInput
          sendOtp={(number) => sendOtp(number)}
          loading={loading}
          setMobileNumber={setMobileNumber}
        />
      ) : secondCustodialLoginOption === LoginMethods.EMAIL ? (
        <LoginWIthEmailInput
          handleLoginWithEmail={(emailId) => handleLoginWithEmail(emailId)}
          setEmailID={(value) => {
            setEmailID(value);
          }}
          loading={loading}
        />
      ) : null}
    </div>
  );
};

export default SecondCustodialOptionPage;
