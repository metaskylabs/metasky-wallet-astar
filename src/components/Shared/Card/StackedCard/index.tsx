import { mixins } from '@styles/shared';
import React, { FC } from 'react';
import * as styles from './styles';

interface CollectionCardProps {
  image: string;
  title: string;
  subTitle?: string;
  tags?: [];
  collection_uuid: string;
  onClick: (collection_uuid: string) => void;
}

const StackedCard: FC<CollectionCardProps> = ({
  image,
  title,
  subTitle,
  tags,
  collection_uuid,
  onClick,
}) => {
  return (
    <article
      css={[styles.container, mixins.cursorPointer]}
      onClick={() => onClick(collection_uuid)}
    >
      <div css={styles.primaryCard}>
        <img src={image} css={styles.collectionImage} />
        <aside css={styles.content}>
          <h3 css={styles.contentHeading}>{title}</h3>
          {subTitle && <p css={styles.contentDesc}>{subTitle}</p>}
          {tags &&
            tags.map((tag: { text: string }) => (
              <div key={tag.text} css={styles.infoTag}>
                {tag.text}
              </div>
            ))}
        </aside>
      </div>
      <div css={styles.underlayCard} />
      <div css={[styles.underlayCard, styles.secondaryUnderlay]} />
    </article>
  );
};

export default StackedCard;
