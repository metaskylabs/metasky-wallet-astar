import { mixins, typography, utils } from '@styles/shared';
import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import AssetsImg from '@public/images';

type InfoItemProps = {
  title: string;
  subtitle: string;
  rightBorder?: boolean;
  leftBorder?: boolean;
};

interface TokenInformationProps {
  infoItems: {
    title: string;
    subtitle: string;
    onRenderItem?: (props: InfoItemProps) => React.ReactNode;
  }[];
}

export function RarityInfo(props: InfoItemProps) {
  return (
    <div
      css={[
        styles.infoContainer,
        mixins.flexColumn,
        props.rightBorder ? styles.rightVerticalLine : ``,
        props.leftBorder ? styles.leftVerticalLine : ``,
      ]}
    >
      <div css={styles.paddingContainer}>
        <span css={styles.rarityText}>{props.title}</span>
        <aside css={[styles.rarityContainer, mixins.flexAlignCenter]}>
          <img
            css={utils.width(15)}
            src={AssetsImg.ic_rarity_diamond.src}
            alt="rarity"
          />
          <p css={styles.rarityTitle}>{props.subtitle}</p>
        </aside>
      </div>
    </div>
  );
}

function TokenInfo(props: InfoItemProps) {
  return (
    <div
      css={[
        styles.infoContainer,
        mixins.flexColumn,
        props.rightBorder ? styles.rightVerticalLine : ``,
        props.leftBorder ? styles.leftVerticalLine : ``,
      ]}
    >
      <div css={styles.paddingContainer}>
        <span>{props.title}</span>
        <aside css={[typography.T_14_Regular]}>{props.subtitle}</aside>
      </div>
    </div>
  );
}

const TokenInformation: FC<TokenInformationProps> = ({ infoItems }) => {
  if (infoItems.length < 0) return <></>;

  return (
    <div css={[styles.tokenInformationContainer]}>
      {infoItems.map((item, index) => {
        return item.onRenderItem ? (
          item.onRenderItem({
            title: item.title,
            subtitle: item.subtitle,
            leftBorder: false,
            rightBorder: index < infoItems.length - 1,
          })
        ) : (
          <TokenInfo
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            leftBorder={false}
            rightBorder={index < infoItems.length - 1}
          />
        );
      })}
    </div>
  );
};

export default TokenInformation;
