import * as styles from './styles';
import { colors, mixins, typography, utils } from '@styles/shared';
import { DividerLine } from '@components/Shared';
import { REFER_HOWITWORKS } from '@constants/refer';
import { useTranslate } from '@utils/useTranslate';

const HowItWorks = () => {
  const { translate } = useTranslate();
  return (
    <section css={[styles.container, utils.ml(16), utils.mr(16), utils.mb(24)]}>
      <p css={styles.titleText}>{translate(`HOW_IT_WORKS`)}</p>
      <DividerLine addStyles={styles.divider} />
      <article css={[utils.mb(12)]}>
        {REFER_HOWITWORKS.map((ref, i) => (
          <div key={i} css={[mixins.flexAlignStart, styles.referContainer]}>
            <article css={[styles.stepsContainer]}>
              <article css={[styles.steps, mixins.flexAlignJustifiedCenter]}>
                <div css={styles.stepsIcon}>
                  <p>{ref.id}</p>
                </div>
              </article>
            </article>
            <article>
              <p css={styles.stepTitleText}>{translate(ref.title)}</p>
              <span css={styles.stepDescription}>{translate(ref.content)}</span>
            </article>
          </div>
        ))}
      </article>
    </section>
  );
};

export default HowItWorks;
