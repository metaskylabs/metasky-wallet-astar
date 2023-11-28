import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import * as styles from '@styles/Modules/redirect';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as utilsState } from '@reducers/utils';
import { useTranslate } from '@utils/useTranslate';

export default function PleaseClose() {
  const router = useRouter();
  const { isSplashScreen } = useSelector<StoreState, utilsState>(
    (state) => state.utils,
  );
  const { translate } = useTranslate();

  useEffect(() => {
    const id = setTimeout(() => window.close(), 10000);
    return () => clearTimeout(id);
  }, [router.isReady]);

  if (!isSplashScreen) return <></>;

  return (
    <div
      css={[
        styles.purchaseSuccessIcon,
        mixins.flexAlignJustifiedCenter,
        mixins.flexColumn,
      ]}
    >
      <div css={[styles.successIcon, mixins.flexAlignJustifiedCenter]}>
        <img
          src={AssetsImg.ic_transferClock.src}
          alt="success"
          css={styles.successImg}
        />
      </div>
      <h2 css={[styles.purchaseCongratulation]}>
        {translate(`CONFIRMING_PAYMENT`)}
      </h2>
      <p css={[styles.purchaseDescription]}>
        {translate(`AWAITING_PAYMENT_MSSG`)}
      </p>
    </div>
  );
}
