import * as styles from '@styles/Modules/tokenDetails';
import AssetsImg from '@public/images';
import Image from 'next/image';
import {
  BackButton,
  BottomSheet,
  CardBenefits,
  PrimaryButton,
  SecondaryButton,
} from '@components/Shared';
import TokenInformation from '@components/Detail/TokenInfo';
import CollectionInformation from '@components/Detail/CollectionInfo';
import { mixins } from '@styles/shared';
import WalletAddress from '@components/WalletAddress';
import { Fragment, useEffect, useState } from 'react';
import SendToken from '@components/SendToken';
import * as Constants from '@utils/constants';
import { getTokenDetails } from '@actions/wallet';
import { GetStaticPaths, GetStaticProps } from 'next';
import { TokenDetails, TokenMainInfo } from '@typings/api/wallet';
import { useTranslate } from '@utils/useTranslate';

export default function TokenDetailsPage(tokenDetails: TokenMainInfo) {
  const [walletSheetOpen, setWalletSheetOpen] = useState(false);
  const [tokenSheetOpen, setTokenSheetOpen] = useState(false);
  const { translate } = useTranslate();

  const handleWalletSheetClose = () => {
    setWalletSheetOpen(false);
  };

  const handleSendTokenSheetClose = () => {
    setTokenSheetOpen(false);
  };

  return (
    <Fragment>
      <div css={styles.headerContainer}>
        <div css={styles.imageContainer}>
          <img
            src={tokenDetails.image}
            alt={`Details Image`}
            width="100%"
            height="100%"
          />
        </div>
        <PrimaryButton addStyles={styles.primaryButton}>
          5 BENEFITS
        </PrimaryButton>
        <BackButton addStyles={styles.backButton} />
      </div>
      <div css={styles.bodyContainer}>
        <span css={[styles.cardAccessText, mixins.flexAlignJustifiedCenter]}>
          {/* {Constants.infinityToken} */}
          {`${tokenDetails.name} (${tokenDetails.symbol})`}
        </span>
        <TokenInformation
          // tokens={tokenDetails.quantity}
          infoItems={[]}
        />
        <SecondaryButton onClick={() => setTokenSheetOpen(true)}>
          SEND TOKEN
        </SecondaryButton>
        <CollectionInformation
          title={tokenDetails.name}
          description={tokenDetails.description}
        />
        <hr css={styles.divider} />
        <div css={styles.cardBenefits}>
          <span css={styles.benefitsText}>
            {translate(`EXCLUSIVE_BENEFITS`)}
          </span>
          <CardBenefits
            addStyles={styles.benefitsCard}
            image={AssetsImg.i_coupon.src}
            name={`Monkey Soundtrack`}
            description={`You own an exclusive monkey sound track.`}
            received={`10 Jan, 22`}
          />
        </div>
      </div>
      <div css={styles.shareNftContainer}>
        <div
          css={styles.shareNftWrapper}
          onClick={() => setWalletSheetOpen(true)}
        >
          <PrimaryButton addStyles={styles.shareNft}>SHARE TOKEN</PrimaryButton>
        </div>
      </div>
      <BottomSheet isOpen={walletSheetOpen} onClose={handleWalletSheetClose}>
        <WalletAddress
          walletTitle={translate(Constants.transactionDetails.walletAddress)}
        />
      </BottomSheet>
      <BottomSheet isOpen={tokenSheetOpen} onClose={handleSendTokenSheetClose}>
        <SendToken />
      </BottomSheet>
    </Fragment>
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const tokenDetails = await getTokenDetails(`utility`);

    return {
      props: tokenDetails.data,
    };
  } catch (error) {
    // console.log(error);
    return { notFound: true }; //will show 404
  }
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: `blocking`, //indicates the type of fallback
  };
};
