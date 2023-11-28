import { colors, mixins } from '@styles/shared';
import React from 'react';
import * as styles from './styles';

type QuantityUpdateProps = {
  quantity: number;
  maxQuantity?: number;
  minQuantity?: number;
  onQuantityUpdate: (quantity: number) => void;
};

export default function QuantityUpdate(props: QuantityUpdateProps) {
  return (
    <div css={styles.container}>
      <span
        css={[
          mixins.flexAlignJustifiedCenter,
          styles.incDecButton,
          props.minQuantity && props.quantity <= props.minQuantity
            ? {
                backgroundColor: colors.Grey_Text,
                cursor: `not-allowed`,
              }
            : {},
        ]}
        onClick={() => {
          if (props.minQuantity) {
            props.quantity > props.minQuantity &&
              props.onQuantityUpdate(props.quantity - 1);
          } else {
            props.onQuantityUpdate(props.quantity - 1);
          }
        }}
      >
        -
      </span>
      <span>{props.quantity}</span>
      <span
        css={[
          mixins.flexAlignJustifiedCenter,
          styles.incDecButton,
          props.maxQuantity && props.quantity >= props.maxQuantity
            ? {
                backgroundColor: colors.Grey_Text,
                cursor: `not-allowed`,
              }
            : {},
        ]}
        onClick={() => {
          if (props.maxQuantity) {
            props.quantity < props.maxQuantity &&
              props.onQuantityUpdate(props.quantity + 1);
          } else {
            props.onQuantityUpdate(props.quantity + 1);
          }
        }}
      >
        +
      </span>
    </div>
  );
}
