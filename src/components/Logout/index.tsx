import { FC, useEffect } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import * as Constants from '@utils/constants';
import { PrimaryButton, SecondaryButton } from '../Shared';
import { motion } from 'framer-motion';
import { setLogout } from '@actions/auth';
import { sendMessageToParent } from '@utils/helper';
import { IframeMessageType } from '@utils/constants';
import { Pages } from '@utils/navigation';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslate } from '@utils/useTranslate';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';
interface LogoutProps {
  onClose: () => void;
}
const Logout: FC<LogoutProps> = ({ onClose }) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const { trackClick, trackPage } = useAnalytics();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    setLogout(dispatch);
    sendMessageToParent(
      JSON.stringify({ event: IframeMessageType.logoutSuccess }),
    );
    router.push(Pages.LOGIN);
  };
  useEffect(() => {
    trackPage(EVENT_PAGE.CONFIRM_LOGOUT);
  });
  const handleLogoutClose = () => {
    onClose();
    sendMessageToParent(
      JSON.stringify({ event: IframeMessageType.cancelLogout }),
    );
  };
  return (
    <motion.div
      css={[mixins.flexAlignCenterJustifiedBetween, mixins.flexColumn]}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        default: { duration: 0.3 },
        ease: `easeIn`,
      }}
    >
      <div css={[styles.logoutImgContainer, mixins.flexAlignJustifiedCenter]}>
        <img
          src={AssetsImg.i_logoutConfirmation.src}
          alt={Constants.referAndEarn.invite}
          css={styles.imgSize}
        />
      </div>
      <h2 css={[styles.logoutTitle, mixins.flexAlignJustifiedCenter]}>
        {translate(`LOG_OUT_BOTTOM_SHEET_TITLE`)}
      </h2>
      <p css={[styles.logoutContent, mixins.flexAlignJustifiedCenter]}>
        {translate(`LOG_OUT_BOTTOM_SHEET_SUBTITLE`)}
      </p>
      <motion.div
        css={[styles.buttonContainer, mixins.flexAlignCenterJustifiedBetween]}
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <SecondaryButton
          addStyles={styles.cancelbutton}
          onClick={() => {
            handleLogoutClose && handleLogoutClose();
            trackClick(CLICK.CANCEL_LOGOUT);
          }}
        >
          {translate(`CANCEL`)}
        </SecondaryButton>
        <PrimaryButton
          addStyles={styles.logoutButton}
          onClick={() => {
            handleLogOut();
            trackClick(CLICK.CONFIRM_LOGOUT);
          }}
        >
          {translate(`LOG_OUT`)}
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );
};

export default Logout;
