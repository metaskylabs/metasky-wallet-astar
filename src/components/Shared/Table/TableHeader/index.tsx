/** @jsxImportSource @emotion/react */
import * as styles from './styles';
import { FC } from 'react';
import { mixins, typography } from '@styles/shared';
import { useTranslate } from '@utils/useTranslate';

interface TableHeaderProps {
  status?: boolean;
  column1Name: string;
  column2Name: string;
}

const TableHeader: FC<TableHeaderProps> = ({
  status,
  column1Name,
  column2Name,
}) => {
  const { translate } = useTranslate();
  return (
    <section css={[styles.container, mixins.flexAlignCenterJustifiedBetween]}>
      <h2 css={typography.T_14_Bold}>{column1Name}</h2>
      <div css={[mixins.flexAlignCenterJustifiedBetween]}>
        <h2 css={typography.T_14_Bold}>{column2Name}</h2>
      </div>
    </section>
  );
};

export default TableHeader;
