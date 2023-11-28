import { mixins } from '@styles/shared';
import React from 'react';
import * as styles from './styles';

export default function FeeDetailItem(props: {
  name: string | React.ReactNode;
  value: string;
  weight: 'regular' | 'bold';
}) {
  return (
    <div css={[mixins.flexAlignCenterJustifiedBetween]}>
      <span css={[styles.name]}>{props.name}</span>
      <aside
        css={[
          props.weight === `regular` ? styles.regular : styles.bold,
          styles.value,
        ]}
      >
        {props.value}
      </aside>
    </div>
  );
}
