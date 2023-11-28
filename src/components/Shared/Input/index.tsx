import * as styles from './styles';
import { FC, ReactText } from 'react';
import { SerializedStyles } from '@emotion/react';
import { colors, mixins } from '@styles/shared';
import { inputTextField } from './styles';

interface InputProps {
  label?: string;
  id?: string;
  addStylesToContainer?: SerializedStyles;
  addInputStyles?: SerializedStyles;
  placeholder: string;
  type: string;
  isEnable: boolean;
  getInputText: (text: string) => void;
  value?: string;
  maxLength?: number;
}

const Input: FC<InputProps> = ({
  label,
  id,
  addStylesToContainer,
  addInputStyles,
  placeholder,
  type,
  isEnable,
  getInputText,
  maxLength,
  value,
}) => {
  const setInputText = (inputText: ReactText) => {
    const text = inputText as string;
    getInputText(text);
  };
  return (
    <div css={[styles.inputContainer, { ...addStylesToContainer }]}>
      {label && (
        <div>
          <label css={styles.label} htmlFor={id}>
            {label}
          </label>
          <br />
        </div>
      )}
      {isEnable ? (
        <input
          onChange={(e) => {
            const { value } = e.target;
            setInputText(value);
          }}
          css={[
            styles.inputTextField,
            mixins.placeholderTextstyle,
            addInputStyles,
          ]}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
        />
      ) : (
        <input
          css={[
            styles.inputTextField,
            mixins.placeholderTextstyle,
            addInputStyles,
          ]}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          disabled
        />
      )}
    </div>
  );
};

export default Input;
