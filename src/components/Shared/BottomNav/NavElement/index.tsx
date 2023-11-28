import { FC } from 'react';
import * as styles from './styles';
import { css } from '@emotion/react';
import { colors } from '@styles/shared';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { getIcon } from '@components/Shared/BottomNav/helper';

interface NavElementProps {
  icon: NavTabs;
  name: string;
  isActive: boolean;
  onClick: () => void;
  isNotification?: boolean;
}

const NavElement: FC<NavElementProps> = ({
  icon,
  name,
  isActive,
  onClick,
  isNotification,
}) => {
  return (
    <div css={styles.elementContainer} onClick={onClick}>
      {isActive && <div css={styles.activeBar}></div>}
      {isNotification && <div css={styles.notification}></div>}
      <div css={styles.iconContainer}>{getIcon(icon, isActive)}</div>
      <span
        css={[
          styles.elementName,
          isActive && css({ color: colors.Primary_Blue }),
        ]}
      >
        {name}
      </span>
    </div>
  );
};

export default NavElement;
