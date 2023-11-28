import * as styles from './styles';
import { Fragment } from 'preact';
import { css } from '@emotion/react';
import { typography } from '@styles/shared';
import { textTruncate } from '@utils/helper';
import { FC } from 'react';
import AssetsImg from '@public/images';

interface FromToDetailsProps {
  title: string;
  image?: string;
  name?: string;
  addressOrNumber: string;
}
const FromToDetails: FC<FromToDetailsProps> = ({
  title,
  image,
  name,
  addressOrNumber,
}) => {
  return (
    <Fragment>
      <div css={styles.title}>{title}</div>
      <div css={styles.userDetails}>
        {image && (
          <div css={styles.profileImgContainer}>
            <img
              width="100%"
              height="100%"
              src={image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = AssetsImg.ic_avatar.src;
              }}
            />
          </div>
        )}
        <div css={styles.userContent}>
          {name && <span css={css({ ...typography.T_16_Bold })}>{name}</span>}
          <span css={css({ ...typography.T_14_Regular })}>
            {addressOrNumber?.length > 0 && addressOrNumber?.length > 20
              ? textTruncate(addressOrNumber, 10, 10)
              : addressOrNumber}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default FromToDetails;
