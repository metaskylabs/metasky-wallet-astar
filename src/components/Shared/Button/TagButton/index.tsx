import { colors } from '@styles/shared';
import { FC } from 'react';
import * as styles from './styles';

interface TagButtonProps {
  text: string;
  activeTab: boolean;
  onClick: () => void;
}

const TagButton: FC<TagButtonProps> = ({ text, onClick, activeTab }) => {
  return (
    <section
      css={[styles.container, activeTab && styles.activeTab]}
      onClick={onClick}
    >
      <p css={[styles.text, activeTab && styles.activeText]}>{text}</p>
    </section>
  );
};

export default TagButton;
