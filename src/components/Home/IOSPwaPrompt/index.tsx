import { DividerLine } from '@components/Shared';
import AssetsImg from '@public/images';
import { mixins, utils } from '@styles/shared';
import { FC } from 'react';
import * as styles from './styles';

const IOSPwaPrompt: FC = () => {
  return (
    <section>
      <div css={mixins.flexAlignCenter}>
        <div css={styles.metaskyIconContainer}>
          <img src={AssetsImg.ic_metaskySoloIcon.src} alt="icon" />
        </div>
        <p css={styles.headerTitle}>Install Metasky</p>
      </div>
      <DividerLine addStyles={styles.dividerLine} />
      <p css={[styles.description, utils.mb(24)]}>
        Install Metasky app on your device to easily access it anytime.
      </p>
      <article css={[mixins.flexAlignCenter, utils.mb(11)]}>
        <p css={[styles.description, utils.mr(5)]}>1. Tap on</p>
        <img src={AssetsImg.ic_shareIos.src} alt="share" />
      </article>
      <article css={mixins.flexAlignCenter}>
        <p css={[styles.description, utils.mr(5)]}>2. Select </p>
        <img src={AssetsImg.ic_addHomeScreen.src} alt="share" />
        <p css={styles.addToHomeDesc}>Add to Home Screen</p>
      </article>
    </section>
  );
};

export default IOSPwaPrompt;
