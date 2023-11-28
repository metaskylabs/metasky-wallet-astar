import react, { FC, useEffect, useState } from 'react';
import { colors, mixins, typography, utils } from '@styles/shared';
import * as styles from '@components/Transaction/NFTTransactionDetailsInformation/styles';
import AssetsImg from '@public/images';
import * as Constants from '@utils/constants';
import { AccountStatus } from '@components/Shared';
import { dateTimeFormat, limitDecimal } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';

//TODO:- remove undefined in next release
interface OfferDetailsProps {
  date: string | undefined;
  from: any;
  amount: string | undefined;
  nearRate: number | undefined;
  status: string | undefined;
  isBuyer: boolean | undefined;
}

const OfferDetails: FC<OfferDetailsProps> = ({
  date,
  from,
  amount,
  nearRate,
  isBuyer,
  status,
}) => {
  const [nearValue, setNearValue] = useState(0);
  const { translate } = useTranslate();

  useEffect(() => {
    if (nearRate && amount) {
      const near = parseFloat(amount) / nearRate;
      setNearValue(near);
    }
  }, [amount]);

  return (
    <section css={[styles.transactionsDetailsInfoTab]}>
      <div
        css={[styles.transactionsDetailsInfoTabTitle, mixins.flexAlignCenter]}
      >
        <div css={[styles.transactionsDetailsTabImage, mixins.flexAlignCenter]}>
          <img src={AssetsImg.ic_offer.src} alt="" />
        </div>
        <p css={styles.transactionsDetailsInfoTitleContent}>
          {translate(`OFFER_DETAILS`)}
        </p>
      </div>
      <div css={styles.transactionsDetailsInfoTabContainer}>
        {/* Date */}
        <div
          css={[
            styles.transactionsInfo,
            mixins.flexAlignCenterJustifiedBetween,
            utils.mb(16),
          ]}
        >
          <p css={styles.transactionsDetailsInfoTabArea}>{translate(`DATE`)}</p>
          <span css={styles.transactionsDetailsInfoTabContent}>
            {dateTimeFormat(date)}
          </span>
        </div>
        <div
          css={[
            styles.transactionsInfo,
            mixins.flexAlignCenterJustifiedBetween,
          ]}
        >
          <p css={styles.transactionsDetailsInfoTabArea}>
            {isBuyer
              ? translate(Constants.transactionDetails.to)
              : translate(Constants.transactionDetails.from)}
          </p>
          <span css={styles.transactionsDetailsInfoTabContent}>{from}</span>
        </div>
        <div
          css={[
            styles.transactionsInfo,
            mixins.flexAlignCenterJustifiedBetween,
            utils.mt(16),
          ]}
        >
          <p css={styles.transactionsDetailsInfoTabArea}>
            {translate(`STATUS`)}
          </p>
          <AccountStatus statusType={status} />
        </div>
        <hr css={styles.divider} />
        <section>
          <div
            css={[
              styles.transactionsInfo,
              styles.transactionsInfo,
              mixins.flexAlignCenterJustifiedBetween,
            ]}
          >
            <p css={styles.transactionsDetailsInfoTabArea}>
              {translate(`OFFER_AMOUNT`)}
            </p>
            <div css={[{ textAlign: `right` }]}>
              <span
                css={[
                  typography.T_16_Bold,
                  {
                    color: colors.Secondary_Black_Text,
                  },
                  utils.mb(2),
                ]}
              >
                ~₹{amount}
              </span>
              <p
                css={[
                  typography.T_14_Regular,
                  {
                    color: colors.Secondary_Black_Text,
                  },
                ]}
              >
                {limitDecimal(nearValue.toString(), 5)} NEAR
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OfferDetails;
