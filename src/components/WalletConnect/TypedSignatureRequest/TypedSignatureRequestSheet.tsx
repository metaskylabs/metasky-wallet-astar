import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import { textTruncate } from '@utils/helper';
import * as styles from './styles';

export default function TypedSignatureRequestSheet(props: {
  onApprove: () => void;
  icon: string;
  name: string;
  url: string;
  address: string;
  message: string;
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
        <div css={styles.header}>Typed Data Request</div>

        <div css={styles.logoConatiner}>
          <img src={props.icon} alt="" css={styles.logoImg} />
        </div>
        <div css={styles.title}>{props.name}</div>
        <div css={styles.subTitle}>
          <a
            target={`_blank`}
            href={props.url ? props.url : `#`}
            rel="noreferrer"
          >
            {props.url}
          </a>
        </div>

        {/*Address info */}
        <ul css={styles.addressBox}>
          <li css={styles.listItem}>
            <span>Address</span>

            <span>{textTruncate(`${props.address}`, 5, 3)}</span>
          </li>
          <li css={styles.listItem}>
            <span>To</span>
            <span>
              <a
                target={`_blank`}
                href={props.url ? props.url : `#`}
                rel="noreferrer"
              >
                {props.url}
              </a>
            </span>
          </li>
        </ul>

        {/* Terms block */}
        <p css={styles.descriptionText}>{props.message}</p>
      </ButtonLayout>
    </div>
  );
}
