import { FC } from 'react';
import * as styles from './styles';
import { utils } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';

interface ShimmerProps {
  isEffect?: boolean;
  height?: number;
  containerStyles?: SerializedStyles;
}

const Shimmer: FC<ShimmerProps> = ({
  isEffect,
  height,
  containerStyles,
  children,
}) => {
  if (height) {
    styles.container.styles = `height:${utils.remConverter(height)};${
      styles.container.styles
    }`;
  }
  return (
    <div css={[styles.container, { ...containerStyles }]}>
      <div css={isEffect && styles.shine}>{children}</div>
    </div>
  );
};

export default Shimmer;
