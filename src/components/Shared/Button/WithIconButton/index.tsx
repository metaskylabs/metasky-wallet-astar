import { mixins } from '@styles/shared';
import Image from 'next/image';
import { FC } from 'react';
import * as styles from './styles';

interface WithIconProps {
  icon: string;
  text: string;
  onClick?: () => void;
}

const WithIcon: FC<WithIconProps> = ({ icon, text, onClick }) => {
  return (
    <div
      onClick={onClick}
      css={[styles.buttonTransfer, mixins.flexAlignJustifiedCenter]}
    >
      <img src={icon} alt="Transfer" />
      <span css={styles.buttonText}>{text}</span>
    </div>
  );
};

export default WithIcon;
