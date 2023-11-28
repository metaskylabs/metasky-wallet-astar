import React from 'react';
import { PrimaryButton } from '@components/Shared';
import * as styles from './styles';

export default function SukuWhatsappSheet(props: {
  imageUrl: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div css={styles.container}>
      <img css={styles.image} src={props.imageUrl} />
      <span css={styles.title}>Access to Suku&apos;s WhatsApp Fam</span>
      <PrimaryButton onClick={props.onClick}>{props.buttonText}</PrimaryButton>
    </div>
  );
}
