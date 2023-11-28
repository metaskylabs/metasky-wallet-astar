import AssetsImg from '@public/images';
import { mixins, typography } from '@styles/shared';
import { FC, Fragment } from 'react';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';
import RichText from '@components/Shared/RichText';

interface AuthorDescriptionProps {
  description?: string;
  author?: string;
  seller?: string;
  image?: string;
  blockchain?: { id: string; name: string };
}

const AuthorDescription: FC<AuthorDescriptionProps> = ({
  description,
  author,
  seller,
  image,
  blockchain,
}) => {
  const { translate } = useTranslate();
  return (
    <div css={[styles.description, mixins.flexColumn]}>
      {description && (
        <Fragment>
          <RichText content={description} />
        </Fragment>
      )}
      {author && (
        <Fragment>
          <span css={[styles.descriptionCreatedBy]}>
            {translate(`CREATED_BY`)}
          </span>
          <div css={styles.descriptionAuthor}>
            <div
              css={[
                styles.descriptionAuthorImage,
                mixins.flexAlignJustifiedCenter,
              ]}
            >
              <img
                src={AssetsImg.ic_genericAuthor.src}
                alt={author}
                width="100%"
                height="100%"
                css={styles.authorImage}
              />
            </div>
            <span css={[styles.descriptionAuthorName]}>{author}</span>
          </div>
        </Fragment>
      )}
      {seller && (
        <Fragment>
          <span css={[styles.descriptionCreatedBy]}>{translate(`OWNER`)}</span>
          <div css={styles.descriptionAuthor}>
            <div
              css={[
                styles.descriptionAuthorImage,
                mixins.flexAlignJustifiedCenter,
              ]}
            >
              <img
                src={AssetsImg.ic_genericAuthor.src}
                alt={author}
                width="100%"
                height="100%"
                css={styles.authorImage}
              />
            </div>
            <span css={[styles.descriptionAuthorName]}>{seller}</span>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AuthorDescription;
