import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { useOutsideClick } from '@utils/helper';
import React, { FC, Fragment, useState } from 'react';
import * as styles from './styles';

export interface SortData {
  key: string;
  value: 'DESC' | 'ASC';
  name: string;
}

const SortConfig: SortData[] = [
  {
    key: `rarityrank`,
    value: `DESC`,
    name: `Rarity: High to Low`,
  },
  {
    key: `rarityrank`,
    value: `ASC`,
    name: `Rarity: Low to High`,
  },
  {
    key: `price`,
    value: `DESC`,
    name: `Price: High to Low`,
  },
  {
    key: `price`,
    value: `ASC`,
    name: `Price: Low to High`,
  },
  {
    key: `created_at`,
    value: `DESC`,
    name: `Listing Updated Time`,
  },
];

interface sortButtonProps {
  onClick: (data: SortData) => void;
}

const SortButton: FC<sortButtonProps> = ({ onClick }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [sortData, setSortData] = useState<SortData[]>([]);
  const ref = useOutsideClick(() => setShowMenu(false));

  const handleSort = (data: SortData) => {
    const sortData = [];
    onClick(data);
    sortData.push(data);
    setSortData(sortData);
  };

  return (
    <Fragment>
      <section ref={ref} css={mixins.positionRelative}>
        <div css={styles.sortButton} onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? (
            <img src={AssetsImg.ic_closeGrey.src} />
          ) : (
            <img src={AssetsImg.ic_sort.src} />
          )}
          {sortData?.length > 0 && <div css={styles.sortIconIndicator} />}
        </div>
        {showMenu && (
          <section css={[styles.filterContainer]}>
            <div css={styles.sortIcon}>
              <img src={AssetsImg.ic_hsort.src} />
              <span css={styles.sortByText}>Sort By</span>
            </div>
            {SortConfig.map((sort, index) => (
              <React.Fragment key={index.toString()}>
                <div
                  css={[
                    styles.sortItem,
                    sortData.find(
                      (s) => s.key === sort.key && s.value === sort.value,
                    )
                      ? styles.sortItemSelected
                      : ``,
                  ]}
                  onClick={() => {
                    handleSort(sort);
                    setShowMenu(false);
                  }}
                >
                  {sort.name}
                </div>
                {index < SortConfig.length - 1 ? (
                  <div css={styles.divider} />
                ) : null}
              </React.Fragment>
            ))}
          </section>
        )}
      </section>
    </Fragment>
  );
};

export default SortButton;
