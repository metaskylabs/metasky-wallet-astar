import * as styles from '@/styles/Modules/nftDrop';
import {
  BackButton,
  CardExclusiveBenefits,
  CardNfts,
  DividerLine,
  Input,
  PrimaryButton,
  SecondaryButton,
  SocialMediaButton,
} from '@components/Shared';
import 'swiper/css';
import { Fragment, useState } from 'react';
import AssetsImg from '@public/images';
import DropInformation from '@components/Drop/DropInfo';
import { useTranslate } from '@utils/useTranslate';

function NftDrop() {
  const [isWhitelisted, setIsWhitelisted] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [isCopyrightTransferable, setIsCopyrightTransferable] = useState(true);
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [email, setEmail] = useState(``);

  const { translate } = useTranslate();
  return (
    <Fragment>
      <div css={styles.headerContainer}>
        <div css={styles.imageContainer}>
          <img
            src={AssetsImg.i_default.src}
            alt={`Details Image`}
            css={styles.shareNft}
          />
        </div>
        {isLive ? (
          <PrimaryButton addStyles={styles.liveButton}>LIVE</PrimaryButton>
        ) : (
          <PrimaryButton addStyles={styles.countDown}>
            <div css={styles.countDownElements}>
              <img src={AssetsImg.ic_clockBlue.src} alt="" />
            </div>
            {/* TO Do */}
            <div css={styles.countDownElements}>
              <p>00:00:00</p>
            </div>
            <div css={styles.countDownElements}>
              <p>secs</p>
            </div>
          </PrimaryButton>
        )}
        <BackButton addStyles={styles.backButton} />
      </div>
      <div css={styles.dropTitleContainer}>
        <h4 css={styles.dropTitle}>Infinity Access Card</h4>
        <div css={styles.linkWrapper}>
          <button css={styles.linksContainer}>
            <img src={AssetsImg.ic_shareBlue.src} alt="share icon" />
          </button>
        </div>
      </div>
      <div>
        <DropInformation startDate="13 Mar, 22" endDate="20 Mar, 22" />
      </div>
      {!isWhitelisted && (
        <div css={styles.whitelistButtonContainer}>
          <SecondaryButton addStyles={styles.whitelistButton}>
            WHITELIST NOW
          </SecondaryButton>
        </div>
      )}
      <DividerLine addStyles={styles.divider} />
      <span css={styles.titleCollection}>NFTs in Collection (20)</span>

      <div css={styles.nftContainer}>
        <CardNfts
          key={3}
          keys={1}
          addStyles={styles.nftCard}
          imageStyles={styles.nftCardImage}
          image={AssetsImg.i_default.src}
          content="NFT Name" //{`Infinity Access Card Collection`}
          // onClick={() => handleRoute(token)}
          ribbon={false}
          ctaText="Buy Now"
          price="0.00004 ETH"
          mediaType="image"
        />
        <CardNfts
          key={1}
          keys={1}
          addStyles={styles.nftCard}
          image={AssetsImg.i_default.src}
          imageStyles={styles.nftCardImage}
          content="NFT Name" //{`Infinity Access Card Collection`}
          // onClick={() => handleRoute(token)}
          ribbon={false}
          ctaText="Buy Now"
          price="0.00004 ETH"
          mediaType="image"
        />
        <CardNfts
          key={2}
          keys={2}
          addStyles={styles.nftCard}
          image={AssetsImg.i_default.src}
          imageStyles={styles.nftCardImage}
          content="NFT Name" //{`Infinity Access Card Collection`}
          // onClick={() => handleRoute(token)}
          ribbon={false}
          ctaText="Buy Now"
          price="0.00004 ETH"
          mediaType="image"
        />
      </div>
      <div css={styles.loadBtn}>
        <p>Load More</p>
      </div>
      <DividerLine addStyles={styles.divider} />

      <div css={styles.cardBenefits}>
        <span css={styles.benefitsText}>{translate(`EXCLUSIVE_BENEFITS`)}</span>
        {/*//TODO: integarte with API*/}
        <div css={styles.benefitsCard}>
          <CardExclusiveBenefits
            image={AssetsImg.i_default.src}
            name="Benefits Title"
            description="Benefits Description"
            // received={
            //   benefit.receivedDate
            //     ? moment(benefit.receivedDate).format(`D MMM, YY`)
            //     : undefined
            // }
            key={`asdasd`}
            // onClick={() => handleBenefitsDetailsRoute(benefit)}
          />
        </div>
      </div>

      <div css={styles.dropTitleContainer}>
        <h4 css={styles.dropTitle}>About the drop</h4>
        <img src={AssetsImg.ic_upArrow.src} alt="share icon" />
      </div>

      <div css={styles.description}>
        <p>
          All owners have access to infinity access card collection in MetaSky
          club, once the collection is sold out. Daily drops to 1,000!
          <br />
          <br />
          Infinity access is an NFT collectible that is unique hand-drawn, each
          to create 1/1 piece. With only 1,000 available and all individually
          hand-drawn, it is a unique piece of art. This NFT collection has
          entirely been created by solo artist.
          <br />
          <br />
          When you purchase a infinity access card, you’ll receive a free video
          showing your sheep being drawn. You’ll also recieve access to prizes
          such as free NFTs, cash, and much more!
        </p>
      </div>
      <div css={styles.copyrightBoxContainer}>
        <div css={styles.copyrightBox}>
          <img
            src={
              isCopyrightTransferable
                ? AssetsImg.ic_checkIconGreen.src
                : AssetsImg.ic_crossIconRed.src
            }
            alt=""
            css={styles.icon}
          />
          <p css={styles.infoText}>Copyright Transferrable</p>
        </div>
      </div>
      <div css={styles.copyrightBoxContainer}>
        <div css={styles.copyrightBox}>
          <img
            src={
              isDownloadable
                ? AssetsImg.ic_checkIconGreen.src
                : AssetsImg.ic_crossIconRed.src
            }
            alt=""
            css={styles.icon}
          />
          <p css={styles.infoText}>Downloadable File</p>
        </div>
      </div>

      <div css={styles.dropTitleContainer}>
        <h4 css={styles.dropTitle}>Join our community</h4>
      </div>

      <div css={styles.socialIconsContainer}>
        <div css={styles.socialIcons}>
          <SocialMediaButton
            icon={AssetsImg.ic_instagram.src}
            name="facebook"
          />
          <SocialMediaButton icon={AssetsImg.ic_facebook.src} name="facebook" />
          <SocialMediaButton icon={AssetsImg.ic_twitter.src} name="facebook" />
          <SocialMediaButton icon={AssetsImg.ic_discord.src} name="facebook" />
          <SocialMediaButton icon={AssetsImg.ic_youtube.src} name="facebook" />
        </div>
      </div>
      <DividerLine addStyles={styles.divider} />
      <div css={styles.titleContainer}>
        <h4 css={styles.dropTitle}>Don&apos;t miss out the NFT Drops</h4>
      </div>
      <div css={styles.addEmail}>
        <div css={styles.emailInput}>
          {/*TODO add proper set state*/}
          <Input
            type="text"
            id="upiID"
            placeholder="enter@your.email"
            isEnable={true}
            getInputText={(text) => setEmail(text)}
          />
        </div>
        <SecondaryButton addStyles={styles.subscribeButton}>
          <p>SUBSCRIBE</p>
        </SecondaryButton>
      </div>
    </Fragment>
  );
}

export default NftDrop;
