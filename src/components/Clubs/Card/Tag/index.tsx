import { FC } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';

interface ClubCardTagProps {
  text: string;
}

const ClubCardTag: FC<ClubCardTagProps> = ({ text }) => {
  return (
    <div css={mixins.flexAlignJustifiedCenter}>
      <span css={[styles.content]}>{text}</span>
    </div>
  );
};

export default ClubCardTag;
