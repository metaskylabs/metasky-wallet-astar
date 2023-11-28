import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import * as styles from './style';

export default function SwitchChainSheet() {
  return (
    <div css={styles.container}>
      <ButtonLayout buttonComponent={<></>}>
        <div css={styles.header}>Switch Network</div>
        <p css={styles.subTitle}>
          Unable to automatically switch the current chain, as requested by a
          connected Dapp. To manually switch the current chain, please
          disconnect and reconnect using the correct chain.
        </p>
      </ButtonLayout>
    </div>
  );
}
