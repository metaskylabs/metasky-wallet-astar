import { mixins } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';
import * as styles from './styles';

interface DefaultCardProps {
  image: string;
  title: string;
  addStyles?: SerializedStyles;
}

const DefaultCard: FC<DefaultCardProps> = ({ addStyles, title, image }) => {
  return (
    <div
      css={[
        styles.defaultCard,
        mixins.flexAlignJustifiedCenter,
        { ...addStyles },
      ]}
    >
      <div css={[styles.defaultCardImage, mixins.flexAlignJustifiedCenter]}>
        <img src={image} alt="Default Image" css={styles.defaultImage} />
      </div>
      <div css={styles.defaultCardButton}>
        <span css={styles.defaultCardTitle}>{title}</span>
      </div>
    </div>
  );
};

export default DefaultCard;
