import * as styles from './styles';
import { PrimaryButton } from '@components/Shared';
import React, { FC, Fragment } from 'react';
import { useTranslate } from '@utils/useTranslate';

interface BenefitButtonProps {
  benefits: number;
  onClick?: () => void;
}

const BenefitButton: FC<BenefitButtonProps> = ({ benefits, onClick }) => {
  const { translate } = useTranslate();
  return (
    <Fragment>
      {benefits > 0 && (
        <PrimaryButton
          addStyles={styles.benefitPrimaryButton}
          onClick={onClick}
        >
          {benefits === 1
            ? benefits + ` ` + translate(`BENEFIT`)
            : benefits + ` ` + translate(`BENEFITS`)}
        </PrimaryButton>
      )}
    </Fragment>
  );
};

export default BenefitButton;
