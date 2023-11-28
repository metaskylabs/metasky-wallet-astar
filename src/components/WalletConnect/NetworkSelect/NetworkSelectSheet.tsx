import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import { StoreState } from '@reducers';
import { textTruncate } from '@utils/helper';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State as userProfileState } from '@reducers/user';
import * as styles from './styles';
import { WalletCustodyType } from '@typings/api/auth';

interface NetworkProps {
  assetImage: string;
  name: string;
  address: string;
  chainId: number;
}

export default function NetworkSelectSheet(props: {
  onApprove: (network: NetworkProps) => void;
  icon: string;
  url: string;
  name: string;
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const custodialAccount = user?.profile?.allWalletAddresses?.find(
    (account) => account.type === WalletCustodyType.CUSTODIAL,
  );
  const address = custodialAccount?.ethAddress || ``;

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProps>({
    assetImage: AssetsImg.ic_ethereum.src,
    name: `Ethereum`,
    address: address,
    chainId: 1,
  });
  const mainNets: NetworkProps[] = [
    {
      assetImage: AssetsImg.ic_polygon.src,
      name: `Polygon`,
      address: address,
      chainId: 137,
    },
    {
      assetImage: AssetsImg.ic_ethereum.src,
      name: `Ethereum`,
      address: address,
      chainId: 1,
    },
  ];

  const testNets: NetworkProps[] = [
    {
      assetImage: AssetsImg.ic_polygon.src,
      name: `Polygon testnet`,
      address: address,
      chainId: 80001,
    },
    {
      assetImage: AssetsImg.ic_ethereum.src,
      name: `Ethereum testnet`,
      address: address,
      chainId: 5,
    },
  ];
  const networkList =
    process.env.NEXT_PUBLIC_ENV_NAME === `production`
      ? mainNets
      : [...mainNets, ...testNets];

  const handleSelectNetwork = (network: NetworkProps) => () => {
    setSelectedNetwork(network);
    setIsDropDownOpen(false);
  };

  return (
    <div css={styles.container}>
      <ButtonLayout
        addStyles={styles.cta}
        buttonComponent={
          <>
            <PrimaryButton
              onClick={() => props.onApprove(selectedNetwork)}
              addStyles={styles.cta}
            >
              CONNECT
            </PrimaryButton>
          </>
        }
      >
        <div css={styles.innerWrapper}>
          <div>
            <div css={styles.header}>Wallet Connect</div>

            <div css={styles.logoConatiner}>
              <img src={props.icon} alt="" css={styles.logoImg} />
            </div>
            <div css={styles.title}>{props.name}</div>
            <div css={styles.subTitle}>
              <a href={props.url}> {props.name} </a> wants to connect to your
              wallet
            </div>

            {/*Select network dropdown*/}
            <div css={styles.selectWrapper}>
              <label css={styles.label}>Current Network</label>
              <div
                css={styles.selectedBlock}
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
              >
                {selectedNetwork && (
                  <div css={styles.selectedNetwork}>
                    <img
                      src={selectedNetwork.assetImage}
                      css={styles.networkIcon}
                    />
                    {selectedNetwork.name} (
                    {textTruncate(selectedNetwork.address, 5, 3)})
                  </div>
                )}
                <img
                  src={AssetsImg.ic_blueRightArrow.src}
                  css={[
                    styles.dropDownArrow,
                    isDropDownOpen && styles.openDropDownArrow,
                  ]}
                />
              </div>
            </div>

            {/*  Dropdown list */}
            {isDropDownOpen && networkList?.length > 0 && (
              <div css={styles.ddContainer}>
                <ul css={styles.ddListContainer}>
                  {networkList.map((item, index) => {
                    return (
                      <li
                        css={styles.ddListItem}
                        key={index}
                        onClick={handleSelectNetwork(item)}
                      >
                        <div css={styles.selectedNetwork}>
                          <img src={item.assetImage} css={styles.networkIcon} />
                          {item.name} ({textTruncate(item.address, 5, 3)})
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div css={styles.trustDetails}>
            <div css={styles.headerOne}>
              Once connected, {props.name} will be able to:
            </div>

            {/*Check list item */}
            <ul css={styles.checkList}>
              <li css={styles.checkItem}>
                <img
                  src={AssetsImg.ic_green_tick_unfilled.src}
                  css={styles.checkItemImage}
                />
                View your wallet balance and activity
              </li>
              <li css={styles.checkItem}>
                <img
                  src={AssetsImg.ic_green_tick_unfilled.src}
                  css={styles.checkItemImage}
                />
                Request approval for transactions
              </li>
            </ul>

            <div css={styles.trustDesc}>
              <img src={AssetsImg.ic_shield.src} css={styles.trustDescImage} />
              Only connect to websites you trust
            </div>
          </div>
        </div>
      </ButtonLayout>
    </div>
  );
}
