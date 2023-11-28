import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { Pages } from '@utils/navigation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import * as styles from './styles';

const EmptyTransition: FC = () => {
  const router = useRouter();
  return (
    <section css={[mixins.flexAlignJustifiedCenter, mixins.flexColumn]}>
      <img src={AssetsImg.ic_nftEmpty.src} alt="Empty Transaction" />
      <h2 css={styles.emptyTransactionHeader}>No Transactions found.</h2>
      <p css={styles.emptyTransactionDescription}>
        You have no transactions in this wallet.
      </p>
      <span
        css={styles.emptyTransactionLink}
        onClick={() => router.push(Pages.HOME)}
      >
        Buy NFTs / Tokens
      </span>
    </section>
  );
};

export default EmptyTransition;
