import { FC, useState, Fragment, useEffect } from 'react';
import * as styles from './styles';
import { mixins, typography } from '@styles/shared';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import { Fees } from '@/typings/api/wallet';
import { formatCurrency } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';

interface TransactionInformationProps {
  icon: string;
  date?: string;
  fees?: number;
  native_currency?: { symbol: string; conversion_factor: number };
  feeDetails?: {
    currency: string;
    display: number;
    name: string;
    type: string;
    value: string;
  }[];
  hashCode?: string;
  addStyles?: SerializedStyles;
  quantity?: number;
  name?: string;
  showFeeSection?: boolean;
  exploreLink?: string;
  currency?: string;
}

const TransactionInformation: FC<TransactionInformationProps> = ({
  icon,
  date,
  fees,
  feeDetails,
  hashCode,
  addStyles,
  quantity,
  name,
  currency,
  showFeeSection,
  exploreLink,
  native_currency = {
    symbol: `NEAR`,
    conversion_factor: 250,
  },
}) => {
  const [showFeeDetails, setShowFeeDetails] = useState(false);
  const { translate } = useTranslate();

  return (
    <div css={[styles.transactionsDetailsInfoTab, { ...addStyles }]}>
      <div
        css={[styles.transactionsDetailsInfoTabTitle, mixins.flexAlignCenter]}
      >
        <div css={[styles.transactionsDetailsTabImage, mixins.flexAlignCenter]}>
          <img src={icon} alt="info" />
        </div>
        <span css={styles.transactionsDetailsInfoTitleContent}>
          {translate(`TRANSACTION_DETAILS`)}
        </span>
      </div>
      <div css={styles.transactionsDetailsInfoTabContainer}>
        {/* Date */}
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
        {showFeeSection && (
          <>
            <hr css={styles.divider} />
            <section css={styles.transactionsSection}>
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
                  {translate(`MAX_FEES`)}
                </span>
                <aside
                  css={[
                    styles.transactionsDetailsInfoTabContent,
                    styles.transactionFee,
                  ]}
                >
                  {`${
                    fees
                      ? Number(
                          Number(fees) / native_currency.conversion_factor,
                        ) >= 0.00001
                        ? Number(
                            Number(fees) / native_currency.conversion_factor,
                          ).toFixed(5)
                        : `<0.00001`
                      : `0.00`
                  } ${native_currency.symbol}`}
                </aside>
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
                    styles.transactionsDetailsSecondaryTab,
                    styles.transactionFeeDetailInfoLink,
                  ]}
                  onClick={() => setShowFeeDetails(!showFeeDetails)}
                >
                  {feeDetails &&
                    (feeDetails || [])?.filter(
                      (data) => Number(data.display) > 0,
                    )?.length > 0 && (
                      <>
                        {showFeeDetails
                          ? translate(`HIDE_DETAILS`)
                          : translate(`VIEW_DETAILS`)}
                      </>
                    )}
                </span>
                <aside
                  css={[
                    styles.transactionsDetailsInfoSecondaryTabContent,
                    styles.transactionFee,
                  ]}
                >
                  {formatCurrency(
                    `${fees ? Number(fees).toFixed(2) : `0.00`}`,
                    currency,
                  )}
                </aside>
              </div>
            </section>

            {showFeeDetails &&
              feeDetails
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
                        {/* TODO: use function  */}
                        {Number(
                          data.display / native_currency.conversion_factor,
                        ) >= 0.00001
                          ? `${Number(
                              data.display / native_currency.conversion_factor,
                            ).toFixed(5)} ${native_currency.symbol}`
                          : `<0.00001`}
                      </aside>
                    </div>
                    <div
                      css={[styles.transactionsInfo, mixins.flexJustifiedEnd]}
                    >
                      <aside
                        css={[
                          styles.transactionsDetailsInfoSecondaryTabContent,
                          styles.transactionFee,
                        ]}
                      >
                        {formatCurrency(
                          Number(data.display).toFixed(2),
                          currency,
                        )}
                      </aside>
                    </div>
                  </section>
                ))}

            <hr css={styles.divider} />
            <section>
              {/* Total */}
              <div
                css={[
                  styles.transactionsInfo,
                  styles.transactionsInfo,
                  mixins.flexAlignCenterJustifiedBetween,
                ]}
              >
                <span css={styles.transactionsDetailsInfoTabArea}>
                  {translate(`TOTAL`)}
                </span>
                <aside css={styles.transactionsDetailsTotalFee}>
                  {`${
                    fees
                      ? Number(
                          Number(fees) / native_currency.conversion_factor,
                        ) >= 0.00001
                        ? Number(
                            Number(fees) / native_currency.conversion_factor,
                          ).toFixed(5)
                        : `<0.00001`
                      : `0.00`
                  } ${native_currency.symbol}`}
                </aside>
              </div>
            </section>
          </>
        )}

        {/* Hash Code */}
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
  );
};

export default TransactionInformation;
