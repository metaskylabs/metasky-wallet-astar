import { HeaderOne } from '@components/Shared';
import TokensList from '@components/TokenList';
import { BalanceTokensResponse } from '@typings/api/wallet';
import { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';

interface WalletTokensProps {
  coinList: BalanceTokensResponse[] | undefined;
  coinResponseLoading: boolean;
}

const WalletTokens: FC<WalletTokensProps> = ({
  coinResponseLoading,
  coinList,
}) => {
  const { translate } = useTranslate();

  return (
    <Fragment>
      {!coinResponseLoading && coinList && coinList.length > 0 && (
        <Fragment>
          <div css={styles.coinHeaders}>
            <HeaderOne
              title={`${translate(`MY_COINS`)} (${coinList.length})`}
            />
          </div>
          <TokensList list={coinList} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default WalletTokens;
