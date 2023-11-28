import 'swiper/css';
import { FC, Fragment, useState } from 'react';
import { useRouter } from 'next/router';

const CollectionDetails: FC = () => {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleBottomSheetClose = () => {
    setSheetOpen(false);
  };

  return (
    <Fragment>
      {/*<div css={styles.headerContainer}>*/}
      {/*  <div css={styles.imageContainer}>*/}
      {/*    <img*/}
      {/*      src={AssetsImg.i_collectionDetail.src}*/}
      {/*      alt={`Collection Details Image`}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <BackButton addStyles={styles.backButton} />*/}
      {/*</div>*/}
      {/*<div css={styles.bodyContainer}>*/}
      {/*  <span css={[styles.cardAccessText, mixins.flexAlignJustifiedCenter]}>*/}
      {/*    {Constants.nftDetails.infinityAccessCard}*/}
      {/*  </span>*/}
      {/*  <TokenInformation nfts={6} />*/}
      {/*  <div css={styles.collectionDescriptionWrapper}>*/}
      {/*    <AuthorDescription*/}
      {/*      author={`Rahul Kandri`}*/}
      {/*      description={`The description will be included on the items detail page underneath its image. The description will be included on the items detail page underneath its image`}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <hr css={styles.divider} />*/}
      {/*  <div css={mixins.flexColumn}>*/}
      {/*    /!* <ShowAllLink*/}
      {/*      title="Join our community"*/}
      {/*      linkTo={() => router.push(Pages.NFT_LIST)}*/}
      {/*    /> *!/*/}
      {/*    <div css={styles.cardGrid}>*/}
      {/*      <CardNfts*/}
      {/*        image={AssetsImg.i_default.src}*/}
      {/*        onClick={() => router.push(Pages.NFT_DETAILS)}*/}
      {/*        content={Constants.nftDetails.nftCardDefaultDescription}*/}
      {/*      />*/}
      {/*      <CardNfts*/}
      {/*        image={AssetsImg.i_default.src}*/}
      {/*        onClick={() => router.push(Pages.NFT_DETAILS)}*/}
      {/*        ribbon={true}*/}
      {/*        content={Constants.nftDetails.nftCardDefaultDescription}*/}
      {/*      />*/}
      {/*      <CardNfts*/}
      {/*        image={AssetsImg.i_default.src}*/}
      {/*        onClick={() => router.push(Pages.NFT_DETAILS)}*/}
      {/*        content={Constants.nftDetails.nftCardDefaultDescription}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div css={styles.shareNftContainer}>*/}
      {/*  <div css={styles.shareNftWrapper} onClick={() => setSheetOpen(true)}>*/}
      {/*    <PrimaryButton addStyles={styles.shareNft}>SHARE TOKEN</PrimaryButton>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<BottomSheet isOpen={sheetOpen} onClose={handleBottomSheetClose}>*/}
      {/*  <WalletAddress*/}
      {/*    walletAddress={true}*/}
      {/*    walletTitle={Constants.transactionDetails.walletAddress}*/}
      {/*    barcode={AssetsImg.i_defaultBarcode.src}*/}
      {/*    addressLink={`0x5Fa37CC3ff32a86708546ecbBfAA579c0b940452`}*/}
      {/*  />*/}
      {/*</BottomSheet>*/}
    </Fragment>
  );
};

export default CollectionDetails;
