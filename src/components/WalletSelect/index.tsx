import React, { useState } from 'react';
import AssetsImg from 'public/images';
import {
  buttonArrowIcon,
  buttonArrowOpen,
  iconLabel,
  inputFormLabel,
  optionContainer,
  optionItem,
  optionItemContents,
  selectButton,
  selectedContainer,
  optionItemContainer,
  inputFormImage,
  clamp,
  image,
} from './styles';
import { mixins, typography, utils } from '@styles/shared';
import { textTruncate } from '@utils/helper';
import { errorMessage } from '@components/Shared/Input/InputBase/styles';

export interface WalletAccount {
  id: string | number;
  icon: string;
  name: string;
  address: string;
}

export interface WalletBalanceProps {
  icon?: string;
  iconName?: string;
  value?: WalletAccount;
  itemList?: WalletAccount[];
  onChange: (value: WalletAccount) => void;
  error: any;
  label?: string;
}

interface OptionProps {
  data: WalletAccount;
  isSelected?: boolean;
}
const OptionItem: React.FC<OptionProps> = ({ data }) => {
  return (
    <section css={[optionItemContainer, mixins.flexAlignCenter]}>
      <img css={image} src={data.icon} alt={data.name} />
      <div css={[optionItemContainer]}>
        <p css={optionItemContents}>{data.name}</p>
        <p>{textTruncate(data.address, 5, 5)}</p>
      </div>
    </section>
  );
};

const WalletSelect: React.FC<WalletBalanceProps> = ({
  onChange,
  value,
  itemList,
  error,
  icon,
  iconName,
  label,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div style={{ position: `relative` }}>
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
          {itemList?.map((data, index) => {
            return (
              <li
                key={index}
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
    </div>
  );
};

export default WalletSelect;
