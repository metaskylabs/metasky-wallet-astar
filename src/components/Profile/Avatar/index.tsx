import * as styles from './styles';
import { FC } from 'react';
interface AvatarProps {
  avatarLink: string;
}

import React from 'react';

const Avatar: FC<AvatarProps> = ({ avatarLink }) => {
  // console.log(avatarLink);
  return (
    <div css={styles.avatarContainer}>
      <img
        src={avatarLink}
        alt="Picture of the user"
        css={styles.avatarImage}
      />
    </div>
  );
};

export default Avatar;
