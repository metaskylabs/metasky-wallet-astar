import * as styles from './styles';
import { FC, Fragment } from 'react';
import Image from 'next/image';
import AssetsImg from '@public/images';

const AddWallet: FC = () => {
  return (
    <Fragment>
      <div css={styles.bottomSheetContainer}>
        <div>
          <div css={styles.titleContainer}>
            <div css={styles.imgContainer}>
              <img src={AssetsImg.ic_wallet.src} alt="wlalet icon" />
            </div>
            <span css={styles.title}>Connect Another Wallet</span>
          </div>
          <div css={styles.codeContainer}></div>
          <p css={styles.subtitle}>External Wallet Connect</p>
          <div css={styles.description}>
            <p> Integrate an existing external wallet to SkyClub.</p>
            <p>
              Open <a css={styles.link}>www.metasky.com/bridge</a> on your
              desktop browser and connect the wallet stored on your browser.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddWallet;
