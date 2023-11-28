import React from 'react';
import CurrencySelect from '@components/CurrencySelect';
import { InputBaseSecondary, InputBase } from '@components/Shared';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import { mixins } from '@styles/shared';
import { useTranslate } from '@utils/useTranslate';

export default function AmountInput(props: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
}) {
  const { translate } = useTranslate();
  return (
    <div css={styles.formGroup}>
      <div css={[styles.currency, styles.input, mixins.flex]}>
        <CurrencySelect />
      </div>
      <div css={styles.amount}>
        <InputBaseSecondary
          type={Constants.InputType.number}
          name="amount"
          placeholder={translate(`ENTER_AMOUNT`)}
          noSpecialCharacterCheck
          addStyles={styles.input}
          value={props.value}
          onChange={props.onChange}
        />
        {props.errors && <p css={styles.errorMessage}>{props.errors}</p>}
      </div>
    </div>
  );
}
