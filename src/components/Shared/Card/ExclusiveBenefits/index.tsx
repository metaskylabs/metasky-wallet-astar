import { FC } from 'react';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';
import { mixins, typography } from '@/styles/shared';
import { useTranslate } from '@utils/useTranslate';

interface CardBenefitsProps {
  image: string;
  name?: string;
  description?: string;
  received?: string;
  addStyles?: SerializedStyles;
  backButton?: boolean;
  onClick?: () => void;
  cardKey?: string;
  addBackground?: boolean;
}

const CardExclusiveBenefits: FC<CardBenefitsProps> = ({
  name,
  description,
  received,
  image,
  addStyles,
  backButton,
  onClick,
  cardKey,
  addBackground,
}) => {
  const { translate } = useTranslate();
  return (
    <div
      css={[styles.couponCardContainer, { ...addStyles }]}
      onClick={onClick}
      key={cardKey}
    >
      <div css={styles.couponCardWrapper}>
        <img
          css={styles.couponCardImg}
          src={image}
          alt="Token Monero"
          width="100%"
          height="100%"
          loading="lazy"
        />

        <div
          css={[
            mixins.flexColumn,
            mixins.flexAlignBaselineJustifiedBetween,
            styles.couponCardBody,
          ]}
        >
          <div>
            <span css={styles.couponCardTitle}>{name}</span>
            {description && (
              <p
                css={styles.couponCardDescription}
                title={description}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></p>
            )}
          </div>
          {received && (
            <div css={typography.T_12_Semibold}>
              <span>
                {translate(`RECEIVED`)}
                {` `}
                {received}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardExclusiveBenefits;
