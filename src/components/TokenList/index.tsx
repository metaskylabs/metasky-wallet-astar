import { BalanceTokensResponse } from '@typings/api/wallet';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { CardToken } from '@components/Shared';

interface Props {
  list: BalanceTokensResponse[];
}

const TokensList = (tokenList: Props) => {
  return (
    <div css={[styles.tokenContainer, mixins.flexColumn]}>
      {tokenList.list.map((token, i) => (
        <CardToken
          key={i.toString()}
          name={token.asset_name} //{`MetaSky Token`}
          image={token.asset_logo} //{AssetsImg.ic_monero}
          quantity={token.no_of_asset} //{`50`}
          shortform={token.asset_symbol} //{`Meta`}
          conversionFactor={token?.native_currency?.conversion_factor}
          currency={token?.native_currency?.currency}
        />
      ))}
    </div>
  );
};

export default TokensList;
