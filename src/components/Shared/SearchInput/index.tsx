import AssetsImg from '@public/images';
import { InputType } from '@utils/constants';
import { mixins } from '@styles/shared';
import { FC } from 'react';
import * as styles from './styles';

interface SearchProps {
  value: string | number | string[] | undefined;
  placeholder: string;
  onChange: (value: any) => void;
}

const SearchInput: FC<SearchProps> = ({ value, placeholder, onChange }) => {
  return (
    <div css={[styles.inputContainer, mixins.positionRelative]}>
      <input
        css={styles.searchInput}
        type={InputType.text}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <div css={[styles.searchIcon, mixins.flex]}>
        <img src={AssetsImg.ic_search.src} alt={`search`} />
      </div>
    </div>
  );
};

export default SearchInput;
