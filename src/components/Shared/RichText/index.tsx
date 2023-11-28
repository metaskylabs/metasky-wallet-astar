import { FC } from 'react';
import parse from 'html-react-parser';
import * as styles from './styles';

interface RichTextProps {
  content: string;
}
const RichText: FC<RichTextProps> = ({ content }) => {
  return <div css={styles.richWrapper}>{parse(content)}</div>;
};

export default RichText;
