import { Header } from '@components/Shared';
import AssetsImg from '@public/images';
import * as styles from '@styles/Modules/closeThisTab';
import { Fragment } from 'preact';

export default function CloseThisTab() {
  return (
    <Fragment>
      <Header isBackEnabled={false} title={`Payment`} />
      <div css={styles.container}>
        <img src={AssetsImg.i_payment.src} css={styles.imageContainer} />
        <p css={styles.status}>Your Order is in Progress</p>
        <p css={styles.description}>
          Please close this tab and track your current transaction on Metasky
          wallet.
        </p>
      </div>
    </Fragment>
  );
}
