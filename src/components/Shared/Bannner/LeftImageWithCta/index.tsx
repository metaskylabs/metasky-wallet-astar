import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';

interface BannerLeftImageWithCtaProps {
  image?: string;
  title: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const BannerLeftImageWithCta: FC<BannerLeftImageWithCtaProps> = ({
  image,
  title,
  ctaText,
  onCtaClick,
}) => {
  return (
    <div css={styles.container}>
      {image && <img src={image} css={styles.image} />}
      <aside css={styles.details}>
        <h2 css={styles.title}>{title}</h2>
        {ctaText && (
          <p css={styles.ctaText} onClick={onCtaClick}>
            {ctaText}
          </p>
        )}
      </aside>
    </div>
  );
};

export default BannerLeftImageWithCta;
