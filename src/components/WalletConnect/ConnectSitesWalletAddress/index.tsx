import * as styles from './styles';
import AssetsImg from '@public/images';
import { SerializedStyles } from '@emotion/react';

interface ConnectedSitesProps {
  name: string;
  url?: string;
  logo?: string;
  onDisconnect: () => Promise<void>;
  addStyles?: SerializedStyles;
}
const ConnectSitesWalletAddress = (props: ConnectedSitesProps) => {
  return (
    <div css={[styles.container, props.addStyles]}>
      <label css={styles.label}>Connected Sites</label>
      <div css={styles.siteContainer}>
        <div css={styles.siteList}>
          <img src={props.logo} css={styles.logoImage} />
          <img src={AssetsImg.ic_rightArrowGrey.src} css={styles.connector} />
          <img
            src={AssetsImg.ic_rightArrowGrey.src}
            css={styles.connectorTwo}
          />
          <img src={AssetsImg.ic_wallect_connect.src} css={styles.logoImage} />
        </div>
        <span css={styles.url}>{props.url}</span>
        <span css={styles.disconnectButton} onClick={props.onDisconnect}>
          Disconnect
        </span>
      </div>
    </div>
  );
};
export default ConnectSitesWalletAddress;
