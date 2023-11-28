import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';
import { AddOnOrder } from '@typings/api/payment';
import { Fees } from '@typings/api/wallet';
import { getNativeCurrencyDisplayValue } from '@utils/currencyConversion';
import { formatCurrency } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';
import { BlueBanner } from '@components/Home/HomePageBanner/BlueBanner';
import * as Constants from '@utils/constants';

interface TransactionInformationProps {
  title?: string;
  icon: string;
  date?: string;
  fees?: string;
  nativeFees?: number;
  hashCode?: string;
  addStyles?: SerializedStyles;
  quantity?: number;
  name?: string;
  price?: string;
  nativePrice?: number;
  exploreLink?: string;
  currency?: string;
  nativeCurrency?: string;
  addOnOrders?: AddOnOrder[];
  feeBreakup?: Fees[];
  nativeFeeBreakup?: Fees[];
  totalAmount?: string;
  totalNativeAmount?: number;
}

const TransactionInformation: FC<TransactionInformationProps> = ({
  title,
  icon,
  date,
  fees,
  nativeFees,
  hashCode,
  addStyles,
  quantity,
  name,
  currency,
  nativeCurrency,
  nativePrice,
  price,
  exploreLink,
  addOnOrders,
  totalAmount,
  totalNativeAmount,
  feeBreakup,
  nativeFeeBreakup,
}) => {
  const [qty, setQty] = useState(1);
  const [showFeeDetails, setShowFeeDetails] = useState(false);

  const handleQuantityChange = (e: any) => {
    const amount = e.target.value;
    setQty(amount);
  };
  const { translate } = useTranslate();

  return (
    <div>
      <div css={[styles.transactionsDetailsInfoTab, { ...addStyles }]}>
        <div
          css={[styles.transactionsDetailsInfoTabTitle, mixins.flexAlignCenter]}
        >
          <div
            css={[styles.transactionsDetailsTabImage, mixins.flexAlignCenter]}
          >
            <img src={icon} alt="info" />
          </div>
          <span css={styles.transactionsDetailsInfoTitleContent}>{title}</span>
        </div>
        <div css={styles.transactionsDetailsInfoTabContainer}>
          <div
            css={[
              styles.transactionsInfo,
              mixins.flexAlignCenterJustifiedBetween,
            ]}
          >
            <span css={styles.transactionsDetailsInfoTabArea}>
              {translate(`TRANSACTION_DATE`)}
            </span>
            <aside css={styles.transactionsDetailsInfoTabContent}>{date}</aside>
          </div>
          <hr css={styles.divider} />
          {[
            { name, currency, price, nativePrice, quantity },
            ...(addOnOrders || []).map((item) => ({
              name: item.nft?.name,
              price: item.value,
              currency: item.currency,
              quantity: item.nft?.quantity,
              nativePrice: 0,
            })),
          ].map((item, index) => (
            <section css={styles.transactionsSection} key={index}>
              <div
                css={[
                  styles.transactionsInfo,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                <span
                  css={[
                    styles.transactionsDetailsInfoTabArea,
                    styles.transactionsDetailsSecondaryTab,
                  ]}
                >
                  {item.name}
                </span>
                {item.price && item.currency && (
                  <aside css={styles.transactionsDetailsInfoTabContent}>
                    {formatCurrency(item.price, item.currency)}
                  </aside>
                )}
              </div>
              <div
                css={[
                  styles.transactionsInfo,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                <span
                  css={[
                    styles.transactionsDetailsInfoTabArea,
                    mixins.flexAlignCenter,
                  ]}
                >
                  {translate(`QUANTITY`)}:{` `}
                  {item.quantity ? (
                    item.quantity
                  ) : (
                    <div
                      css={[
                        mixins.flexAlignJustifiedCenter,
                        styles.purchaseNFT,
                      ]}
                    >
                      {/* <span
                    css={[
                      mixins.flexAlignJustifiedCenter,
                      styles.purchaseNFTButton,
                    ]}
                  >
                    <Image src={AssetsImg.ic_minus} alt="minus" />
                  </span> */}
                      <input
                        css={[styles.purchaseNFTInput]}
                        type="number"
                        value={qty}
                        min={1}
                        onChange={handleQuantityChange}
                        disabled
                      />
                      {/* <span
                    css={[
                      mixins.flexAlignJustifiedCenter,
                      styles.purchaseNFTButton,
                    ]}
                  >
                    <Image src={AssetsImg.ic_add} alt="add" />
                  </span> */}
                    </div>
                  )}
                </span>
                {Number(item.nativePrice) > 0 && (
                  <aside
                    css={[styles.transactionsDetailsInfoSecondaryTabContent]}
                  >
                    {`${getNativeCurrencyDisplayValue(
                      Number(item.nativePrice),
                      true,
                    )} ${nativeCurrency || ``}`}
                  </aside>
                )}
              </div>
            </section>
          ))}
          <section>
            <article css={[mixins.flexAlignCenterJustifiedBetween]}>
              <div
                css={[
                  styles.transactionsInfo,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                <span
                  css={[
                    styles.transactionsDetailsInfoTabArea,
                    styles.transactionsDetailsSecondaryTab,
                  ]}
                >
                  {translate(`MORE_CHARGES`)}
                </span>
                {/* <aside css={styles.transactionsDetailsInfoTabContent}>{fees}</aside> */}
              </div>
              <div
                css={[
                  styles.transactionsInfo,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                {/* <span
                css={[
                  styles.transactionsDetailsInfoTabArea,
                  styles.transactionsDetailsInfoLink,
                  typography.T_12_Bold,
                ]}
              >
                {Constants.transactionDetails.viewDetails}
              </span> */}
                <aside
                  css={[
                    styles.transactionsDetailsInfoTabContent,
                    styles.transactionFee,
                  ]}
                >
                  {formatCurrency(
                    fees ? Number(fees).toFixed(2) : `0.00`,
                    currency,
                  )}
                </aside>
              </div>
            </article>
            <div
              css={[
                styles.transactionsInfo,
                mixins.flexAlignCenterJustifiedBetween,
              ]}
            >
              <span
                css={[
                  styles.transactionsDetailsInfoTabArea,
                  styles.transactionsDetailsSecondaryTab,
                  styles.transactionFeeDetailInfoLink,
                ]}
                onClick={() => setShowFeeDetails(!showFeeDetails)}
              >
                {feeBreakup &&
                  (feeBreakup || [])?.filter((data) => Number(data.display) > 0)
                    ?.length > 0 && (
                    <>
                      {showFeeDetails
                        ? translate(`HIDE_DETAILS`)
                        : translate(`VIEW_DETAILS`)}
                    </>
                  )}
              </span>
              {Number(nativeFees) > 0 && (
                <aside
                  css={[styles.transactionsDetailsInfoSecondaryTabContent]}
                >
                  {`${getNativeCurrencyDisplayValue(
                    Number(nativeFees),
                    true,
                  )} ${nativeCurrency || ``}`}
                </aside>
              )}
            </div>
            {showFeeDetails &&
              feeBreakup
                ?.map((data, index) => ({
                  ...data,
                  nativeFeeBreakup: nativeFeeBreakup?.[index]?.value,
                }))
                ?.filter((data) => Number(data.display) > 0)
                .map((data, index) => (
                  <section
                    css={styles.transactionsSection}
                    key={index.toString()}
                  >
                    <div
                      css={[
                        styles.transactionsInfo,
                        mixins.flexAlignCenterJustifiedBetween,
                      ]}
                    >
                      <span
                        css={[
                          styles.transactionsDetailsInfoTabArea,
                          styles.transactionsDetailsSecondaryTab,
                        ]}
                      >
                        {data.name}
                      </span>
                      <aside
                        css={[
                          styles.transactionsDetailsInfoTabContent,
                          styles.transactionFee,
                        ]}
                      >
                        {formatCurrency(
                          Number(data.display).toFixed(2),
                          currency,
                        )}
                      </aside>
                    </div>
                    {Number(data.nativeFeeBreakup) > 0 && (
                      <div
                        css={[
                          styles.transactionsInfo,
                          mixins.flexJustifiedBetween,
                        ]}
                      >
                        <span />
                        <aside
                          css={[
                            styles.transactionsDetailsInfoSecondaryTabContent,
                          ]}
                        >
                          {`${getNativeCurrencyDisplayValue(
                            Number(data.nativeFeeBreakup),
                            true,
                          )} ${nativeCurrency}`}
                        </aside>
                      </div>
                    )}
                  </section>
                ))}
            <hr css={styles.divider} />
            <div
              css={[
                styles.transactionsInfo,
                mixins.flexAlignCenterJustifiedBetween,
              ]}
            >
              <span css={styles.transactionsDetailsInfoTabArea}>
                {translate(`TOTAL`)}
              </span>
              <aside css={styles.transactionsDetailsInfoTabContent}>
                {formatCurrency(totalAmount || `0.00`, currency)}
              </aside>
            </div>
            {Number(totalNativeAmount) > 0 && (
              <div css={[styles.transactionsInfo, mixins.flexJustifiedBetween]}>
                <span />
                <aside
                  css={[styles.transactionsDetailsInfoSecondaryTabContent]}
                >
                  {`${getNativeCurrencyDisplayValue(
                    Number(totalNativeAmount),
                    true,
                  )} ${nativeCurrency}`}
                </aside>
              </div>
            )}
          </section>
          {hashCode && exploreLink && (
            <Fragment>
              <hr css={styles.divider} />
              <div
                css={[
                  styles.transactionsInfo,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                <span css={styles.transactionsDetailsInfoTabArea}>
                  {translate(`HASH_CODE`)}
                </span>
                <aside
                  css={[
                    styles.transactionsDetailsInfoTabContent,
                    styles.transactionsDetailsInfoLink,
                  ]}
                  onClick={() => window.open(`${exploreLink}`, `_blank`)}
                >
                  {hashCode}
                </aside>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInformation;
