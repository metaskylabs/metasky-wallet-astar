import React, { Fragment, ReactText, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import AssetsImg from 'public/images';
import {
  buttonArrowIcon,
  buttonArrowOpen,
  iconLabel,
  inputFormLabel,
  optionContainer,
  optionItem,
  optionItemContents,
  searchContainer,
  searchIcon,
  searchIconContainer,
  searchInput,
  selectButton,
  selectedContainer,
  emptyIconContainer,
  optionItemContainer,
  inputFormImage,
  clamp,
  image,
} from './styles';
import { mixins, typography, utils } from '@styles/shared';
import { useOutsideClick } from '@utils/helper';
import { Video } from '@components/Shared';
import { WalletBalanceResponse } from '@typings/api/transfer';
import { errorMessage } from '@components/Shared/Input/InputBase/styles';
import { setTransferUUIDValue } from '@actions/tranferPayload';
import { useTranslate } from '@utils/useTranslate';
import { AssetType } from '@components/Transfer/TransferForm/TransferSendForm';

export interface WalletBalanceProps {
  icon?: string;
  iconName?: string;
  value?: WalletBalanceResponse;
  itemList?: WalletBalanceResponse[];
  onChange: (value: WalletBalanceResponse) => void;
  setQty: (value: string) => void;
  error: any;
  label?: string;
  assetType?: AssetType;
}

interface OptionProps {
  data: WalletBalanceResponse;
  isSelected?: boolean;
}
const OptionItem: React.FC<OptionProps> = ({ data }) => {
  return (
    <section css={[optionItemContainer, mixins.flexAlignCenter]}>
      {data.media_type === `image` ? (
        <img css={image} src={data.image} alt={data.name} />
      ) : (
        <Video addStyles={image} source={data.image} />
      )}
      <div css={[mixins.flexAlignCenterJustifiedBetween, optionItemContainer]}>
        <p css={optionItemContents}>{data.name}</p>
        <span css={[typography.T_20_Bold]}>
          {data.no_of_asset}
          <span css={[typography.T_12_Semibold, utils.mb(2)]}>{` QTY`}</span>
        </span>
      </div>
    </section>
  );
};

interface EmptyListProp {
  searchInput: ReactText;
}
const EmptyList: React.FC<EmptyListProp> = ({ searchInput }) => {
  return (
    <section
      css={[
        mixins.flexAlignJustifiedCenter,
        mixins.flexColumn,
        typography.T_16_Semibold,
      ]}
    >
      <div
        css={[
          mixins.flexAlignJustifiedCenter,
          utils.mt(40),
          utils.mb(40),
          emptyIconContainer,
        ]}
      >
        <img
          css={[utils.width(80)]}
          src={AssetsImg.ic_nftEmpty.src}
          alt="empty"
        />
      </div>
      No assets found {searchInput && ` for “${searchInput}”`}
    </section>
  );
};

const WalletBalanceSelect: React.FC<WalletBalanceProps> = ({
  onChange,
  value,
  itemList,
  setQty,
  error,
  icon,
  iconName,
  label,
  assetType,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<ReactText>(``);
  const [searchList, setSearchList] = useState<WalletBalanceResponse[]>();
  const { translate } = useTranslate();
  // const ref = useOutsideClick(() => setIsOpen(false));
  //FIXME

  const ref = null;

  useEffect(() => {
    if (itemList) {
      if (search === ``) {
        setSearchList(itemList);
      } else {
        const searchResponse = itemList.filter((data) => {
          if (data.name) {
            return (
              data?.name
                .toLowerCase()
                .indexOf((search as string).toLowerCase()) > -1
            );
          }
        });
        setSearchList(searchResponse);
      }
    } else {
      setSearchList(itemList);
    }
  }, [search, itemList]);

  return (
    <div ref={ref}>
      <div css={selectButton}>
        <div css={[inputFormLabel, mixins.flexAlignCenter]}>
          {icon && (
            <div css={[inputFormImage, mixins.flex]}>
              <img src={icon} alt={iconName} />
            </div>
          )}
          <label css={iconLabel}>{label}</label>
        </div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          css={[selectedContainer, mixins.flexAlignCenterJustifiedBetween]}
        >
          <span css={[clamp]}>{value?.name}</span>
          <img
            src={AssetsImg.ic_arrowDown.src}
            alt="arrow"
            css={[
              utils.ml(4),
              utils.mr(4),
              isOpen && buttonArrowOpen,
              buttonArrowIcon,
            ]}
          />
        </div>
        {error && <p css={errorMessage}>{error}</p>}
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
                placeholder={`Search for an ${
                  assetType === 0 ? `NFT` : `COIN`
                }`}
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
          {searchList?.length ? (
            searchList.map((data) => {
              return (
                <li
                  key={data.asset_uuid}
                  css={[
                    optionItem,
                    mixins.flexAlignCenter,
                    mixins.flexJustifiedBetween,
                    typography.T_14_Regular,
                  ]}
                  onClick={() => {
                    onChange(data);
                    setTransferUUIDValue(data.asset_uuid);
                    setIsOpen(false);
                    setQty(`1`);
                  }}
                >
                  <OptionItem data={data} />
                </li>
              );
            })
          ) : (
            <EmptyList searchInput={search} />
          )}
        </ul>
      )}
    </div>
  );
};

export default WalletBalanceSelect;
