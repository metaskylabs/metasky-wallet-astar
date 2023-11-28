import { FC } from 'react';
import parse from 'html-react-parser';

interface RichTextProps {
  content: string;
}
const RichText: FC<RichTextProps> = ({ content }) => {
  return <div>{parse(content)}</div>;
};

export default RichText;
