import AssetsImg from '@public/images';
import React from 'react';
import * as styles from './styles';

export default function LabelledRadioButton(props: {
  radioButtonProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  id?: string;
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      css={[
        props.checked
          ? styles.inputRadioContainerActive
          : styles.inputRadioContainer,
        props.disabled ? styles.disable : ``,
      ]}
      htmlFor={props.id}
    >
      {props.children}
      <input
        css={styles.inputRadioBase}
        className="radioInput"
        type="radio"
        id={props.id}
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <span css={styles.inputRadioLabel} className="checkmark"></span>
    </label>
  );
}
