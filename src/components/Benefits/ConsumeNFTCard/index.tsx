import { consumeNFT } from '@actions/consumableNFT';
import { MediaCard, MLottie, SecondaryButton } from '@components/Shared';
import { MediaType } from '@components/Shared/Card/Media';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import * as Constants from '@utils/constants';
import { handleErrorMessage } from '@utils/handleResponseToast';
import router from 'next/router';
import { FC, useState } from 'react';
import * as styles from './styles';

interface ConsumeNFTCardProps {
  image: string;
  title: string;
  mediaType?: MediaType;
  isBenefitConsumed?: boolean;
  id: string;
}

const ConsumeNFTCard: FC<ConsumeNFTCardProps> = ({
  image,
  title,
  mediaType,
  isBenefitConsumed,
  id,
}) => {
  const { query } = router;
  const [consumedNFTid, setConsumedNFTid] = useState<string>(``);
  const [apiLoadingState, setApiLoadingState] = useState<boolean>(false);
  const handleConsume = async () => {
    const benefitUUID = query.id as string;
    setApiLoadingState(true);
    try {
      if (id) {
        const payload = {
          benefit_uuid: benefitUUID,
          nft_uuids: [id],
        };
        const response = await consumeNFT(payload);
        setConsumedNFTid(response.data[0].is_nft_consumed);
        setApiLoadingState(false);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  return (
    <div css={[mixins.flexAlignCenter, { width: `100%` }]}>
      {mediaType && (
        <MediaCard
          mediaType={mediaType === `image` ? MediaType.IMAGE : MediaType.VIDEO}
          mediaUrl={image}
          addedStyles={styles.transactionsImageContainer}
          mediaShimmerSize={Constants.ShimmerCardSize.SMALL}
        />
      )}
      <div
        css={[
          styles.transactionsDetailsInfo,
          mixins.flexJustifiedCenter,
          mixins.flexColumn,
        ]}
      >
        <section css={styles.transactionsDetailsContent}>
          <h2 css={styles.transactionsDetailsInfoTitle}>{title}</h2>
          {isBenefitConsumed || consumedNFTid ? (
            <span css={[styles.consumedBtn, mixins.flexAlignJustifiedCenter]}>
              <img
                css={styles.consumedBtnIcon}
                src={AssetsImg.ic_tick.src}
                alt={`Success`}
              />
              consumed
            </span>
          ) : (
            <SecondaryButton
              addStyles={styles.consumeBtn}
              onClick={handleConsume}
              disabled={apiLoadingState}
            >
              {apiLoadingState ? (
                <MLottie addStyles={styles.loader} />
              ) : (
                <p>consume</p>
              )}
            </SecondaryButton>
          )}
        </section>
      </div>
    </div>
  );
};

export default ConsumeNFTCard;
