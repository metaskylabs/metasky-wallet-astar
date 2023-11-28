import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import { mixins } from '@styles/shared';
import { BackButton } from '../..';
import AssetsImg from '@public/images';

interface CardBenefitsProps {
  image: string;
  name?: string;
  description?: string;
  received?: string;
  addStyles?: SerializedStyles;
  bodyStyles?: SerializedStyles;
  backButton?: boolean;
  onClick?: () => void;
  keys?: number;
  addBackground?: boolean;
}

const CardBenefits: FC<CardBenefitsProps> = ({
  name,
  description,
  received,
  image,
  addStyles,
  backButton,
  onClick,
  keys,
  addBackground,
  bodyStyles,
}) => {
  return (
    <div
      css={[styles.couponCardContainer, { ...addStyles }]}
      onClick={onClick}
      key={keys}
    >
      {addBackground && (
        <div css={styles.backGroundPattern}>
          <img src={AssetsImg.ic_circular_lines.src} />
        </div>
      )}
      <div css={styles.couponCardWrapper}>
        <img
          css={styles.couponCardImg}
          src={image}
          alt="Token Monero"
          width="100%"
          height="100%"
        />

        <div css={[styles.couponCardBody, { ...bodyStyles }]}>
          <span css={styles.couponCardTitle}>
            {name
              ? name.length > 17
                ? name.substring(0, 17) + `...`
                : name
              : ``}
          </span>
          <p css={styles.couponCardDescription} title={description}>
            {description
              ? description.length > 50
                ? description.substring(0, 50) + `...`
                : description
              : ``}
          </p>

          <div
            css={[
              backButton && mixins.flexJustifiedEnd,
              received && backButton && mixins.flexAlignCenterJustifiedBetween,
            ]}
          >
            {received && (
              <aside
                css={
                  backButton
                    ? styles.couponCardFooter
                    : styles.couponCardFooterMargin
                }
              >
                {Constants.transaction.received} {received}
              </aside>
            )}
            {backButton && (
              <BackButton addStyles={styles.couponCardbackButton} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBenefits;
