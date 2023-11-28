import { FC, ReactNode } from 'react';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';
import { ButtonType } from '@utils/constants';
import { MLottie } from '@components/Shared';

export enum ButtonSize {
  BIG,
  SMALL,
}
interface PrimaryButtonProps {
  addStyles?: SerializedStyles;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
  type?: ButtonType;
  isLoading?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  addStyles,
  children,
  disabled,
  onClick,
  type,
  size = ButtonSize.BIG,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      css={[
        styles.primaryButton,
        { ...addStyles },
        size === ButtonSize.BIG ? styles.flexSize : ``,
        isLoading && styles.loader,
      ]}
      type={type || ButtonType.button}
    >
      {isLoading ? (
        <div css={styles.loader}>
          <MLottie />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
