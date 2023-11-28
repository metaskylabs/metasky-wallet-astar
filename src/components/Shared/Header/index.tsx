import * as styles from './styles';
import { FC } from 'react';
import BackButton from '../Button/BackButton';
import AssetsImg from '@public/images';
import { utils } from '@styles/shared';
import { divide } from 'lodash';
import SortButton, { SortData } from '../Button/SortButton';
import NOOB from '@constants/noob';
interface HeaderProps {
  title?: string;
  isBackEnabled?: boolean;
  rightActionTitle?: string;
  actionClickHandler?: () => void;
  customBack?: () => void;
  filter?: boolean;
  sort?: boolean;
  fetchListings?: (pageNumber: number, sort: SortData) => void;
}
const Header: FC<HeaderProps> = ({
  title,
  isBackEnabled,
  rightActionTitle,
  actionClickHandler,
  customBack,
  children,
  filter,
  sort,
  fetchListings,
}) => {
  return (
    <div css={styles.headerContainer}>
      <div css={styles.buttonContainer}>
        {isBackEnabled && <BackButton customBack={customBack} />}
      </div>

      {title === undefined ? (
        <img
          alt="logo"
          src={AssetsImg.i_earthBuddyLogo.src}
          css={[utils.mt(8), utils.width(100)]}
        />
      ) : (
        <h1 css={styles.titleContainer}>{title}</h1>
      )}

      <div css={styles.actionContainer}>
        {rightActionTitle && (
          <button css={styles.actionContainer} onClick={actionClickHandler}>
            {rightActionTitle}
          </button>
        )}
        {children && children}
        {filter && (
          <div css={styles.filterButton} onClick={() => NOOB}>
            <img src={AssetsImg.ic_funnel.src} />
          </div>
        )}
        {sort && (
          <SortButton
            onClick={(value) => fetchListings && fetchListings(1, value)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
