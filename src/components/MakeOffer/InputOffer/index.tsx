import { InputGroupSuffex, Tooltip } from '@components/Shared';
import AssetsImg from '@public/images';
import { colors, mixins, typography, utils } from '@styles/shared';
import { curenciesForOffer, InputType } from '@utils/constants';
import { limitDecimal } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import * as styles from './styles';

interface InputOfferProps {
  amount: string;
  conversion_rate: number | undefined;
  conversionSymbol: string | undefined;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  tooltip: string;
  disabled?: boolean;
  handleDropdownToggle?: () => void;
  dropdownOpen?: boolean;
}

const InputOffer: FC<InputOfferProps> = ({
  amount,
  conversion_rate,
  handleInputChange,
  tooltip,
  disabled,
  conversionSymbol,
  dropdownOpen,
  handleDropdownToggle,
}) => {
  const [nearValue, setNearValue] = useState(0);
  const { translate } = useTranslate();
  const [selectedCurrency, setSelectedCurrency] = useState(
    curenciesForOffer[0],
  );

  useEffect(() => {
    if (conversion_rate && amount) {
      const near = parseFloat(amount) / conversion_rate;
      setNearValue(near);
    }
  }, [amount, conversion_rate]);

  return (
    <article css={[styles.container, utils.mb(16)]}>
      <div css={[mixins.flex]}>
        <div
          css={[
            styles.dropdownContainer,
            mixins.flexAlignJustifiedCenter,
            utils.widthPercent(25),
            utils.mr(8),
          ]}
          onClick={handleDropdownToggle}
        >
          <div
            css={[
              mixins.flex,
              mixins.flexAlignJustifiedCenter,
              utils.heightPercent(100),
            ]}
          >
            <img css={[utils.mr(2)]} src={selectedCurrency.image} />
            <img
              src={AssetsImg.ic_arrowDown_dark.src}
              alt="arrow up"
              css={[dropdownOpen && styles.arrowToggleOpen, styles.arrowToggle]}
            />
          </div>
        </div>
        {dropdownOpen && (
          <section css={[styles.dropdownContainer, styles.dropDownWrapper]}>
            <>
              {curenciesForOffer.map(
                (item: { image: string; currency: string }, index: number) => {
                  return (
                    <div
                      key={index}
                      css={[
                        styles.dropdownItem,
                        mixins.flex,
                        mixins.flexAlignCenterJustifiedStart,
                      ]}
                      onClick={() => {
                        setSelectedCurrency(curenciesForOffer[index]);
                        handleDropdownToggle && handleDropdownToggle();
                      }}
                    >
                      <div>
                        <img src={item.image} css={[utils.mr(10)]} />
                        <span css={styles.dropdownItemTitle}>
                          {item.currency}
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </>
          </section>
        )}
        <InputGroupSuffex
          type={InputType.number}
          name="amount"
          placeholder={translate(`ENTER_AMOUNT`)}
          noSpecialCharacterCheck
          addStyles={styles.inputBase}
          value={amount}
          onChange={handleInputChange}
          conversion_rate={conversion_rate}
          disabled={disabled}
        />
      </div>
      <div css={[mixins.flexAlignCenterJustifiedBetween, utils.mt(8)]}>
        <div css={[mixins.flexAlignCenterJustifiedBetween]}>
          <p
            css={[
              typography.T_14_Regular,
              {
                color: colors.Secondary_White,
              },
              utils.mr(8),
            ]}
          >
            {`${translate(`AMOUNT_IN`)} ${conversionSymbol} ${translate(
              `CURRENCY`,
            )}`}
          </p>
          <Tooltip
            content={tooltip}
            id={`1`}
            icon={AssetsImg.ic_yellowInfo.src}
          />
        </div>
        {parseFloat(amount) > 0 && conversion_rate && (
          <p
            css={[
              typography.T_14_Semibold,
              {
                color: colors.Secondary_White,
              },
            ]}
          >
            {limitDecimal(nearValue.toString(), 5)}
            {` `}
            {conversionSymbol || `-`}
          </p>
        )}
      </div>
    </article>
  );
};

export default InputOffer;
