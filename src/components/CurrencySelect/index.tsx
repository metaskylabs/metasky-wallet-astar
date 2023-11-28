import React, { FC, useEffect, useState } from 'react';
import { Fragment } from 'preact';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { logEvent } from '@utils/amplitude';
import { motion } from 'framer-motion';
import * as styles from './styles';
import { mixins, typography, utils } from '@styles/shared';
import CountryCodeSelect from '@components/CountryCodeSelect';
import { InputBaseSecondary, MLottie, PrimaryButton } from '@components/Shared';
import { InputType } from '@utils/constants';
import { CountryCodePayload } from '@typings/api/auth';
import { handleErrorMessage } from '@utils/handleResponseToast';
import {
  buttonArrowIcon,
  buttonArrowOpen,
  selectButton,
} from '@components/CountryCodeSelect/styles';
import AssetsImg from '@public/images';
import noob from '@constants/noob';
import { getCurrencySymbol } from '@constants/currency';

export interface CurrencySelectProps {
  currency?: string;
  someProps?: string;
}

const CurrencySelect: FC<CurrencySelectProps> = ({ currency }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      onClick={() => {
        noob;
      }}
      css={[selectButton, mixins.flexAlignJustifiedCenter]}
    >
      <div css={[typography.T_16_Semibold, mixins.flexAlignJustifiedCenter]}>
        <span>{getCurrencySymbol(currency)}</span>
        {/*<img*/}
        {/*  src={AssetsImg.ic_arrowDownDark.src}*/}
        {/*  alt="arrow"*/}
        {/*  css={[utils.ml(4), isOpen && buttonArrowOpen, buttonArrowIcon]}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default CurrencySelect;
