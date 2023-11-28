import AssetsImg from '@public/images';
import * as styles from './styles';
import React, { FC } from 'react';
import { colors, mixins, typography } from '@styles/shared';
import { onCopy, textTruncate } from '@utils/helper';

interface copyInviteProps {
  inviteLink: string;
}

const CopyInvite: FC<copyInviteProps> = ({ inviteLink }) => {
  return (
    <div css={[styles.container, mixins.flexAlignCenterJustifiedBetween]}>
      <p css={styles.text}>{textTruncate(inviteLink, 20, 10)}</p>
      <div
        css={mixins.cursorPointer}
        onClick={() =>
          onCopy(
            `${inviteLink}`,
            `Link copied! Share it with your friends to start earning. `,
          )
        }
      >
        <img src={AssetsImg.ic_copy_blue.src} alt="" width="20" height="20" />
      </div>
    </div>
  );
};

export default CopyInvite;
