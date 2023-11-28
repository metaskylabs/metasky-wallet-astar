import React, { FC } from 'react';
import { HeaderWithCloseAndBack } from '@components/Shared';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';

interface HeaderWithButtonLayoutProps {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  ctaContent?: React.ReactNode;
  wrapperStyles?: SerializedStyles;
  secondaryBack?: boolean;
  hideHeader?: boolean;
}

const HeaderWithButtonLayout: FC<HeaderWithButtonLayoutProps> = ({
  children,
  title,
  onBack,
  onClose,
  ctaContent,
  wrapperStyles,
  secondaryBack,
  hideHeader,
}) => {
  return (
    <div css={[styles.container, wrapperStyles]}>
      {!hideHeader && (title || onBack || onClose) && (
        <div css={styles.headerContainer}>
          <HeaderWithCloseAndBack
            onClose={onClose}
            onBack={onBack}
            isBackEnabled={!!onBack}
            secondaryBack={secondaryBack}
            title={title}
          />
        </div>
      )}

      <div css={styles.contentContainer}>{children}</div>
      {ctaContent && <div css={styles.ctaContainer}>{ctaContent}</div>}
    </div>
  );
};

export default HeaderWithButtonLayout;
