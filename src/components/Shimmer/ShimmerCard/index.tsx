import { FC } from 'react';
import { utils } from '@styles/shared';
import { shine } from '@components/Shimmer/styles';
import { css, SerializedStyles } from '@emotion/react';

interface ShimmerCardProps {
  isEffect?: boolean;
  height?: number;
  borderRadius?: number;
  width?: number;
  margin?: string;
  heightPercentage?: number;
  widthPercentage?: number;
  addStyles?: SerializedStyles;
}

const ShimmerCard: FC<ShimmerCardProps> = ({
  addStyles,
  height,
  width,
  borderRadius,
  heightPercentage,
  widthPercentage,
  margin,
}) => {
  return (
    <div
      css={css(
        shine,
        addStyles,
        height && { height: `${utils.remConverter(height)}` },
        width && { width: `${utils.remConverter(width)}` },
        margin && { margin: margin },
        borderRadius && { borderRadius: borderRadius },
        heightPercentage && { height: `${heightPercentage}%` },
        widthPercentage && { width: `${widthPercentage}%` },
      )}
    ></div>
  );
};

export default ShimmerCard;
