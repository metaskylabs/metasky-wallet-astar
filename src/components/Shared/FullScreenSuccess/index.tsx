import * as styles from './styles';
import { mixins } from '@styles/shared';
import AssetsImg from '@public/images';
import { FullScreenPopUp, PrimaryButton } from '@components/Shared';
import { FC, Fragment } from 'react';
import router from 'next/router';
import { ButtonType } from '@utils/constants';
import { Pages } from '@utils/navigation';

interface FullScreenSuccessProps {
  isOpen: boolean;
  title?: string;
  info?: string;
  showButton?: boolean;
  ctaText?: string;
  onClick?: () => void;
  showHomeButton?: boolean;
}
const FullScreenSuccess: FC<FullScreenSuccessProps> = ({
  isOpen,
  title,
  info,
  showButton,
  ctaText,
  showHomeButton,
  onClick,
}) => {
  return (
    <FullScreenPopUp isOpen={isOpen}>
      <Fragment>
        <div
          css={[
            styles.purchaseSuccessIcon,
            mixins.flexAlignJustifiedCenter,
            mixins.flexColumn,
          ]}
        >
          <div css={[styles.successIcon, mixins.flexAlignJustifiedCenter]}>
            <img src={AssetsImg.ic_succes_93.src} alt="success" />
          </div>
          {title && <h2 css={[styles.purchaseCongratulation]}>{title}</h2>}
          {info && <p css={[styles.purchaseDescription]}>{info}</p>}
        </div>
        <div css={styles.ctaContainer}>
          {showButton && ctaText && (
            <PrimaryButton
              onClick={onClick}
              addStyles={styles.button}
              type={ButtonType.button}
            >
              {ctaText}
            </PrimaryButton>
          )}
          {showHomeButton && (
            <button
              onClick={() => {
                router.push(Pages.HOME);
              }}
              css={styles.homeButton}
            >
              Back to Homepage
            </button>
          )}
        </div>
      </Fragment>
    </FullScreenPopUp>
  );
};

export default FullScreenSuccess;
