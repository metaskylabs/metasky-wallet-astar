import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import { mixins } from '@styles/shared';
import { BackButton } from '../..';
import AssetsImg from '@public/images';
import { divider } from '@components/WalletAddress/styles';

interface DefaultCardBenefitsProps {
  onClick?: () => void;
  backButton?: boolean;
}

const DefaultCardBenefits: FC<DefaultCardBenefitsProps> = ({
  onClick,
  backButton,
}) => {
  return (
    <div css={styles.couponCardContainer} onClick={onClick}>
      <div css={styles.couponCardWrapper}>
        <div css={styles.couponCardImg}>
          <img
            src={AssetsImg.ic_benefitsblue.src}
            alt="Token Monero"
            width="100%"
            height="100%"
          />
        </div>
        <div css={styles.couponCardBody}>
          <div>
            <span css={styles.couponCardTitle}>No Benefits Yet!</span>
            <p css={styles.couponCardDescription}>
              Benefits from assets stored in your MetaSky wallet will be
              displayed here.
            </p>
          </div>
          <div css={backButton ? mixins.flexAlignCenterJustifiedBetween : ``}>
            <aside
              css={
                backButton
                  ? styles.couponCardFooter
                  : styles.couponCardFooterMargin
              }
            ></aside>
          </div>
        </div>
      </div>
      <div css={styles.backButtonContainer}>
        {backButton && <BackButton addStyles={styles.couponCardbackButton} />}
      </div>
    </div>
  );
};

export default DefaultCardBenefits;
