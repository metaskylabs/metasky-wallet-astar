import { BackButton, FullScreenKiteLoader } from '@components/Shared';
import { mixins } from '@styles/shared';
import { Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import SearchBenefits from '@components/Benefits/SearchBenefits';
import AssetsImg from '@public/images';
import { TokensType, WalletBenefitsResponse } from '@typings/api/wallet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import {
  getOneListing,
  getTokenDetails,
  getWalletBenefits,
} from '@actions/wallet';
import BenefitsList from '@components/Benefits/BenefitsList';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { BenefitType } from '@constants/wallet';
import { Pages } from '@utils/navigation';
import { trackScreen } from '@utils/analytics';
import { screen } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import { useUserSession } from '@utils/hooks/useUserSession';

interface benefitsProps {
  type: BenefitType;
  nftId?: string;
}

export default function Benefits({ type, nftId }: benefitsProps) {
  const router = useRouter();
  const [isBenefitsListLoading, setIsBenefitsLoading] = useState<boolean>(true);
  const [benefitSearch, setBenefitSearch] = useState(``);
  const { translate } = useTranslate();
  const [walletBenefits, setWalletBenefits] = useState<
    WalletBenefitsResponse[]
  >([]);
  const [filteredBenefitsListlist, setFilteredBenefitsList] = useState<
    WalletBenefitsResponse[]
  >([]);
  const session = useUserSession();

  useEffect(() => {
    trackScreen(screen.benefitsList);
  }, []);

  useEffect(() => {
    if (type == BenefitType.OWNED && !nftId) {
      fetchBenefits(`/wallet/benefits`);
    }

    if (type == BenefitType.OWNED && nftId) {
      getNftDetails(`wallet/tokens/${TokensType.NFTS}/${nftId}`);
    }

    if (type == BenefitType.MARKETPLACE && nftId) {
      fetchListingNft();
    }
  }, [session.token]);

  const handleBenefitSearch = (e: any) => {
    setBenefitSearch(e.target.value);
    filteredData(e.target.value);
  };

  const filteredData = (value: string) => {
    if (value === ``) {
      setFilteredBenefitsList(walletBenefits);
    } else {
      const filteredList = walletBenefits.filter((item) => {
        return Object.values(item)
          .join(` `)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      });
      setFilteredBenefitsList(filteredList);
    }
  };
  const fetchBenefits = async (url: string) => {
    try {
      setIsBenefitsLoading(true);
      const benefits = await getWalletBenefits(url);
      setWalletBenefits(benefits.data);
      setIsBenefitsLoading(false);
    } catch (err) {
      handleErrorMessage(err);
      setIsBenefitsLoading(false);
      router.push(Pages.PAGE_NOT_FOUND);
    }
  };
  const fetchListingNft = async () => {
    if (nftId) {
      try {
        setIsBenefitsLoading(true);
        const listingDetails = await getOneListing({ listing_uuid: nftId });

        if (listingDetails.data && listingDetails.data.benefits) {
          setWalletBenefits(listingDetails.data.benefits);
        }
        setIsBenefitsLoading(false);
      } catch (error) {
        setIsBenefitsLoading(false);
        handleErrorMessage(error);
        router.push(Pages.PAGE_NOT_FOUND);
      }
    }
  };
  const getNftDetails = async (url: string) => {
    try {
      setIsBenefitsLoading(true);
      const response = await getTokenDetails(url);
      if (response.data && response.data.benefits) {
        setWalletBenefits(response.data.benefits);
      }

      setIsBenefitsLoading(false);
    } catch (error) {
      handleErrorMessage(error);
      setIsBenefitsLoading(false);
      router.push(Pages.PAGE_NOT_FOUND);
    }
  };
  return (
    <Fragment>
      {isBenefitsListLoading ? (
        <FullScreenKiteLoader isOpen={isBenefitsListLoading}>
          <div css={styles.loaderContentInfo}>
            {translate(`PAGE_LOADING`)}...
          </div>
        </FullScreenKiteLoader>
      ) : (
        <Fragment>
          <motion.div
            css={[styles.benefitsHeader, mixins.flexAlignCenter]}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              default: { duration: 0.3 },
              ease: `easeIn`,
            }}
          >
            <BackButton />
            <span css={styles.benefitsTitle}>{translate(`BENEFITS`)}</span>
          </motion.div>
          <div css={[styles.benefitsContainer, mixins.flexColumn]}>
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              <SearchBenefits
                placeholder={translate(`SEARCH_BENEFITS_BY_NAME`)}
                inputIcon={AssetsImg.ic_search.src}
                type={Constants.InputType.text}
                onChange={handleBenefitSearch}
                value={benefitSearch}
              />
            </motion.form>
            {/* <div css={[styles.benefitsFilterWrapper]}>
                {filterBenefits?.map((filterBenefits) => (
                  <FilterBenefits
                    selectedPreffs={selectedPreffs}
                    setSelectedPreffs={setSelectedPreffs}
                    name={filterBenefits.name}
                    icon={filterBenefits.image}
                    activeIcon={filterBenefits.activeImage}
                    key={filterBenefits.id}
                  />
                ))}
              </div> */}
            <div css={styles.benefitsCardWrapper}>
              <BenefitsList
                nftId={nftId}
                list={
                  benefitSearch.length > 1
                    ? filteredBenefitsListlist
                    : walletBenefits
                }
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
