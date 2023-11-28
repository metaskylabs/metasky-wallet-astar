import { FC } from 'react';
import * as styles from './styles';
import { mixins, utils } from '@styles/shared';
import { limitDecimal } from '@utils/helper';

interface CardTokenProps {
  onClick?: () => void;
  name: string;
  image: string;
  quantity: string;
  shortform?: string;

  conversionFactor?: number;
  currency?: string;
}

const CardToken: FC<CardTokenProps> = ({
  onClick,
  name,
  image,
  quantity,
  shortform,

  conversionFactor,
  currency,
}) => {
  const inrValue = parseFloat(quantity) * (conversionFactor || 0) || 0;
  return (
    <div
      css={[styles.tokenContainer, mixins.flexAlignCenterJustifiedBetween]}
      onClick={onClick}
    >
      <div css={[styles.tokenBody, mixins.flexAlignCenter]}>
        <div css={styles.tokenImg}>
          <img
            src={image}
            alt={name}
            width="100%"
            height="100%"
            css={{
              borderRadius: `${utils.remConverter(4)} 0 0 ${utils.remConverter(
                4,
              )}`,
            }}
          />
        </div>
        <span css={styles.tokenTitle}>{name}</span>
      </div>
      <div css={[styles.tokenCardBottom, mixins.flexColumn]}>
        <span css={styles.headerContainerTitle}>
          {limitDecimal(quantity, 2)}
        </span>
        {conversionFactor && (
          <div css={[styles.inrValue]}>
            ~
            {currency === `INR` ? (
              <span>&#8377; </span>
            ) : (
              <span>{currency}&nbsp;</span>
            )}
            {limitDecimal(inrValue.toString(), 2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardToken;
