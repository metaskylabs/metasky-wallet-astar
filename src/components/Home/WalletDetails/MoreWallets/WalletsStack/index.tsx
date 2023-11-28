import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { css } from '@emotion/react';
import { colors } from '@styles/shared';

const WalletsStack: FC = () => {
  return (
    <div css={styles.container}>
      <div css={[css({ background: colors.Light_Blue }), styles.imgWrapper]}>
        <img
          height={`100%`}
          width={`100%`}
          src={AssetsImg.ic_metaskySoloIcon.src}
        />
      </div>
      <div css={[styles.overlap, styles.imgWrapper]}>
        <img
          height={`100%`}
          width={`100%`}
          src={AssetsImg.ic_metamaskLogo.src}
        />
      </div>
    </div>
  );
};

export default WalletsStack;
