import router from 'next/router';
import { FC } from 'react';
import TertiaryButton from '../Button/TertiaryButton';
import * as styles from './styles';

interface ToastWithActionProps {
  text?: string; //TODO: Remove text dependency by children
  buttonText?: string;
  redirectUrl?: string;
  target?: string;
}

const ToastWithAction: FC<ToastWithActionProps> = ({
  text,
  buttonText,
  redirectUrl,
  target,
}) => {
  const handleRedirect = () => {
    if (target !== `_self` && typeof window !== `undefined`) {
      window.open(redirectUrl, target);
      return;
    }
    router.push(`${redirectUrl}`);
  };
  return (
    <>
      <span css={styles.buttonContainer}>
        {text}
        <TertiaryButton text={buttonText} onClick={handleRedirect} />
      </span>
    </>
  );
};

export default ToastWithAction;
