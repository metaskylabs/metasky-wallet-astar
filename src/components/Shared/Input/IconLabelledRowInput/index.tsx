import { FC } from 'react';
import * as styles from './styles';
import { mixins, utils } from '@styles/shared';
import * as Constants from '@utils/constants';
import { Tooltip } from '@components/Shared';
import NOOB from '@constants/noob';

interface InputBaseProps {
  label?: string;
  inputIcon?: string;
  labelIcon?: string;
  type?: Constants.InputType;
  labelIconName?: string;
  inputIconName?: string;
  placeholder?: string;
  name?: string;
  handleChange?: any;
  value?: string;
  errors?: any;
  onScan?: any;
  tooltip?: string;
  spellCheck?: boolean;
  noSpecialCharacterCheck?: boolean;
  blockDecimal?: boolean;
  handleBlur?: (e: any) => void;
}

const InputBase: FC<InputBaseProps> = ({
  label,
  labelIcon,
  type,
  inputIcon,
  labelIconName,
  inputIconName,
  placeholder,
  handleChange,
  value,
  name,
  errors,
  onScan,
  tooltip,
  spellCheck,
  noSpecialCharacterCheck,
  handleBlur,
  blockDecimal,
}) => {
  const blockInvalidChar = (e: any) => {
    const chars = [`e`, `E`, `+`, `-`];
    if (blockDecimal) chars.push(`.`);
    chars.includes(e.key) && e.preventDefault();
  };
  return (
    <div css={[styles.inputFormControl]}>
      <div css={[styles.inputFormLabel, mixins.flexAlignCenter]}>
        {labelIcon && (
          <div css={[styles.inputFormImage, mixins.flex]}>
            <img src={labelIcon} alt={labelIconName} />
          </div>
        )}
        <label css={[styles.iconLabel, utils.mr(10)]}>{label}</label>
        {tooltip && <Tooltip content={tooltip} id={label} />}
      </div>
      <div css={[styles.inputFormInputWrapper]}>
        <input
          type={type}
          css={[styles.inputFormInput, mixins.placeholderTextstyle]}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          name={name}
          min="1"
          spellCheck={spellCheck}
          onBlur={handleBlur}
          onKeyDown={
            noSpecialCharacterCheck ? (e) => blockInvalidChar(e) : NOOB
          }
        />
        <div onClick={() => onScan()} css={styles.inputFormInputIcon}>
          <img src={inputIcon} alt={inputIconName} />
        </div>
        {errors && <p css={styles.errorMessage}>{errors}</p>}
      </div>
    </div>
  );
};

export default InputBase;
