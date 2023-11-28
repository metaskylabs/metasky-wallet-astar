import { SerializedStyles } from '@emotion/react';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { FC, Fragment } from 'react';
import * as styles from './styles';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK } from '@constants/analytics';

interface NetworkDropDownProps {
  handleDropdownToggle: () => void;
  metamaskCoin: any;
  onSwitchNetwork: any;
  dropdownOpen: boolean;
  networkData: any;
  addStyles?: SerializedStyles;
  dropdownStyles?: SerializedStyles;
}

const NetworkDropdown: FC<NetworkDropDownProps> = ({
  handleDropdownToggle,
  metamaskCoin,
  onSwitchNetwork,
  dropdownOpen,
  networkData,
  addStyles,
  dropdownStyles,
}) => {
  const environmentName: string = process.env.NEXT_PUBLIC_ENV_NAME as string;
  const amplitude = useAnalytics();

  const renderOptions = () => {
    if (environmentName === `production`) {
      return (
        <>
          <div
            css={[styles.dropdownItem, mixins.flex]}
            onClick={() => onSwitchNetwork(137)}
          >
            <img
              src={AssetsImg.ic_polygon.src}
              alt="Polygon"
              css={[styles.dropdownItemImg, mixins.flex]}
            />
            <span css={styles.dropdownItemTitle}>Polygon</span>
          </div>
          <div
            css={[styles.dropdownItem, mixins.flex]}
            onClick={() => onSwitchNetwork(1)}
          >
            <img
              src={AssetsImg.ic_ethereum.src}
              alt="Ethereum"
              css={[styles.dropdownItemImg, mixins.flex]}
            />
            <span css={styles.dropdownItemTitle}>Ethereum</span>
          </div>
        </>
      );
    } else {
      return (
        <>
          {/*<div*/}
          {/*  css={[styles.dropdownItem, mixins.flex]}*/}
          {/*  onClick={() => onSwitchNetwork(4)}*/}
          {/*>*/}
          {/*  <img*/}
          {/*    src={AssetsImg.ic_ethereum.src}*/}
          {/*    alt="Rinkeby"*/}
          {/*    css={[styles.dropdownItemImg, mixins.flex]}*/}
          {/*  />*/}
          {/*  <span css={styles.dropdownItemTitle}>Rinkeby</span>*/}
          {/*</div>*/}
          {/*<aside css={styles.dropdownItemDivider}></aside>*/}
          <div
            css={[styles.dropdownItem, mixins.flex]}
            onClick={() => onSwitchNetwork(80001)}
          >
            <img
              src={AssetsImg.ic_polygon.src}
              alt="Mumbai"
              css={[styles.dropdownItemImg, mixins.flex]}
            />
            <span css={styles.dropdownItemTitle}>Mumbai</span>
          </div>
          <div
            css={[styles.dropdownItem, mixins.flex]}
            onClick={() => onSwitchNetwork(5)}
          >
            <img
              src={AssetsImg.ic_ethereum.src}
              alt="Goerli"
              css={[styles.dropdownItemImg, mixins.flex]}
            />
            <span css={styles.dropdownItemTitle}>Goerli</span>
          </div>
        </>
      );
    }
  };
  return (
    <Fragment>
      <div
        css={[
          styles.linkContainer,
          mixins.flexAlignCenterJustifiedBetween,
          { ...addStyles },
        ]}
        onClick={() => {
          handleDropdownToggle();
          amplitude.trackClick(CLICK.NETWORK_DROPDOWN);
        }}
      >
        <div css={[mixins.flex]}>
          {metamaskCoin && (
            <div css={styles.imgContainer}>
              <img
                src={metamaskCoin.image.src || ``}
                alt={`coin logo`}
                height="100%"
                width="100%"
                css={[mixins.flex]}
              />
            </div>
          )}
          <div css={styles.url}>
            {!!metamaskCoin?.name ? metamaskCoin?.name : networkData?.name}
          </div>
        </div>
        {/* <img
          src={
            dropdownOpen
              ? AssetsImg.ic_greyArrowDown.src
              : AssetsImg.ic_greyArrowUp.src
          }
          alt="arrow up"
          css={styles.arrowToggle}
        /> */}
      </div>
      {dropdownOpen && (
        <section css={[styles.dropdownContainer, { ...dropdownStyles }]}>
          {renderOptions()}
          {/*<aside css={styles.dropdownItemDivider}></aside>*/}
          {/*<div*/}
          {/*  css={[styles.dropdownItem, mixins.flex]}*/}
          {/*  onClick={() => onSwitchNetwork(250)}*/}
          {/*>*/}
          {/*  <img*/}
          {/*    src={AssetsImg.ic_fantom.src}*/}
          {/*    alt="Fantom"*/}
          {/*    css={[styles.dropdownItemImg, mixins.flex]}*/}
          {/*  />*/}
          {/*  <span css={styles.dropdownItemTitle}>Fantom</span>*/}
          {/*</div>*/}
          {/*<aside css={styles.dropdownItemDivider}></aside>*/}
          {/*<div*/}
          {/*  css={[styles.dropdownItem, mixins.flex]}*/}
          {/*  onClick={() => onSwitchNetwork(43114)}*/}
          {/*>*/}
          {/*  <img*/}
          {/*    src={AssetsImg.ic_avalanche.src}*/}
          {/*    alt="Avalanche"*/}
          {/*    css={[styles.dropdownItemImg, mixins.flex]}*/}
          {/*  />*/}
          {/*  <span css={styles.dropdownItemTitle}>Avalanche</span>*/}
          {/*</div>*/}
          {/*<aside css={styles.dropdownItemDivider}></aside>*/}
          {/*<p css={styles.dropdownItemText}>Testnets</p>*/}
        </section>
      )}
    </Fragment>
  );
};

export default NetworkDropdown;
