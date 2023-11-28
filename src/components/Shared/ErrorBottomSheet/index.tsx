import AssetsImg from '@public/images';
import React from 'react';
import PrimaryButton from '../Button/PrimaryButton';
import * as styles from './styles';

export default function ErrorBottomSheet(props: {
  img?: string | React.ReactNode;
  title: string;
  description: React.ReactNode;
  hasAction?: boolean;
  buttonText?: string;
  onActionClick?: () => void;
}) {
  return (
    <div css={styles.container}>
      {props.img && typeof props.img !== `string` ? (
        props.img
      ) : (
        <img src={props.img || AssetsImg.i_not_owned.src} css={styles.img} />
      )}
      <span css={styles.title}>{props.title}</span>
      <span css={styles.description}>{props.description}</span>
      {props.hasAction && (
        <PrimaryButton
          onClick={props.onActionClick}
          addStyles={styles.actionButton}
        >
          {props.buttonText}
        </PrimaryButton>
      )}
    </div>
  );
}
