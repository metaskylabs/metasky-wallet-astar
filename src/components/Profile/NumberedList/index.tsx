import * as styles from './styles';
import { FC } from 'react';

interface NumberedListProps {
  instruction: string;
  id: number;
}

const NumberedList: FC<NumberedListProps> = ({ id, instruction }) => {
  return (
    <div css={styles.container}>
      <div>
        <div css={styles.id}>{id}</div>
      </div>
      <div css={styles.instruction}>{instruction}</div>
    </div>
  );
};

export default NumberedList;
