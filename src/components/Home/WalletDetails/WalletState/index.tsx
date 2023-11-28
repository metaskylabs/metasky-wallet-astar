import { FC } from 'react';
import * as styles from './styles';
import { ConnectionState } from '@constants/wallet';
import { Fragment } from 'preact';
import { colors, mixins, utils } from '@styles/shared';
import { css, SerializedStyles } from '@emotion/react';

interface ConnectionStateProps {
  state: ConnectionState;
  addStyles?: SerializedStyles;
}

export const ConnectionIcon: FC<ConnectionStateProps> = ({
  state,
  addStyles,
}) => {
  return (
    <div
      css={[
        styles.outerDiv,
        state === ConnectionState.DISCONNECTED &&
          css({
            border: `${utils.remConverter(1.25)} solid ${colors.Tertiary_Red}`,
          }),
        addStyles,
      ]}
    >
      <div
        css={[
          styles.innerDiv,
          state === ConnectionState.DISCONNECTED &&
            css({
              backgroundColor: colors.Tertiary_Red,
            }),
        ]}
      />
    </div>
  );
};

const WalletState: FC<ConnectionStateProps> = ({ state }) => {
  return (
    <Fragment>
      {state === ConnectionState.CONNECTED ? (
        <div css={[mixins.flexAlignCenter, styles.connectedState]}>
          <span css={styles.stateIcon}>
            <ConnectionIcon state={state} />
          </span>
          <span>Connected</span>
        </div>
      ) : (
        <div css={[mixins.flexAlignCenter, styles.disconnectedState]}>
          <span css={styles.stateIcon}>
            <ConnectionIcon state={state} />
          </span>
          <span>Disconnected</span>
        </div>
      )}
    </Fragment>
  );
};

export default WalletState;
