/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import * as checkboxStyles from './styles';
import { SerializedStyles } from '@emotion/react';

export interface CheckboxProps {
  checked: boolean;
  handleOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | JSX.Element;
  disabled?: boolean;
  style?: SerializedStyles;
  name: string;
  id: string;
  border?: boolean;
  padding?: true;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  style,
  checked,
  handleOption,
  disabled,
  name,
  id,
  border,
  padding,
}) => {
  return (
    <label
      css={[
        padding
          ? checkboxStyles.checkboxContainerWithBorder
          : checkboxStyles.checkboxContainer,
        checkboxStyles.labelContainer,
        style,
        disabled ? checkboxStyles.disabledLabel : ``,
      ]}
      htmlFor={id}
    >
      {label && (
        <div
          css={[
            checkboxStyles.checkLabel,
            border ? checkboxStyles.lableBorderBottom : ``,
            padding ? checkboxStyles.lablePadding : ``,
          ]}
        >
          {label}
        </div>
      )}
      <input
        checked={checked}
        id={id}
        name={name}
        onChange={handleOption}
        type="checkbox"
        css={checkboxStyles.input}
        disabled={disabled}
      />
      <span
        css={[
          checkboxStyles.checkmark,
          checked && checkboxStyles.checkCheckmark,
        ]}
      />
    </label>
  );
};

export default Checkbox;
