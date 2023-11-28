import React, { ReactText, useState } from 'react';
import { css } from '@emotion/react';
import AssetsImg from 'public/images';
import {
  selectButton,
  optionContainer,
  optionItem,
  buttonArrowOpen,
  buttonArrowIcon,
  optionItemContents,
  searchInput,
  searchContainer,
  searchIcon,
  searchIconContainer,
} from './styles';
import { mixins, typography, utils } from '@styles/shared';
import { CountryCodePayload } from '@typings/api/auth';

export interface CountryCodeSelectProps {
  value?: CountryCodePayload;
  countryList?: CountryCodePayload[];
  onChange: (value: CountryCodePayload) => void;
}

interface OptionProps {
  data: CountryCodePayload;
  isSelected?: boolean;
}
const OptionItem: React.FC<OptionProps> = ({ data }) => {
  return (
    <>
      <div css={mixins.flexAlignCenter}>
        <span css={[utils.mr(10)]}> {data.flag}</span>
        <span css={optionItemContents}>{data.name}</span>
      </div>
      <div
        css={[
          optionItemContents,
          mixins.flexAlignCenter,
          mixins.flexJustifiedEnd,
        ]}
      >
        <span>+ {data.isd_code}</span>
      </div>
    </>
  );
};

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  onChange,
  value,
  countryList,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<ReactText>(``);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        css={[selectButton, mixins.flexAlignCenterJustifiedBetween]}
      >
        <span css={[utils.mr(8)]}> {value?.flag}</span>
        <div css={mixins.flexAlignJustifiedCenter}>
          <span>+{value?.isd_code}</span>
          <img
            src={AssetsImg.ic_arrowDownDark.src}
            alt="arrow"
            css={[utils.ml(4), isOpen && buttonArrowOpen, buttonArrowIcon]}
          />
        </div>
      </div>
      {isOpen && (
        <ul css={optionContainer}>
          <li
            css={[
              utils.mb(8),
              css({
                position: `relative`,
                top: 0,
              }),
            ]}
          >
            <div css={searchContainer}>
              <input
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                css={[searchInput, mixins.placeholderTextstyle]}
              />
              <div css={searchIconContainer}>
                <img
                  css={searchIcon}
                  src={AssetsImg.ic_searchGrey.src}
                  alt={`search`}
                />
              </div>
            </div>
          </li>
          {countryList &&
            countryList
              .filter((data) => {
                return (
                  data.name
                    .toLowerCase()
                    .indexOf((search as string).toLowerCase()) > -1
                );
              })
              .map((data) => {
                return (
                  <li
                    key={data.isd_code}
                    css={[
                      optionItem,
                      mixins.flexAlignCenter,
                      mixins.flexJustifiedBetween,
                      typography.T_14_Regular,
                    ]}
                    onClick={() => {
                      onChange(data);
                      setIsOpen(false);
                    }}
                  >
                    <OptionItem data={data} />
                  </li>
                );
              })}
        </ul>
      )}
    </>
  );
};

export default CountryCodeSelect;
