import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';
import * as styles from './styles';

interface TertiaryButtonProps {
  text?: string;
  addStyles?: SerializedStyles;
  onClick?: () => void;
}

const TertiaryButton: FC<TertiaryButtonProps> = ({
  text,
  addStyles,
  onClick,
}) => {
  return (
    <button css={[styles.button, { ...addStyles }]} onClick={onClick}>
      {text}
    </button>
  );
};

export default TertiaryButton;
