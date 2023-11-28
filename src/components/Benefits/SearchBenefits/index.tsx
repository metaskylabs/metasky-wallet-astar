import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import { useAnalytics } from '@utils/useAnalytics';

interface SearchBenefitsProps {
  placeholder: string;
  inputIcon: string;
  type: Constants.InputType;
  onChange: any;
  value: string;
}

const SearchBenefits: FC<SearchBenefitsProps> = ({
  type,
  placeholder,
  inputIcon,
  onChange,
  value,
}) => {
  const { trackClick } = useAnalytics();
  return (
    <div css={[styles.inputFormInputWrapper]}>
      <input
        type={type}
        css={styles.inputFormInput}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onFocus={() => trackClick(`search bar`)}
      />
      <div css={styles.inputFormInputIcon}>
        <img src={inputIcon} alt={`search`} />
      </div>
    </div>
  );
};

export default SearchBenefits;
