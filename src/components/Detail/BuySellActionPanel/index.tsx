import React from 'react';
import { PrimaryButton, SecondaryButton } from '@components/Shared';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { useTranslate } from '@utils/useTranslate';

interface Props {
  disableSell?: boolean;
  disableSend?: boolean;
  onSend: () => void;
  onSell: () => void;
}

const BuySellAction = (props: Props) => {
  const { translate } = useTranslate();
  return (
    <div css={[mixins.flexJustifiedBetween, styles.container]}>
      <div css={[styles.buttonContainer]}>
        <SecondaryButton
          addStyles={styles.secondaryButton}
          onClick={props.onSend}
          disabled={props.disableSend}
        >
          {translate(`SEND`)}
        </SecondaryButton>
      </div>
      <div css={styles.buttonContainer}>
        <PrimaryButton
          addStyles={styles.primaryButton}
          onClick={props.onSell}
          disabled={props.disableSell}
        >
          {translate(`SELL`).toUpperCase()}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default BuySellAction;
