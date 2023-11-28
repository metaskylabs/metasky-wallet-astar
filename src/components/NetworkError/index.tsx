import { Header } from '@components/Shared';
import { FC, Fragment, ReactNode } from 'react';
import Image from 'next/image';
import * as styles from '@styles/Modules/404';
import AssetsImg from '@public/images';
import { SerializedStyles } from '@emotion/react';
import { useTranslate } from '@utils/useTranslate';

interface NetworkErrorProps {
  isBackEnabled?: boolean;
  customBack?: () => void;
  children?: ReactNode;
  addStyles?: SerializedStyles;
}

const NetworkError: FC<NetworkErrorProps> = ({
  isBackEnabled,
  customBack,
  children,
  addStyles,
}) => {
  const { translate } = useTranslate();
  return (
    <Fragment>
      {isBackEnabled && (
        <div>
          <Header title="" isBackEnabled={true} customBack={customBack} />
        </div>
      )}
      <div css={styles.contentBox}>
        <div>
          <div css={styles.errorIcon}>
            <Image src={AssetsImg.i_exclamation} alt="ERROR" />
          </div>
          <div css={styles.contentWrapper}>
            <h2 css={styles.contentTitle}>{translate(`NETWORK_ERROR`)}</h2>
            <div css={styles.contentInfo}>
              <span css={[styles.contentDescription, { ...addStyles }]}>
                {children ? children : translate(`NETWORK_ERROR_DESCRIPTION`)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NetworkError;
