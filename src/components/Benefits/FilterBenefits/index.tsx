import { mixins } from '@styles/shared';
import { FC, useState } from 'react';
import * as styles from './styles';

interface FilterBenefitsProps {
  name: string;
  icon: string;
  activeIcon: string;
  key?: number;
  setSelectedPreffs: any;
  selectedPreffs?: any;
}

const FilterBenefits: FC<FilterBenefitsProps> = ({
  name,
  icon,
  activeIcon,
  key,
  setSelectedPreffs,
  selectedPreffs,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(false);

  const handleActiveFilter = () => {
    setSelectedFilter(true);
    setSelectedPreffs([...selectedPreffs, name]);
  };

  const handleRemoveFilter = () => {
    setSelectedFilter(false);
    const removeStyle = selectedPreffs?.filter((data: string) => data !== name);
    setSelectedPreffs(removeStyle);
  };

  return (
    <div
      onClick={() =>
        selectedFilter ? handleRemoveFilter() : handleActiveFilter()
      }
      key={key}
      css={[
        styles.benefitsFilter,
        mixins.flexAlignJustifiedCenter,
        selectedFilter && styles.benefitsSelectedFilter,
      ]}
    >
      <div css={styles.benefitsFilterIcon}>
        {selectedFilter ? (
          <img
            css={[mixins.flex, styles.benefitsIcon]}
            src={activeIcon}
            alt={name}
          />
        ) : (
          <img css={[mixins.flex, styles.benefitsIcon]} src={icon} alt={name} />
        )}
      </div>
      <span
        css={[
          styles.benefitsFilterTitle,
          selectedFilter && styles.benefitsSelectedFilterText,
        ]}
      >
        {name}
      </span>
    </div>
  );
};

export default FilterBenefits;
