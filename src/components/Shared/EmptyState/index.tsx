import { FC, ReactNode } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';

interface EmptyStateProps {
  children?: ReactNode;
  title: string;
  subTitle: string;
  icon?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  children,
  title,
  subTitle,
  icon,
}) => {
  return (
    <div css={styles.container}>
      <div css={styles.contentContainer}>
        <img
          src={icon ? icon : AssetsImg.i_payment.src}
          alt=""
          css={styles.emptyImg}
        />
        <h3 css={styles.title}>{title}</h3>
        {subTitle && <p css={styles.subTitle}>{subTitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default EmptyState;
