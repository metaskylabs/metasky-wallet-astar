import { FC, ReactNode } from 'react';
import * as styles from './styles';

interface BlueTextButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const BlueTextButton: FC<BlueTextButtonProps> = ({ children, onClick }) => {
  return (
    <div css={styles.buttonLayout} onClick={onClick}>
      {children}
    </div>
  );
};

export default BlueTextButton;
