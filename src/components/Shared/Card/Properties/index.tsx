import { colors, mixins } from '@styles/shared';
import { FC } from 'react';
import * as styles from './styles';
import { DividerLine } from '@components/Shared';
import { css } from '@emotion/react';
import Typography from '@styles/shared/typography';
import { PROPERTY_GRADIENT_BORDER } from '@utils/constants';

interface CardPropertiesProps {
  title: string;
  propertyId: number;
  subtitle: string;
  content?: string;
  rarityPercentage?: number | null;
}

const CardProperties: FC<CardPropertiesProps> = ({
  title,
  subtitle,
  content,
  rarityPercentage,
  propertyId,
}) => {
  return (
    <div
      css={[
        styles.gradientBackground,
        {
          background:
            rarityPercentage && rarityPercentage < 3
              ? colors.Properties_Gradient_Border_1
              : rarityPercentage && rarityPercentage < 10
              ? colors.Properties_Gradient_Border_2
              : colors.Properties_Gradient_Border_3,
        },
      ]}
    >
      <div css={styles.propertiesContent}>
        <span css={styles.propertiesContentTitle}>{title}</span>
        <aside css={styles.propertiesContentSubTitle}>{subtitle}</aside>
        {(content || rarityPercentage) && (
          <div css={styles.propertiesContentBlock}>
            <DividerLine addStyles={css({ margin: 0 })} />
            <span css={mixins.flexAlignJustifiedCenter}>
              {content ? (
                content
              ) : (
                <span>
                  <span css={css({ ...Typography.T_12_Bold })}>
                    {rarityPercentage}%
                  </span>
                  {` `}
                  have this trait
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProperties;
