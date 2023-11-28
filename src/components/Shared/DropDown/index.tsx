/** @jsxImportSource @emotion/react */
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { FC } from 'react';
import { useOutsideClick } from '@utils/helper';

interface DropdownProps {
  open: boolean;
  onClose: (b: boolean) => void;
}

const Dropdown: FC<DropdownProps> = ({ open, onClose, children }) => {
  const ref = useOutsideClick(() => onClose(false));

  return (
    <section ref={ref} css={[styles.dropdown, mixins.positionRelative]}>
      {open && <section css={[styles.filterContainer]}>{children}</section>}
    </section>
  );
};

export default Dropdown;
