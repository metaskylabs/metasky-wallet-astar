import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { NFTBlockchainMap } from '@utils/constants';
import { onCopy } from '@utils/helper';
import React from 'react';
import * as styles from './styles';

type Info = Partial<{
  Name: string;
  'RPC Url': string;
  'Chain ID': number;
  Symbol: string;
  Explorer: string;
}>;

type InfoKey = keyof Info;

function InfoContainer(props: { data: Info }) {
  return (
    <div css={styles.infoContainer}>
      {(Object.keys(props.data) as InfoKey[])
        .filter((k) => props.data[k])
        .map((k) => (
          <div key={k} css={mixins.flexJustifiedBetween}>
            <span css={styles.info}>{k}:</span>
            <span css={styles.info}>
              {props.data[k]}
              <img
                onClick={() => {
                  onCopy(String(props.data[k]) || ``, `${k} copied`);
                }}
                src={AssetsImg.ic_copy.src}
                css={styles.copy}
                alt=""
              />
            </span>
          </div>
        ))}
    </div>
  );
}

export default function NetworkSwitchError(props: {
  chain: string;
  chainId: number;
}) {
  return (
    <div css={styles.container}>
      <div css={styles.title}>Switch Chain</div>
      <div css={styles.description}>
        Please switch the chain in your wallet and try again.
        {NFTBlockchainMap[props.chain]?.chainId
          ? ` Below are chain details if not already added in the wallet`
          : ` Please add chain with chain id ${props.chainId} in your wallet`}
      </div>
      {NFTBlockchainMap[props.chain]?.chainId && (
        <InfoContainer
          data={{
            Name: NFTBlockchainMap[props.chain].name,
            'Chain ID': NFTBlockchainMap[props.chain].chainId,
            'RPC Url': NFTBlockchainMap[props.chain].rpc,
            Explorer: NFTBlockchainMap[props.chain].explorer,
            Symbol: NFTBlockchainMap[props.chain].symbol,
          }}
        />
      )}
    </div>
  );
}
