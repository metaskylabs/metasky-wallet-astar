import { FC, Fragment, ReactNode } from 'react';
import * as styles from './styles';
import { mixins } from '@/styles/shared';
import { utils } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';
interface TableRowProps {
  title: string;
  children: ReactNode;
  addStyles?: SerializedStyles;
}

const TableRow: FC<TableRowProps> = ({ title, children, addStyles }) => {
  return (
    <Fragment>
      <div css={[styles.tableRowContainer, { ...addStyles }]}>
        <div>{title}</div>
        {children}
      </div>
    </Fragment>
  );
};

export default TableRow;
