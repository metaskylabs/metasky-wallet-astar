import { FC } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';

interface CircularWithIconProps {
  icon: string;
  onClick?: () => void;
}

const CircularWithIcon: FC<CircularWithIconProps> = ({ icon, onClick }) => {
  return (
    <>
      <div onClick={onClick} css={styles.headerProfileContainer}>
        <img src={icon} alt="Transfer" css={styles.icon} />
      </div>
    </>
  );
};

export default CircularWithIcon;
