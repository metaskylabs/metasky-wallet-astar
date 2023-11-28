import { FC, ReactNode } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';

interface BottomStickyBannerProps {
  onClick?: () => void;
  children: ReactNode;
}

const BottomStickyBanner: FC<BottomStickyBannerProps> = ({
  onClick,
  children,
}) => {
  return (
    <div
      css={[styles.container, mixins.flexAlignCenterJustifiedBetween]}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BottomStickyBanner;
