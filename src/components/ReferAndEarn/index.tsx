import * as styles from './styles';
import { Header, PrimaryButton, SecondaryButton } from '@components/Shared';
import { mixins, utils } from '@styles/shared';
import ReferBanner from './ReferBanner';
import HowItWorks from './HowItWorks';
import SocialInvite from './SocialInvite';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { onCopy } from '@utils/helper';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { State as ReferralState } from '@reducers/referral';
import { useTranslate } from '@utils/useTranslate';

const ReferAndEarn = () => {
  const router = useRouter();
  const { translate } = useTranslate();

  const referral = useSelector<StoreState, ReferralState>(
    (state) => state.referral,
  );

  return (
    <ButtonLayout
      buttonComponent={
        <div
          css={[styles.buttonContainer, mixins.flexAlignCenterJustifiedBetween]}
        >
          <SecondaryButton
            onClick={() => router.push(Pages.MY_REWARD)}
            addStyles={utils.widthPercent(50)}
          >
            {translate(`MY_REWARDS`)}
          </SecondaryButton>
          <PrimaryButton
            onClick={() =>
              referral.link &&
              onCopy(referral.link, translate(`REFERRAL_LINK_COPIED`))
            }
            addStyles={utils.widthPercent(50)}
          >
            {translate(`REFER_NOW`)}
          </PrimaryButton>
        </div>
      }
    >
      <Header
        isBackEnabled={true}
        title={translate(`REFER_EARN`)}
        actionClickHandler={() => ``}
      />
      <section>
        <ReferBanner
          title={translate(`REFER_YOUR_FRIENDS`)}
          subtitle={translate(`AND_EARN_WHEN_THEY_JOIN_METASKY`)}
        />
        <HowItWorks />
        <SocialInvite />
      </section>
    </ButtonLayout>
  );
};

export default ReferAndEarn;
