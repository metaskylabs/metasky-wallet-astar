import { FC } from 'react';
import * as styles from './styles';

interface LogoHolderProps {
  image: string;
}
const LogoHolder: FC<LogoHolderProps> = ({ image }) => {
  return (
    <div css={styles.imgContainer}>
      <img css={styles.logo} src={image} alt={`logo`} />
    </div>
  );
};
export default LogoHolder;
