import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';

import React from 'react';
import * as styles from './styles';

const UpdateEmptyState = () => {
  return (
    <section css={[mixins.flexAlignJustifiedCenter, mixins.flexColumn]}>
      <img src={AssetsImg.ic_nftEmpty.src} alt="" width="164" height="164" />
      <p css={styles.emptyNotificationDescription}>
        {/*FIXME : add proper text*/}
        {/*{NotificationUpdates.emptyDescription}*/}
      </p>
    </section>
  );
};

export default UpdateEmptyState;
