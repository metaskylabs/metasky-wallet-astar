import { FC, Fragment } from 'react';
import * as styles from './styles';
import { MLottie } from '@components/Shared/';

const LottieLoader: FC = () => {
  return (
    <Fragment>
      <div css={styles.loaderPosition}>
        <div css={styles.loaderBackGround}></div>
        <div css={styles.loaderContainer}>
          <MLottie />
        </div>
      </div>
    </Fragment>
  );
};

export default LottieLoader;
