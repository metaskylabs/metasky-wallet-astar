import { Fragment } from 'react';
import { mixins } from '@styles/shared';
import * as styles from './styles';
import { QrReader } from 'react-qr-reader';
import { useTranslate } from '@utils/useTranslate';

interface ScanProps {
  onSuccess: (address: string) => void;
  displayText?: string;
  hideTitle?: boolean;
}

export default function Scan({ onSuccess, displayText, hideTitle }: ScanProps) {
  const { translate } = useTranslate();

  const handleScan = (result: any, error: any) => {
    if (result) {
      onSuccess(result.text);
    }
  };

  return (
    <Fragment>
      <div css={styles.mainContainer}>
        <div css={styles.wrapper}>
          <div css={styles.scanCodeContainer}>
            <em css={styles.guidelineContainer}>
              <div css={styles.guidelines}>
                <span></span>
                <span></span>
              </div>
            </em>
            <QrReader
              onResult={handleScan}
              scanDelay={300}
              constraints={{ facingMode: `environment` }}
            />

            {!hideTitle && (
              <div
                css={[styles.scanContainer, mixins.flexAlignJustifiedCenter]}
              >
                <span css={styles.scanContent}>
                  {displayText || translate(`SCANNER_TEXT`)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
