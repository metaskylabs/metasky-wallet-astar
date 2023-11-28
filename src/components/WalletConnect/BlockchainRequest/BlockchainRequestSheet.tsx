import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import * as styles from './styles';

export default function BlockchainRequestSheet(props: {
  onApprove: () => void;
  chainIcon: string;
  chainName: string;
  from: string;
  to: string;
  value: string;
  data: string;
}) {
  return (
    <div css={styles.container}>
      <ButtonLayout
        addStyles={styles.cta}
        buttonComponent={
          <>
            <PrimaryButton onClick={props.onApprove} addStyles={styles.cta}>
              CONFIRM
            </PrimaryButton>
          </>
        }
      >
        <div css={styles.header}>Blockchain Request</div>

        <h3 css={styles.title}>Blockchain Details</h3>
        <div css={styles.card}>
          <label css={styles.label}>Network</label>
          <p css={styles.value}>
            <img src={props.chainIcon} css={styles.networkIcon} />
            {props.chainName}
          </p>
        </div>

        <h3 css={styles.title}>Transaction Details</h3>
        <div css={styles.cardScroll}>
          <ul css={styles.listContainer}>
            <li css={styles.listItem}>
              <label css={styles.label}>From</label>
              <p css={styles.value}>{props.from}</p>
            </li>
            <li css={styles.listItem}>
              <label css={styles.label}>To</label>
              <p css={styles.value}>{props.to}</p>
            </li>
            <li css={styles.listItem}>
              <label css={styles.label}>Value</label>
              <p css={styles.value}>{props.value}</p>
            </li>
            <li css={styles.listItem}>
              <label css={styles.label}>Data</label>
              <p css={styles.value}>{props.data}</p>
            </li>
          </ul>
        </div>
      </ButtonLayout>
    </div>
  );
}
