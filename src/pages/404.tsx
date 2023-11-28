import { FC, Fragment, useEffect } from 'react';
import * as styles from '@styles/Modules/404';
import AssetsImg from '@public/images';
import { Header } from '@components/Shared';
import TertiaryButton from '@components/Shared/Button/TertiaryButton';
import { useRouter } from 'next/router';
import { utils } from '@styles/shared';
import { Pages } from '@utils/navigation';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { EVENT_PAGE } from '@constants/analytics';

export const CustomError404: FC = () => {
  const router = useRouter();
  const { translate } = useTranslate();
  const { trackPage } = useAnalytics();

  useEffect(() => {
    trackPage(EVENT_PAGE.ERROR);
  }, []);
  return (
    <Fragment>
      <Header title="" />
      <div css={[styles.contentBox, utils.heightPercent(100)]}>
        <div>
          <div css={styles.errorIcon}>
            <img src={AssetsImg.i_exclamation.src} alt="" />
          </div>
          <div css={styles.contentWrapper}>
            <h2 css={styles.contentTitle}>{translate(`404_TITLE`)}</h2>
            <div css={styles.contentInfo}>
              <span css={styles.contentDescription}>
                {translate(`404_SUBTITLE`)}
                <TertiaryButton
                  text="homepage"
                  onClick={() => router.push(Pages.HOME)}
                  addStyles={styles.button}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function Customs404() {
  return <CustomError404 />;
}
