import Image from 'next/image';
import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@/utils/constants';
import { SerializedStyles } from '@emotion/react';
import { mixins } from '@/styles/shared';
import { BackButton } from '../..';
import AssetsImg from '@public/images';

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

const BenefitsListCard: FC<CardBenefitsProps> = ({
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
        />

        <div
          css={[
            mixins.flexColumn,
            mixins.flexJustifiedCenter,
            styles.couponCardBody,
          ]}
        >
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
          <p css={styles.date}>{received && received}</p>
          <div css={backButton ? mixins.flexAlignCenterJustifiedBetween : ``}>
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

export default BenefitsListCard;
