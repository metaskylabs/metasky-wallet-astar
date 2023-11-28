import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';

interface BottomFadeInAnimationProps {
  children: ReactNode;
  delay?: number;
  addedStyle?: SerializedStyles;
  onClick?: () => void;
}

const BottomFadeInAnimation: FC<BottomFadeInAnimationProps> = ({
  children,
  delay = 0.3,
  addedStyle,
  onClick,
}) => {
  return (
    <motion.div
      css={addedStyle}
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay,
        default: { duration: 0.3 },
        ease: `easeIn`,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default BottomFadeInAnimation;
