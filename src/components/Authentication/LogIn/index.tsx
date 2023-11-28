import { AuthenticationScreen } from '@constants/authentication';
import AssetsImg from '@public/images';
import Image from 'next/image';
import { FC, Fragment } from 'react';
import * as styles from './styles';

interface LoginProps {
  handleScreen: (screeName: AuthenticationScreen) => void;
}

const Login: FC<LoginProps> = ({ handleScreen }) => {
  return (
    <Fragment>
      <div css={styles.icon}>
        {/* <img src={AssetsImg.i_authLogin.src} alt="Login" /> */}
      </div>
      <div css={styles.textCenter}>
        <button css={styles.button}>
          <span css={styles.buttonIcon}>
            <img src={AssetsImg.i_iconGoogle.src} alt="Google" />
          </span>
          Continue with Google
        </button>
        <div css={styles.hr}>
          <span css={styles.hrSpan}>OR</span>
        </div>
        <button
          css={styles.link}
          onClick={() => handleScreen(AuthenticationScreen.authMain)}
        >
          Continue with email id
        </button>
      </div>
    </Fragment>
  );
};

export default Login;
