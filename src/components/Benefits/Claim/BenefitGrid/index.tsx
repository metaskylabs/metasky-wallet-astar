import { FC, useEffect } from 'react';
import * as styles from './styles';
import ImageAsset from '@components/Benefits/Claim/ImageAsset';
import { BenefitClaimMedia } from '@typings/api/wallet';
import {
  BenefitMediaType,
  getMediaTypeFromMime,
  getNameFromUrl,
} from '@components/Benefits/Claim/helper';
import { useAnalytics } from '@utils/useAnalytics';

interface BenefitGridProps {
  data: BenefitClaimMedia[];
  setView: (media: BenefitClaimMedia) => void;
  image: string;
}

const BenefitGrid: FC<BenefitGridProps> = ({ data, setView, image }) => {
  const { trackClick, trackPage } = useAnalytics();
  useEffect(() => {
    trackPage(`Benefit Claim Grid`, data);
  }, []);
  return (
    <div css={styles.gridContainer}>
      {data.map((item, i) => {
        const media = getMediaTypeFromMime(item.mimeType);
        return (
          <div
            key={i}
            onClick={() => {
              trackClick(`Benefit Media`, item);
              setView(item);
            }}
            css={styles.gridItemContainer}
          >
            <ImageAsset
              image={media === BenefitMediaType.IMAGE ? item.url : image}
              name={getNameFromUrl(item.url)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BenefitGrid;
