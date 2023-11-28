import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import Image from 'next/image';
import AssetsImg from '@public/images';
import { BottomPopup, DividerLine } from '@components/Shared';
import { mixins } from '@styles/shared';
import { AuthenticationScreen } from '@constants/authentication';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { useTranslate } from '@utils/useTranslate';
import CustomerSupport from '@components/CustomerSupportBottomSheet';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
interface IncorrectPinProps {
  handleScreen: (screeName: AuthenticationScreen) => void;
}

const IncorrectPin: FC<IncorrectPinProps> = ({ handleScreen }) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const [showSupport, setShowSupport] = useState(false);
  return (
    <Fragment>
      <div css={styles.incorrectPinContainter}>
        <div css={styles.detailsContainer}>
          <div css={styles.icon}>
            <img
              css={styles.img}
              src={AssetsImg.ic_authIncorrect.src}
              alt="Error"
            />
          </div>
          <h4 css={styles.title}>{translate(`Oops!`)}</h4>
          <p css={styles.text}>{translate(`TOO_MANY_ATTEMPTS`)} </p>
          <p css={styles.contactUs} onClick={() => setShowSupport(true)}>
            {translate(`CONTACT_SUPPORT`)}
          </p>
        </div>

        <div css={styles.footer}>
          <section css={[mixins.flexAlignJustifiedCenter]}>
            <DividerLine addStyles={styles.divider} />
            <span css={styles.orLine}>{translate(`OR`)}</span>
            <DividerLine addStyles={styles.divider} />
          </section>
          <span
            css={styles.loginOtherOptions}
            onClick={() => handleScreen(AuthenticationScreen.authMain)}
          >
            {translate(`CONTINUE_LOGIN`)}
          </span>
        </div>
      </div>
      <BottomPopup
        isOpen={showSupport}
        size={BottomPopupSize.MEDIUM}
        onClose={() => setShowSupport(false)}
      >
        <CustomerSupport />
      </BottomPopup>
    </Fragment>
  );
};

export default IncorrectPin;
