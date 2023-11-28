import { FC } from 'react';
import { colors, mixins, typography, utils } from '@styles/shared';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';

interface OfferNotificationBanner {
  message: string;
}

const NotificationBanner: FC<OfferNotificationBanner> = ({ message }) => {
  const router = useRouter();
  return (
    <section
      css={[styles.container, mixins.flexAlignStart]}
      onClick={() => router.push(Pages.OFFER)}
    >
      <img
        src={AssetsImg.ic_announcementPrice.src}
        alt=""
        css={[utils.mr(10)]}
      />
      <p
        css={[
          typography.T_14_Semibold,
          {
            color: colors.Primary_Bg_Grey,
          },
        ]}
      >
        {message}
      </p>
    </section>
  );
};

export default NotificationBanner;
