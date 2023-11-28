import { FC } from 'react';
import * as styles from './styles';
import ClubCardTag from '@components/Clubs/Card/Tag';
import { mixins } from '@styles/shared';
import LogoHolder from '@components/Clubs/Card/LogoHolder';
import { css } from '@emotion/react';
import { BottomFadeInAnimation } from '@components/Shared';

interface ClubCardProps {
  title: string;
  logo: string;
  noOfNotification: number;
  noOfMembers: number;
  onClick: () => void;
  noOfCard: number;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

const ClubCard: FC<ClubCardProps> = ({
  title,
  logo,
  noOfNotification,
  noOfMembers,
  onClick,
  colors,
  noOfCard,
}) => {
  return (
    <BottomFadeInAnimation
      delay={noOfCard / 10}
      addedStyle={styles.container}
      onClick={onClick}
    >
      <div
        css={[
          css({
            background: colors.primary,
            backgroundImage: `linear-gradient(135deg, ${colors.primary} 55%, ${colors.secondary} 55%,${colors.secondary} 70%,${colors.tertiary} 70%)`,
          }),
          styles.colorBox,
        ]}
      />
      <LogoHolder image={logo} />
      <div css={styles.detailsBox}>
        <div css={[mixins.flexJustifiedBetween, mixins.flexAlignStart]}>
          <span css={styles.title}>{title}</span>
          {noOfNotification > 0 && (
            <ClubCardTag text={`${noOfNotification} NEW`} />
          )}
        </div>
        <span css={styles.subTitle}>{`${noOfMembers} Members`}</span>
      </div>
    </BottomFadeInAnimation>
  );
};

export default ClubCard;
