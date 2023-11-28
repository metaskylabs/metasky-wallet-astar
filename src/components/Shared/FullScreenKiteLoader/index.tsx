import { FC, ReactNode } from 'react';
import * as styles from './styles';
import Kite from '@components/Shared/Kite';
import { FullScreenPopUp } from '@components/Shared';

interface FullScreenKiteLoaderProps {
  children: ReactNode;
  isOpen: boolean;
}
const FullScreenKiteLoader: FC<FullScreenKiteLoaderProps> = ({
  isOpen,
  children,
}) => {
  return (
    <FullScreenPopUp isOpen={isOpen}>
      <div css={styles.loaderContainer}>
        <Kite />
        {children}
      </div>
    </FullScreenPopUp>
  );
};

export default FullScreenKiteLoader;
