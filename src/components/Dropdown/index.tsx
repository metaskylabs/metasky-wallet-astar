/** @jsxImportSource @emotion/react */
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { FC, useState } from 'react';
import { useOutsideClick } from '@utils/helper';
import AssetsImg from '@public/images';

interface DropdownProps {
  placeholder: string;
  options: { id: string; value: string }[];
  value?: { id: string; value: string };
  onChange: (id: string, value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  placeholder,
  onChange,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));

  return (
    <section ref={ref} css={[styles.dropdown, mixins.positionRelative]}>
      <div
        css={[styles.sortButton, mixins.flexAlignCenterJustifiedBetween]}
        onClick={() => setOpen(!open)}
      >
        <p css={styles.dropdownContent}>{value?.value || placeholder}</p>
        <img
          src={AssetsImg.ic_blueArrowUp.src}
          css={[!open && styles.arrowDown]}
        />
      </div>
      {open && (
        <section css={[styles.optionContainer]}>
          {options.map((option, key) => (
            <div
              key={key}
              css={styles.optionItem}
              onClick={() => {
                onChange(option.id, option.value);
                setOpen(false);
              }}
            >
              {option.value}
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default Dropdown;
