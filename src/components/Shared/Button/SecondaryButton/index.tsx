import { FC, ReactNode } from 'react';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';

interface SecondaryButtonProps {
  addStyles?: SerializedStyles;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  onClick,
  addStyles,
  disabled,
}) => {
  return (
    <button
      css={[styles.secondaryButton, { ...addStyles }]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
