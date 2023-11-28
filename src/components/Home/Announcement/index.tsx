/** @jsxImportSource @emotion/react */
import * as styles from './styles';
import { mixins, utils } from '@styles/shared';
import { FC } from 'react';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';
import { CLICK } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';

interface AnnouncementProps {
  title: string;
  description: string;
  backgroundColor: string;
  image: string;
  handleClick?: () => void;
  ctaType: string;
  ctaLink: string;
}

const Announcement: FC<AnnouncementProps> = ({
  title,
  description,
  image,
  backgroundColor,
  handleClick,
  ctaType,
  ctaLink,
}) => {
  const { trackClick } = useAnalytics();

  const handleCTAClick = () => {
    if (ctaType && ctaLink) {
      handleClick && handleClick();
      trackClick(CLICK.ANNOUNCEMENT_BANNER, { announcement_title: title });
    }
  };

  return (
    <section
      css={[
        styles.AnnouncementSectionContainer,
        mixins.flexAlignCenterJustifiedStart,
        ctaType && ctaLink && mixins.cursorPointer,
        {
          background: backgroundColor,
        },
      ]}
      onClick={handleCTAClick}
    >
      <div css={[mixins.flexAlignJustifiedCenter]}>
        <img
          src={image}
          alt="announcementLogo"
          width="100%"
          height="100%"
          css={styles.megaPhone}
        />
      </div>
      <div
        css={[
          styles.AnnouncementSectionReminder,
          mixins.flexAlignBaselineJustifiedBetween,
          mixins.flexColumn,
        ]}
      >
        <h2 css={[styles.AnnouncementSectionTitle, utils.mb(4)]}>{title}</h2>
        <p css={styles.AnnouncementSectionContent}>{description}</p>
        {ctaType && ctaLink && (
          <div css={styles.announcementCta}>
            <p>CLICK HERE</p>
            <img src={AssetsImg.ic_rightArrowThick.src} css={styles.ctaImg} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcement;
