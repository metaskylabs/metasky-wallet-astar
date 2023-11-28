import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import { textTruncate } from '@utils/helper';
import Link from 'next/link';
import * as styles from './styles';

export default function SignatureRequestSheet(props: {
  onApprove: () => void;
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
        <div css={styles.header}>Signature Request</div>

        <div css={styles.logoConatiner}>
          <img
            src={AssetsImg.i_collectionDefault.src}
            alt=""
            css={styles.logoImg}
          />
        </div>
        <div css={styles.title}> {props.name}</div>
        <div css={styles.subTitle}>
          <Link href={props.url ? props.url : `#`}>{props.url}</Link>
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
              <Link href={props.url ? props.url : `#`}>{props.url}</Link>
            </span>
          </li>
        </ul>

        {/* Terms block */}
        <p css={styles.descriptionText}>{props.message}</p>
      </ButtonLayout>
    </div>
  );
}
