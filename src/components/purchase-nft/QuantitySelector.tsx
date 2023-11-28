import { PrimaryButton } from '@components/Shared';
import { ButtonSize } from '@components/Shared/Button/PrimaryButton';
import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';
import { Dispatch, SetStateAction } from 'react';

type QuantitySelectorType = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  maxQuantity: number;
};

const container = css({
  width: `100%`,
  display: `grid`,
  alignItems: `center`,
  justifyContent: `center`,
  gridTemplateColumns: `min-content auto min-content`,
  columnGap: `20px`,
  margin: `${utils.remConverter(20)} 0`,
});

const button = css({
  width: utils.remConverter(50),
  height: utils.remConverter(50),
  borderRadius: `50%`,
});

export const QuantitySelector = ({
  quantity,
  setQuantity,
  maxQuantity,
}: QuantitySelectorType) => {
  const onButtonClick = (type: 'INCREMENT' | 'DECREMENT') => {
    if (quantity >= 1 && quantity <= maxQuantity) {
      setQuantity((prev) =>
        type === `DECREMENT`
          ? Math.max(1, prev - 1)
          : Math.min(prev + 1, maxQuantity),
      );
    }
  };

  return (
    <div css={container}>
      <PrimaryButton
        size={ButtonSize.SMALL}
        addStyles={button}
        onClick={() => onButtonClick(`DECREMENT`)}
      >
        -
      </PrimaryButton>
      <p css={typography.T_16_Bold}>{quantity}</p>
      <PrimaryButton
        size={ButtonSize.SMALL}
        addStyles={button}
        onClick={() => onButtonClick(`INCREMENT`)}
      >
        +
      </PrimaryButton>
    </div>
  );
};
