import { FC, ReactNode } from 'react';
import * as styles from './styles';

export interface ShadowInsideCardProps {
  listData: Array<{
    value?: string;
    title?: string;
    customComponent?: ReactNode;
  }>;
}
const ShadowInsideCard: FC<ShadowInsideCardProps> = ({ listData }) => {
  return (
    <div css={styles.container}>
      {listData.map((prop, index) => {
        return (
          <>
            {prop.customComponent ? (
              prop.customComponent
            ) : (
              <div css={styles.informationBox} key={index}>
                <span css={styles.data}>{prop.value}</span>
                <span css={styles.title}>{prop.title}</span>
              </div>
            )}
            {index < listData.length - 1 && <span css={styles.divider}></span>}
          </>
        );
      })}
    </div>
  );
};
export default ShadowInsideCard;
