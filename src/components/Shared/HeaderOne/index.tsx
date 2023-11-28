import { mixins } from '@styles/shared';
import { FC, ReactNode } from 'react';
import * as styles from './styles';

interface HeaderOneProps {
  title?: string;
  children?: ReactNode;
}

const HeaderOne: FC<HeaderOneProps> = ({ title, children }) => {
  return (
    <div css={[mixins.flexAlignCenterJustifiedBetween]}>
      <span css={styles.bodyTokenTitle}>{title}</span>
      {children}
    </div>
  );
};

export default HeaderOne;
