import AssetsImg from '@public/images';
import { mixins, typography, utils } from '@styles/shared';
import Image from 'next/image';
import { FC, Fragment } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
interface BurnMintAssetInfoProps {
  items: { title: string; value: string[] }[];
}

const BurnMintAssetInfo: FC<BurnMintAssetInfoProps> = ({ items }) => {
  return (
    <div css={[styles.container, mixins.flexColumn]}>
      {items.map((item, index) => {
        return (
          <div key={index} css={{ margin: `${utils.remConverter(10)} 0` }}>
            <div css={[styles.title]}>{item.title}</div>
            {item.value.map((value, index) => (
              <div css={styles.name} key={index}>
                <span css={[styles.item]}>{value}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default BurnMintAssetInfo;
