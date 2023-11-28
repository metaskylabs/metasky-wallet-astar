import AssetsImg from '@public/images';
import { mixins, typography, utils } from '@styles/shared';
import Image from 'next/image';
import { FC, Fragment } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
interface DetailCardProps {
  items: { icon: string; key: string; value: string }[];
  tncLink?: string;
}

const DetailCard: FC<DetailCardProps> = ({ items, tncLink }) => {
  return (
    <div css={[styles.container, mixins.flexColumn]}>
      {items.map((item, index) => {
        return (
          <div key={index} css={{ margin: `${utils.remConverter(10)} 0` }}>
            <span css={[styles.descriptionCreatedBy]}>{item.key}</span>
            <div css={styles.descriptionAuthor}>
              {item.icon ? (
                <div
                  css={[
                    styles.descriptionAuthorImage,
                    mixins.flexAlignJustifiedCenter,
                  ]}
                >
                  <img
                    src={item.icon}
                    alt={item.key}
                    width="100%"
                    height="100%"
                    css={styles.authorImage}
                  />
                </div>
              ) : null}
              <span css={[styles.descriptionAuthorName]}>{item.value}</span>
            </div>
          </div>
        );
      })}
      {tncLink && (
        <a
          css={{
            margin: `${utils.remConverter(10)} 0`,
            ...typography.T_14_Bold,
          }}
          href={tncLink}
          target={`_blank`}
          rel="noreferrer"
        >
          Terms & Conditions<sup>*</sup>
        </a>
      )}
    </div>
  );
};

export default DetailCard;
