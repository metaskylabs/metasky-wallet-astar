import React from 'react';
import { PrimaryButton } from '../../Shared';
import AssetsImg from '@public/images';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';

function Row(props: {
  children: React.ReactNode;
  addedStyles?: SerializedStyles;
}) {
  return (
    <div css={[styles.rowContainer, props.addedStyles]}>{props.children}</div>
  );
}

type CampaignTicketProps = {
  name: string;
  imageUrl: string;
  offerings: {
    offered: boolean;
    title: string;
  }[];
  buttonText: string;
  onClick: () => void;
};

function CampaignTicket(props: CampaignTicketProps) {
  return (
    <div css={styles.ticketContainer}>
      <div css={styles.rightCut} />
      <div css={styles.leftCut} />
      <img src={props.imageUrl} css={styles.ticketImg} />
      <div css={styles.ticketName}>{props.name}</div>
      <div css={styles.border} />
      <div css={styles.ticketBenefitsList}>
        {props.offerings.map((item, index) => (
          <div css={styles.ticketBenefitItem} key={index}>
            <img
              src={
                item.offered
                  ? AssetsImg.ic_green_tick.src
                  : AssetsImg.ic_red_cross.src
              }
              css={styles.ticketBenefitItemIcon}
            />
            <span css={styles.ticketBenefitItemText}>{item.title}</span>
          </div>
        ))}
      </div>
      <PrimaryButton addStyles={styles.button} onClick={props.onClick}>
        <p>{props.buttonText}</p>
      </PrimaryButton>
    </div>
  );
}

export default function CampaignTickets(props: {
  tickets: CampaignTicketProps[];
}) {
  return (
    <div css={styles.ticketList}>
      {props.tickets.map((item, index) => (
        <Row key={index}>
          <CampaignTicket {...item} />
        </Row>
      ))}
    </div>
  );
}
