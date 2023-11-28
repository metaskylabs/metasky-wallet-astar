import Chip from '@components/Filter/Chip';
import { BackButton, PrimaryButton, SecondaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import * as Constants from '@utils/constants';
import { FC, Fragment, useEffect, useState } from 'react';

const filterOptions = [
  {
    name: `Background`,
    filterId: `BG`,
    options: [
      {
        name: `Options 1`,
      },
      {
        name: `Options 2`,
      },
      {
        name: `Options 3`,
      },
      {
        name: `Options 4`,
      },
    ],
  },
  {
    name: `Face Gene`,
    filterId: `FG`,
    options: [
      {
        name: `Options 1`,
      },
      {
        name: `Options 2`,
      },
      {
        name: `Options 3`,
      },
    ],
  },
];

const Filter: FC = () => {
  const [openDropDown, setOpenDropDown] = useState([] as any);
  const [result, setResult] = useState([] as any);
  const [propertiesFilter, setPropertiesFilter] = useState(new Map() as any);

  const handleAccordion = (id: number) => {
    const shownState = openDropDown.slice();
    const idx = shownState.indexOf(id);

    if (idx >= 0) {
      shownState.splice(idx, 1);
      setOpenDropDown(shownState);
    } else {
      shownState.push(id);
      setOpenDropDown(shownState);
    }
  };

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const checked = e.target.checked;
    setPropertiesFilter(new Map(propertiesFilter.set(item, checked)));
  };

  useEffect(() => {
    if (propertiesFilter.size > 0) {
      const dem = Array.from(propertiesFilter, ([name, value]) => ({
        name,
        value,
      }));
      setResult(dem);
    }
    return;
  }, [propertiesFilter]);

  return (
    <div css={[styles.filterWrapper, mixins.flexColumn]}>
      <div css={[styles.nftHeader, mixins.flexAlignCenter]}>
        <BackButton />
        <span css={styles.nftTitle}>{Constants.filter.title}</span>
      </div>
      <span css={styles.filterSortBy}>{Constants.filter.sortBy}</span>
      <div css={[styles.filterSortByContainer, mixins.flexAlignCenter]}>
        <Chip
          icon={AssetsImg.ic_ascending.src}
          content={Constants.filter.ascending}
          propertiesIcon={``}
        />
        <Chip
          icon={AssetsImg.ic_descending.src}
          content={Constants.filter.descending}
          addStyles={styles.chipWrapperDesc}
          textStyle={styles.chipTextDesc}
          propertiesIcon={``}
        />
      </div>
      <span css={styles.filterSortBy}>{Constants.nftDetails.properties}</span>
      <div css={[styles.filterSortByContainer, mixins.flexAlignCenter]}>
        {result?.map(
          (result: { name: string; value: boolean }, idx: number) =>
            result.value && (
              <Chip
                key={idx}
                propertiesIcon={AssetsImg.ic_closeWhite.src}
                properties={result.name}
                addStyles={styles.chipWrapperProperties}
                propertiesIconStyle={styles.chipPropertiesIcon}
              />
            ),
        )}
      </div>
      <div css={styles.filterAccordion}>
        {filterOptions?.map((option, idx) => (
          <Fragment key={idx}>
            <div css={[styles.filterAccordionContainer, mixins.flexColumn]}>
              <div
                css={[
                  styles.filterAccordionPanel,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
                onClick={() => handleAccordion(idx)}
              >
                <h4 css={styles.filterAccordionTitle}>{option.name}</h4>
                <div css={styles.filterAccordionIcon}>
                  {!openDropDown.includes(idx) ? (
                    <img
                      src={AssetsImg.ic_arrowDownBlack.src}
                      alt={Constants.filter.background}
                    />
                  ) : (
                    <img
                      src={AssetsImg.ic_arrowUpBlack.src}
                      alt={Constants.filter.background}
                    />
                  )}
                </div>
              </div>
              <hr css={styles.divider} />
              {openDropDown.includes(idx) &&
                option?.options?.map((childOpt, index) => (
                  <Fragment key={index}>
                    <div
                      css={[
                        mixins.flexAlignCenter,
                        styles.filterAccordionOptions,
                      ]}
                    >
                      <input
                        type={Constants.InputType.checkbox}
                        name={`${option.filterId}: ${childOpt.name}`}
                        checked={propertiesFilter.get(
                          `${option.filterId}: ${childOpt.name}`,
                        )}
                        onChange={handleOption}
                        id={`${option.filterId}: ${childOpt.name}`}
                        className="inputCheckbox"
                      />
                      <div className="filterCheckbox"></div>
                      <label
                        css={[styles.filterCheckboxLabel]}
                        htmlFor={`${option.filterId}: ${childOpt.name}`}
                      >
                        {childOpt.name}
                      </label>
                    </div>
                    <hr css={styles.divider} />
                  </Fragment>
                ))}
            </div>
          </Fragment>
        ))}
      </div>
      <div css={[styles.filterBottomWrapper, mixins.flexAlignJustifiedCenter]}>
        <SecondaryButton addStyles={styles.filterReset}>RESET</SecondaryButton>
        <PrimaryButton addStyles={styles.filterApply}>
          APPLY FILTER
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Filter;
