import React, { FC } from 'react';
import { Fragment } from 'preact';
import { DividerLine, SectionTitle, TableHeader } from '@components/Shared';
import * as styles from './styles';
import { mixins, typography, utils } from '@styles/shared';
import { textTruncate } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';

interface SectionProps {
  accountCounts: AccountCount[];
}
export interface AccountCount {
  account: string;
  count: number;
}

const AccountCountTable: FC<SectionProps> = ({ accountCounts }) => {
  const { translate } = useTranslate();

  return (
    <Fragment>
      <SectionTitle additionalStyle={styles.title} title={`Total NFTs`} />
      <div css={styles.description}>
        The details of your NFT ownership across wallets can be found below.
      </div>
      <TableHeader column1Name={`Account`} column2Name={`Count`} />
      <div css={styles.tableContainer}>
        {accountCounts.map((accountCount, index) => {
          return (
            <Fragment key={index}>
              <section css={[styles.container]}>
                <article css={[mixins.flexAlignCenterJustifiedBetween]}>
                  <h2 css={[typography.T_14_Bold, utils.mb(4)]}>
                    {textTruncate(accountCount.account, 5, 4)}
                  </h2>
                  <h2 css={[typography.T_12_Bold]}>{accountCount.count}</h2>
                </article>
              </section>
              {index != accountCounts.length - 1 && (
                <DividerLine addStyles={styles.divider} />
              )}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default AccountCountTable;
