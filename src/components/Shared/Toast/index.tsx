import { FC, ReactNode } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { motion } from 'framer-motion';

export enum ToastType {
  INFO = `INFO`,
  ERROR = `ERROR`,
  SUCCESS = `SUCCESS`,
}

interface ToastProps {
  type: string;
  text?: string; //TODO: Remove test dependency by children
  children?: ReactNode;
  onCloseClick?: () => void;
}

const Toast: FC<ToastProps> = ({ type, text, onCloseClick, children }) => {
  const toastBg = (type: string) => {
    switch (type) {
      case ToastType.INFO:
        return styles.info;
      case ToastType.SUCCESS:
        return styles.success;
      default:
        return styles.danger;
    }
  };

  const toastIcon = (type: string) => {
    switch (type) {
      case ToastType.INFO:
        return AssetsImg.ic_iconInfo.src;
      case ToastType.SUCCESS:
        return AssetsImg.ic_iconCheck.src;
      default:
        return AssetsImg.ic_iconCross.src;
    }
  };

  return (
    <motion.div
      css={[styles.container, toastBg(type)]}
      className="mToast-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        default: { duration: 0.25 },
        ease: `easeIn`,
      }}
    >
      <div css={[styles.toastIcon, mixins.flex]}>
        <img src={toastIcon(type)} alt="" />
      </div>
      <div css={[styles.text]}>
        {text}
        {children}
        {/* {bg === ToastType.info && <div css={styles.link}>{children}</div>} */}
      </div>
      {onCloseClick && (
        <img
          src={AssetsImg.ic_iconClose.src}
          alt="Close"
          onClick={onCloseClick}
          css={mixins.flex}
        />
      )}
    </motion.div>
  );
};

export default Toast;
