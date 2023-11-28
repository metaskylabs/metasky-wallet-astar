import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';

const DiscordAsset: FC = () => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.iconContainer}>
        <span css={styles.iconBg}>
          <img css={styles.iconSuccess} src={AssetsImg.ic_succes_93.src} />
        </span>
      </div>
      <div css={styles.titleContainer}>Discord Role Benefit</div>
      <div css={styles.descContainer}>
        Congratulations! You have been granted{` `}
        <span css={styles.bold}>OG Tanuki</span> role on Tanukiverse discord.
      </div>
    </div>
  );
};

export default DiscordAsset;
