import CurrencySelect from '@components/CurrencySelect';
import { SerializedStyles } from '@emotion/react';
import { mixins } from '@styles/shared';
import React, { ChangeEvent, FC, Fragment } from 'react';
import * as styles from './styles';

interface InputAmountProps {
  label?: string;
  placeHolder: string;
  description?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputContainerStyles?: SerializedStyles;
  value: string;
  currency?: string;
}

const InputAmount: FC<InputAmountProps> = ({
  label,
  placeHolder,
  description,
  onChange,
  inputContainerStyles,
  value,
  currency,
}) => {
  const blockInvalidChar = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isDotPresent = value?.indexOf(`.`) > -1;
    const isDotInput = e.key === `.`;

    // I have to avoid the dot:
    if (isDotPresent && isDotInput) {
      // avoid the effect of the event (so the injection of dot into the text)
      e.preventDefault();
    }
    if ([`e`, `E`, `+`, `-`, ` `].includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <Fragment>
      <div css={styles.label}>{label}</div>
      <div css={[styles.inputContainer, inputContainerStyles]}>
        <div css={styles.amountContainer}>
          <div css={[styles.currencyContainer, styles.input, mixins.flex]}>
            <CurrencySelect currency={currency} />
          </div>
          <input
            type="text"
            css={styles.input}
            placeholder={placeHolder}
            onChange={onChange}
            onKeyDown={(e) => blockInvalidChar(e)}
            value={value || ``}
          />
        </div>
        {description && <div css={styles.description}>{description}</div>}
      </div>
    </Fragment>
  );
};

export default InputAmount;
