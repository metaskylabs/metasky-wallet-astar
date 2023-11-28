import react from 'react';
import * as Constants from '@utils/constants';
import { mixins, utils } from '@styles/shared';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';

export default function Tab(props: {
  activeTab: Constants.TransferType;
  onActiveTabChange: (tab: Constants.TransferType) => void;
}) {
  const { translate } = useTranslate();
  return (
    <div css={[mixins.flexAlignJustifiedCenter, utils.ml(18), utils.mr(18)]}>
      <div
        onClick={() => props.onActiveTabChange(Constants.TransferType.SEND)}
        css={[
          styles.tabContainer,
          props.activeTab === Constants.TransferType.SEND &&
            styles.tabActiveContainer,
        ]}
      >
        <span
          css={[
            styles.tabContent,
            props.activeTab === Constants.TransferType.SEND &&
              styles.tabActiveContent,
          ]}
        >
          {translate(`SEND`)}
        </span>
      </div>
      <div
        css={[
          styles.tabContainer,
          props.activeTab === Constants.TransferType.RECEIVE &&
            styles.tabActiveContainer,
        ]}
        onClick={() => props.onActiveTabChange(Constants.TransferType.RECEIVE)}
      >
        <span
          css={[
            styles.tabContent,
            props.activeTab === Constants.TransferType.RECEIVE &&
              styles.tabActiveContent,
          ]}
        >
          {translate(`RECEIVE`)}
        </span>
      </div>
    </div>
  );
}
