import { ChangeEvent, FC, FocusEvent } from 'react';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import NOOB from '@constants/noob';

interface InputBaseSecondaryProps {
  type: Constants.InputType;
  placeholder?: string;
  addStyles?: SerializedStyles;
  customStyles?: SerializedStyles;
  value?: string | null;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  noSpecialCharacterCheck?: boolean;
}

const InputBaseSecondary: FC<InputBaseSecondaryProps> = ({
  type,
  placeholder,
  addStyles,
  customStyles,
  name,
  onChange,
  onBlur,
  value,
  disabled,
  autoFocus,
  noSpecialCharacterCheck,
}) => {
  const onWheel = (e: any) => {
    e.target.blur();
  };
  const blockInvalidChar = (e: any) =>
    [`e`, `E`, `+`, `-`].includes(e.key) && e.preventDefault();

  return (
    <input
      name={name}
      type={type}
      css={[customStyles, addStyles]}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value || ``}
      disabled={disabled}
      autoComplete="off"
      min="1"
      onWheel={onWheel}
      autoFocus={autoFocus || false}
      onKeyDown={noSpecialCharacterCheck ? (e) => blockInvalidChar(e) : NOOB}
      inputMode={type === Constants.InputType.number ? `numeric` : `text`}
    />
  );
};

export default InputBaseSecondary;
