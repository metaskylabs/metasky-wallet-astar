import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { SocialMediaButton } from '../Shared';
import { mixins } from '@styles/shared';
import * as Constants from '@utils/constants';

const ShareNft: FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleLinkCopied = () => {
    setIsCopied(true);
  };

  return (
    <Fragment>
      <div css={[styles.sendnftHeader, mixins.flexAlignCenter]}>
        <span css={styles.sendnftTitle}>{Constants.nftDetails.shareNft}</span>
      </div>
      <div>
        <div css={[mixins.flexColumn]}>
          <div css={styles.shareNftImage}>
            <img src={AssetsImg.i_defaultShareNft.src} alt="nft image" />
          </div>
          <span css={styles.shareNftText}>
            Infinity Access Card - Purple Ape with Gun and Hemet
          </span>
        </div>
        <div css={[styles.shareNftSocialLinks]}>
          <div css={mixins.flexJustifiedCenter}>
            <SocialMediaButton
              icon={AssetsImg.ic_facebook.src}
              name="Facebook"
            />
          </div>
          <div css={mixins.flexJustifiedCenter}>
            <SocialMediaButton icon={AssetsImg.ic_twitter.src} name="Twitter" />
          </div>
          <div css={mixins.flexJustifiedCenter}>
            <SocialMediaButton
              icon={AssetsImg.ic_instagram.src}
              name="Instagram"
            />
          </div>
          <div css={mixins.flexJustifiedCenter}>
            <SocialMediaButton icon={AssetsImg.ic_discord.src} name="Discord" />
          </div>
          <div css={mixins.flexJustifiedCenter}>
            <SocialMediaButton
              icon={AssetsImg.ic_whatsapp.src}
              name="WhatsApp"
            />
          </div>
          <div css={mixins.flexJustifiedCenter}>
            <SocialMediaButton
              icon={AssetsImg.ic_linkedin.src}
              name="Linkedin"
            />
          </div>
        </div>
        {!isCopied ? (
          <div
            css={[styles.shareNftCopyLink, mixins.flexAlignJustifiedCenter]}
            onClick={handleLinkCopied}
          >
            <img src={AssetsImg.ic_otherLink.src} alt="copy link" />
            <span css={styles.shareNftCopyText}>Copy Link</span>
          </div>
        ) : (
          <div
            css={[mixins.flexJustifiedCenter, styles.shareNftLinkCopiedWrapper]}
          >
            <span css={styles.shareNftLinkCopied}>Link Copied</span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ShareNft;
