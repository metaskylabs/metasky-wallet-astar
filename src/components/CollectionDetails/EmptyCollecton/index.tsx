import AssetsImg from '@public/images';
import { mixins, utils } from '@styles/shared';
import { FC } from 'react';
import * as styles from './styles';

interface EmptyCollectionProps {
  title: string;
  description: string;
}

const EmptyCollection: FC<EmptyCollectionProps> = ({ title, description }) => {
  return (
    <section css={[mixins.flexAlignJustifiedCenter, mixins.flexColumn]}>
      <div css={utils.mb(20)}>
        <img src={AssetsImg.ic_nftEmpty.src} alt="" width="152" height="152" />
      </div>
      <h2 css={styles.emptyCollectionHeader}>{title}</h2>
      <p css={styles.emptyCollectionDescription}>{description}</p>
    </section>
  );
};

export default EmptyCollection;
