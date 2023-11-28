import { SerializedStyles } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import * as styles from './styles';

interface ButtonLayoutProps {
  buttonComponent: React.ReactNode;
  addStyles?: SerializedStyles;
  addWrapperStyles?: SerializedStyles;
}

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  buttonComponent,
  children,
  addStyles,
  addWrapperStyles,
}) => {
  const [hasFooter, setHasFooter] = useState(false);

  useEffect(() => {
    setHasFooter(!!buttonComponent);
  }, [buttonComponent]);
  return (
    <section css={[styles.wrapper, { ...addWrapperStyles }]}>
      <article
        css={[
          hasFooter
            ? styles.buttonComponentLayout
            : styles.buttonlessComponentLayout,
        ]}
      >
        {children}
      </article>
      <footer css={[{ ...addStyles }, styles.footer]}>{buttonComponent}</footer>
    </section>
  );
};

export default ButtonLayout;
