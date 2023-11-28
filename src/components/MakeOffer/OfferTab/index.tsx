import react from 'react';
import * as Constants from '@utils/constants';
import { mixins, utils } from '@styles/shared';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';
import { CLICK } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';

export default function OfferTab(props: {
  activeTab: Constants.OfferType;
  onActiveTabChange: (tab: Constants.OfferType) => void;
}) {
  const { translate } = useTranslate();
  const { trackClick } = useAnalytics();
  return (
    <div css={[mixins.flexAlignJustifiedCenter, utils.ml(18), utils.mr(18)]}>
      <div
        onClick={() => {
          trackClick(CLICK.OFFERS_RECEIVED);
          props.onActiveTabChange(Constants.OfferType.OFFERRECEIVE);
        }}
        css={[
          styles.tabContainer,
          props.activeTab === Constants.OfferType.OFFERRECEIVE &&
            styles.tabActiveContainer,
        ]}
      >
        <span
          css={[
            styles.tabContent,
            props.activeTab === Constants.OfferType.OFFERRECEIVE &&
              styles.tabActiveContent,
          ]}
        >
          {translate(`OFFER_RECEIVED`)}
        </span>
      </div>
      <div
        css={[
          styles.tabContainer,
          props.activeTab === Constants.OfferType.OFFERMADE &&
            styles.tabActiveContainer,
        ]}
        onClick={() => {
          trackClick(CLICK.OFFERS_MADE);
          props.onActiveTabChange(Constants.OfferType.OFFERMADE);
        }}
      >
        <span
          css={[
            styles.tabContent,
            props.activeTab === Constants.OfferType.OFFERMADE &&
              styles.tabActiveContent,
          ]}
        >
          {translate(`OFFERS_MADE`)}
        </span>
      </div>
    </div>
  );
}
