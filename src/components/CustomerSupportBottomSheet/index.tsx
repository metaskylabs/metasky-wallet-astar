import AssetsImg from '@public/images';
import * as styles from './styles';

export default function CustomerSupport() {
  return (
    <div css={styles.supportContainer}>
      <img src={AssetsImg.i_support.src} width={`150px`} height={`150px`} />
      <p>
        Please write to us on{` `}
        <a href="mailto:support@metasky.ai">support@metasky.ai</a>
      </p>
    </div>
  );
}
