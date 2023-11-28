import { FC, ReactNode } from 'react';

import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';

interface SectionTitleProps {
  title: string;
  children?: ReactNode;
  additionalStyle?: SerializedStyles;
}

const SectionTitle: FC<SectionTitleProps> = ({
  children,
  title,
  additionalStyle,
}) => {
  return (
    <header css={[styles.container, additionalStyle]}>
      <h3 css={styles.heading}>{title}</h3>
      {children && <div>{children}</div>}
    </header>
  );
};

export default SectionTitle;
