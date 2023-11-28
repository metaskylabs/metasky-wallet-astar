import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import * as Constants from '@utils/constants';

const FilterTransaction: FC = () => {
  const [selectFilter, setSelectFilter] = useState(``);

  const onSelectFilter = (name: string) => {
    setSelectFilter(name);
  };

  return (
    <Fragment>
      <div css={[styles.filterTransactionHeader, mixins.flexAlignCenter]}>
        <span css={styles.filterTransactionTitle}>
          {Constants.transaction.filter}
        </span>
      </div>
      <div css={[styles.filterTransactionWrapper, mixins.flexColumn]}>
        <div
          css={[
            styles.filterTransactionSelectedButton,
            selectFilter === `NFT`
              ? styles.filterTransactionSelectedStateButton
              : ``,
            mixins.flexAlignCenter,
          ]}
          onClick={() => onSelectFilter(`NFT`)}
        >
          <div
            css={[
              styles.filterTransactionImageContainer,
              mixins.flexAlignCenter,
            ]}
          >
            {selectFilter === `NFT` ? (
              <img src={AssetsImg.ic_activeGallery.src} alt="selected nft" />
            ) : (
              <img src={AssetsImg.ic_filterGallery.src} alt="select nft" />
            )}
          </div>
          <div css={[mixins.flexColumn]}>
            <span
              css={[
                styles.filterTransactionNft,
                selectFilter === `NFT`
                  ? styles.filterTransactionSelectedTitle
                  : ``,
              ]}
            >
              {Constants.nftList.selectNft}
            </span>
            <span css={styles.filterTransactionNftQty}>
              {Constants.filter.filterQty}
            </span>
          </div>
        </div>
        <div
          css={[
            styles.filterTransactionSelectedButton,
            selectFilter === `Token`
              ? styles.filterTransactionSelectedStateButton
              : ``,
            mixins.flexAlignCenter,
          ]}
          onClick={() => onSelectFilter(`Token`)}
        >
          <div
            css={[
              styles.filterTransactionImageContainer,
              mixins.flexAlignCenter,
            ]}
          >
            {selectFilter === `Token` ? (
              <img src={AssetsImg.ic_activeDollar.src} alt="selected token" />
            ) : (
              <img src={AssetsImg.ic_dollar.src} alt="select token" />
            )}
          </div>
          <div css={[mixins.flexColumn]}>
            <span
              css={[
                styles.filterTransactionNft,
                selectFilter === `Token`
                  ? styles.filterTransactionSelectedTitle
                  : ``,
              ]}
            >
              {Constants.tokenList.selectToken}
            </span>
            <span css={styles.filterTransactionNftQty}>
              {Constants.filter.filterQty}
            </span>
          </div>
        </div>
      </div>
      <PrimaryButton
        addStyles={styles.filterApply}
        disabled={selectFilter.length === 0}
      >
        APPLY FILTER
      </PrimaryButton>
    </Fragment>
  );
};

export default FilterTransaction;
