import { FC, Fragment, ReactNode } from 'react';
import * as styles from './styles';
import { mixins } from '@/styles/shared';
import { utils } from '@styles/shared';

interface InfoTableProps {
  icon: string;
  title: string;
  children: ReactNode;
}

const InfoTable: FC<InfoTableProps> = ({ icon, title, children }) => {
  return (
    <Fragment>
      <div css={styles.infoTableContainer}>
        <header css={[styles.header]}>
          <img css={styles.icon} src={icon} alt="" />
          <div css={styles.title}>{title}</div>
        </header>
        <div css={styles.infoContainer}>{children}</div>
      </div>
    </Fragment>
  );
};

export default InfoTable;
