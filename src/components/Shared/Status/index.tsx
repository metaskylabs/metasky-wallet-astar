/** @jsxImportSource @emotion/react */
import * as styles from './styles';
import { FC } from 'react';
import { colors, mixins, typography } from '@styles/shared';
import { OfferFilter } from '@utils/constants';

interface StatusProps {
  statusType: string | undefined;
}

const AccountStatus: FC<StatusProps> = ({ statusType }) => {
  return (
    <div
      css={[
        styles.container,
        statusType === OfferFilter.ACCEPTED && {
          backgroundColor: colors.Primary_Blue,
        },
        statusType === OfferFilter.REJECTED && {
          backgroundColor: colors.Tertiary_Red,
        },
        statusType === OfferFilter.DELETED && {
          backgroundColor: colors.Tertiary_Red,
        },
        statusType === OfferFilter.PENDING && {
          backgroundColor: colors.Tertiary_Darker_Yellow,
          color: colors.Secondary_Black_Text,
        },
      ]}
    >
      <h2 css={[typography.T_12_Regular, mixins.capitalizeText]}>
        {statusType}
      </h2>
    </div>
  );
};

export default AccountStatus;
