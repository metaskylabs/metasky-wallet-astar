import * as styles from './styles';
import { FC, useEffect } from 'react';
import AssetsImg from '@public/images';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as profileState } from '@reducers/user';
import { getBalanceSummary } from '@actions/profile';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { getCurrencySymbol } from '@constants/currency';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface ProfileSectionHomeProps {
  openProfilePanel: () => void;
}
const ProfileSectionHome: FC<ProfileSectionHomeProps> = ({
  openProfilePanel,
}) => {
  const router = useRouter();
  const user = useSelector<StoreState, profileState>((state) => state.user);
  const { profile } = useSelector<StoreState, profileState>(
    (state) => state.user,
  );
  const { trackClick, trackPage } = useAnalytics();
  async function fetchBalanceSummary() {
    try {
      await getBalanceSummary();
    } catch (err) {
      handleErrorMessage(err);
    }
  }

  useEffect(() => {
    if (user.isLogin) {
      fetchBalanceSummary();
    }
  }, [user.isLogin]);
  return (
    <section css={styles.container}>
      <img src={AssetsImg.i_mascot.src} css={styles.bgImage} />
      <div css={styles.greeting}>
        <div css={styles.greetInfo}>
          {profile?.name}
          <div
            css={styles.walletCta}
            onClick={() => {
              router.push(Pages.HOME);
              trackClick(CLICK.GO_TO_WALLET);
            }}
          >
            Go to Wallet
          </div>
        </div>
        <div
          css={styles.profileCtaContainer}
          onClick={() => {
            trackClick(CLICK.HAMBURGER_HOME);
            trackPage(EVENT_PAGE.PROFILE);
            openProfilePanel();
          }}
        >
          <img src={AssetsImg.ic_hamburger.src} css={styles.hamburger} />
        </div>
      </div>
      <div css={styles.worthWrapper}>
        <div css={styles.card}>
          <h3 css={styles.cardHeading}>NFTs</h3>
          <p css={styles.count}>
            {user.summary ? (
              user.summary?.total_nft_count
            ) : (
              <div css={styles.placeHolder}></div>
            )}
          </p>
          <img src={AssetsImg.i_home_nft_card.src} css={styles.cardImage} />
        </div>
        <div css={styles.card}>
          <img src={AssetsImg.i_home_coin_card.src} css={styles.cardImage} />
          <h3 css={styles.cardHeading}>Coins worth</h3>
          {user.summary ? (
            <p css={styles.count}>
              {getCurrencySymbol(user.summary.fiat_currency)}
              {user.summary?.total_fiat_value}
            </p>
          ) : (
            <div css={styles.placeHolder}></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSectionHome;
