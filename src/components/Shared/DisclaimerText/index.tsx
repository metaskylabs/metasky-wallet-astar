import { mixins } from '@styles/shared';
import { FC, Fragment, ReactNode } from 'react';
import * as styles from './styles';

interface DisclaimerTextProps {
  children: ReactNode;
}

const DisclaimerText: FC<DisclaimerTextProps> = ({ children }) => {
  return (
    <Fragment>
      <div css={[styles.disclaimerWrapper, mixins.flexAlignStart]}>
        {children}
      </div>
    </Fragment>
  );
};

export default DisclaimerText;
