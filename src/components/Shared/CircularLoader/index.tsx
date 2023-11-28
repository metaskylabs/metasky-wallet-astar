import { FC } from 'react';
import * as styles from './styles';
//TODO:need to make as per design
const CircularLoader: FC = () => {
  return (
    <div css={styles.loader}>
      <span></span>
    </div>
  );
};

export default CircularLoader;
