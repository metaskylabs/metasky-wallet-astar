import { FC, Fragment } from 'react';
import ShimmerCard from '@components/Shimmer/ShimmerCard';

interface ShimmerParagraphProps {
  height?: number;
  repeat?: number;
  borderRadius?: number;
}

const ShimmerParagraph: FC<ShimmerParagraphProps> = ({
  height,
  borderRadius,
  repeat,
}) => {
  return (
    <Fragment>
      {[...Array(repeat)].map((e, i) => (
        <ShimmerCard
          height={height ? height : 21}
          borderRadius={borderRadius ? borderRadius : 10}
          isEffect={true}
          key={i}
        />
      ))}
    </Fragment>
  );
};

export default ShimmerParagraph;
