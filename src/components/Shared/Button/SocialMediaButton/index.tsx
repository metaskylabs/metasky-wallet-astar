import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';
import * as styles from './styles';

interface SocialMediaProps {
  icon: any;
  name: string;
  notification?: boolean;
  onClick?: () => void;
  addStyles?: SerializedStyles;
}

const SocialMediaButton: FC<SocialMediaProps> = ({
  icon,
  name,
  notification,
  onClick,
  addStyles,
}) => {
  return (
    <div css={styles.linkWrapper} onClick={onClick}>
      <button css={[styles.linksContainer, { ...addStyles }]}>
        <img src={icon.src} alt={name} />
      </button>
      {notification && <div css={styles.linksNotification}></div>}
    </div>
  );
};

export default SocialMediaButton;
