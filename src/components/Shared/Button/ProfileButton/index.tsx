import { FC } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';

interface ProfileButtonProps {
  addStyles?: SerializedStyles;
  image: string;
  onClick?: () => void;
  handleLogin?: () => void;
}

const ProfileButton: FC<ProfileButtonProps> = ({
  addStyles,
  image,
  onClick,
  handleLogin,
}) => {
  const unreadMessagesCount = useSelector<StoreState>(
    (state) => state.intercom?.unReadMessagesCount,
  );
  return (
    <>
      <div
        css={[
          styles.headerProfileContainer,
          mixins.flexAlignJustifiedCenter,
          { ...addStyles },
        ]}
        onClick={handleLogin ? handleLogin : onClick}
      >
        <img src={image} alt="Picture of the author" css={styles.imgSize} />
      </div>
      {(unreadMessagesCount as number) > 0 && (
        <div css={[styles.unreadCountWrapper, mixins.flexAlignJustifiedCenter]}>
          <p css={styles.unreadCountMessages}>
            {unreadMessagesCount as string}
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
