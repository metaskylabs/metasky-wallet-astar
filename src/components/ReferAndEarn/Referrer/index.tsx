import { PrimaryButton } from '@components/Shared';
import { typography, utils } from '@styles/shared';
import React, { FC } from 'react';
import ReferBanner from '@components/ReferAndEarn/ReferBanner';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';

interface ReferrerProps {
  closeSheet: () => void;
}
const Referrer: FC<ReferrerProps> = ({ closeSheet }) => {
  const router = useRouter();
  const { translate } = useTranslate();
  return (
    <section css={styles.container}>
      <HeaderWithButtonLayout
        title={translate(`REFER_EARN`)}
        ctaContent={
          <PrimaryButton
            onClick={() => {
              router.push(Pages.REFER_AND_EARN);
              closeSheet();
            }}
            addStyles={utils.widthPercent(100)}
          >
            {translate(`REFER_NOW`)}
          </PrimaryButton>
        }
        onClose={closeSheet}
      >
        <ReferBanner
          title={translate(`ENJOYING_METASKY`)}
          subtitle={translate(`REFER_AND_EARN`)}
        />

        <div
          css={[typography.T_16_Bold, utils.ml(16), utils.mr(16), utils.mb(24)]}
        />
      </HeaderWithButtonLayout>
    </section>
  );
};

export default Referrer;
