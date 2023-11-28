import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';
import * as styles from './styles';

interface DividerLineProps {
  addStyles?: SerializedStyles;
}

const DividerLine: FC<DividerLineProps> = ({ addStyles }) => {
  return <div css={[styles.dividerLine, { ...addStyles }]}></div>;
};

export default DividerLine;
