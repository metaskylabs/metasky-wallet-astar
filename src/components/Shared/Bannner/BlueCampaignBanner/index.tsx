import AssetsImg from '@public/images';
import useLinkHandler from '@utils/hooks/useLinkHandler';
import React from 'react';
import * as styles from './styles';

export default function BlueCampaignBanner(props: {
  title: string;
  type: string;
  link: string;
  target?: string;
}) {
  const { linkHandler } = useLinkHandler();
  return (
    <div
      css={styles.container}
      onClick={() => linkHandler(props.type, props.link, props.target)}
    >
      {/* <img css={styles.icon} src={AssetsImg.ic_white_cup.src} /> */}
      {props.title}
    </div>
  );
}
