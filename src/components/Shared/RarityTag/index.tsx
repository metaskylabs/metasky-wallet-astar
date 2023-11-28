import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { tagBackground } from '@utils/helper';

interface RarityTagProps {
  rarity: number;
}

const RarityTag: FC<RarityTagProps> = ({ rarity }) => {
  return (
    <div
      css={[{ background: tagBackground(rarity) }, styles.purchaseRankingChip]}
    >
      <img src={AssetsImg.ic_rarity_diamond.src} />
      <span css={[styles.purchaseRankingText, mixins.flexAlignCenter]}>
        Rarity Ranking: {`#${rarity}`}
      </span>
    </div>
  );
};

export default RarityTag;
