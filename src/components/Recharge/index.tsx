import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import { mixins, utils } from '@styles/shared';
import * as Constants from '@utils/constants';
import { InputType } from '@utils/constants';
import CurrencySelect from '@components/CurrencySelect';
import { InputBaseSecondary } from '@components/Shared';
import { motion } from 'framer-motion';
import { limitDecimal } from '@utils/helper';
import { onlyNumber } from '@utils/regexes';
import AssetsImg from '@public/images';
import { PreviewTransferResponse } from '@typings/api/transfer';
import { useTranslate } from '@utils/useTranslate';
import { getCurrencySymbol } from '@constants/currency';
import { RechargeFees } from '@components/ConfirmTransfer';
import { useAnalytics } from '@utils/useAnalytics';

interface RechargeProps {
  amount: string;
  setAmount: (amount: string) => void;
  minAmount?: number;
  isRechargeRequired: boolean;
  confirmationDetails: PreviewTransferResponse;
  tokenValue: number;
  currency: string;
  maxFees: RechargeFees;
  depositedCurrency?: string;
}

const amountList = [`1000`, `1500`, `2000`];

const Recharge: FC<RechargeProps> = ({
  amount,
  setAmount,
  minAmount,
  isRechargeRequired,
  confirmationDetails,
  tokenValue,
  currency,
  maxFees,
  depositedCurrency,
}) => {
  const { translate } = useTranslate();
  const eventLogger = useAnalytics();
  const handleInputChange = (inputValue: string) => {
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setAmount(limitDecimal(inputValue, 2));
    }

    if (inputValue == ``) {
      setAmount(``);
    }
  };
  const [isRechargeOpen, setIsRechargeOpen] =
    useState<boolean>(isRechargeRequired);

  return (
    <Fragment>
      <div
        css={[mixins.flexJustifiedBetween]}
        onClick={() => {
          setIsRechargeOpen(!isRechargeOpen);
          eventLogger.trackClick(`Recharge`, { is_open: !isRechargeOpen });
        }}
      >
        <div
          css={[
            styles.rechargeHeader,
            mixins.flexAlignCenter,
            styles.rechargeTitle,
          ]}
        >
          <span>
            <img
              src={AssetsImg.ic_recharge_wallet.src}
              alt="wallet recharge icon"
              css={[utils.mr(4)]}
            />
          </span>
          {translate(Constants.home.recharge)}
        </div>
        <img
          src={AssetsImg.ic_arrowDown.src}
          alt="Down Arrow"
          css={[
            utils.mr(20),
            isRechargeOpen && styles.buttonArrowOpen,
            styles.buttonArrowIcon,
          ]}
        />
      </div>
      {isRechargeOpen && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: `auto` },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div>
            <div>
              <motion.div
                css={styles.rechargeForm}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  default: { duration: 0.3 },
                  ease: `easeIn`,
                }}
              >
                <div css={mixins.flexAlignCenterJustifiedBetween}>
                  <h4 css={styles.formLabel}>{translate(`RECHARGE_AMOUNT`)}</h4>
                  <span css={styles.formMinLabel}>
                    ({translate(`MIN`)} {translate(`RECHARGE:`)}
                    {getCurrencySymbol(currency)}
                    {minAmount})
                  </span>
                </div>
                <div css={styles.formGroup}>
                  <div css={[styles.currency, styles.input, mixins.flex]}>
                    <CurrencySelect currency={currency} />
                  </div>
                  <div css={styles.amount}>
                    <InputBaseSecondary
                      type={InputType.number}
                      name="amount"
                      placeholder="Enter Amount"
                      // noSpecialCharacterCheck
                      addStyles={styles.input}
                      value={amount}
                      onChange={(event) => {
                        const { target } = event;
                        handleInputChange(target.value);
                      }}
                    />
                  </div>
                </div>
                <div css={styles.amountButtonContainer}>
                  {amountList.map((amnt) => {
                    return (
                      <div
                        key={amnt}
                        css={[styles.amountButton, mixins.cursorPointer]}
                        onClick={() => {
                          let updatedAmount = 0;
                          if (amount === `NaN`) {
                            updatedAmount = parseFloat(amnt);
                          } else {
                            updatedAmount =
                              parseFloat(amount || `0`) + parseFloat(amnt);
                          }
                          setAmount(limitDecimal(updatedAmount.toString(), 2));
                        }}
                      >
                        + {getCurrencySymbol(currency)}
                        {amnt}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              default: { duration: 0.3 },
              ease: `easeIn`,
            }}
            css={[styles.transactionDetailsContainer]}
          >
            <div css={[styles.transactionDetailsHeader]}>
              <span css={[styles.detailsIcon, utils.mr(15)]}>
                <img src={AssetsImg.ic_document.src} />
              </span>
              {translate(`TRANSACTION_DETAILS`)}
            </div>
            <div css={[styles.transactionDetailsInfo]}>
              <div
                css={[
                  mixins.flexJustifiedBetween,
                  styles.transactionDetialsRow,
                ]}
              >
                <div>{translate(`RECHARGE_AMOUNT`)}</div>
                <div css={[styles.transactionDetailsAmountContainer]}>
                  <div css={styles.transactionDetailsInr}>
                    {getCurrencySymbol(currency)}

                    {parseFloat(amount) > 0 ? amount : 0}
                  </div>
                  <div css={styles.transactionDetailsChain}>
                    ~{` `}
                    {parseFloat(amount) > 0
                      ? limitDecimal(tokenValue.toString(), 5)
                      : 0}
                    {` `}
                    {depositedCurrency}
                  </div>
                </div>
              </div>
              <div
                css={[
                  mixins.flexJustifiedBetween,
                  styles.transactionDetialsRow,
                ]}
              >
                <div>{translate(`MAX_FEES`)}</div>
                <div css={[styles.transactionDetailsAmountContainer]}>
                  <div css={styles.transactionDetailsInr}>
                    {getCurrencySymbol(maxFees.fiat_currency)}

                    {maxFees.value_in_fiat}
                  </div>
                  <div css={styles.transactionDetailsChain}>
                    ~{` `}
                    {limitDecimal(maxFees.value.toString(), 5)}
                    {` `}
                    {maxFees.currency}
                  </div>
                </div>
              </div>
              {amount &&
                amount != `0` &&
                parseFloat(amount) - confirmationDetails.fees.value_in_fiat >
                  0 && (
                  <div
                    css={[
                      mixins.flexJustifiedBetween,
                      styles.transactionDetialsRow,
                    ]}
                  >
                    <div>{translate(`BALANCE_DEPOSITED_TO_WALLET`)}</div>
                    <div css={[styles.transactionDetailsAmountContainer]}>
                      <div css={styles.transactionDetailsInr}>
                        {getCurrencySymbol(currency)}
                        {limitDecimal(
                          (
                            parseFloat(amount) - maxFees.value_in_fiat
                          ).toString(),
                          2,
                        )}
                      </div>
                      <div css={styles.transactionDetailsChain}>
                        ~{` `}
                        {limitDecimal(
                          (tokenValue - maxFees.value).toString(),
                          5,
                        )}
                        {` `}
                        {depositedCurrency}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        </motion.section>
      )}
    </Fragment>
  );
};

export default Recharge;
