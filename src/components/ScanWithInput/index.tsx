import { useEffect, useRef, useState } from 'react';
import { Input, PrimaryButton } from '@components/Shared';
import * as styles from './styles';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK } from '@constants/analytics';
import QrScanner from 'qr-scanner';
import NOOB from '@constants/noob';

export default function ScanWithInput(props: {
  title: string;
  buttonName: string;
  inputLabel: string;
  inputPlaceholder: string;
  onScanComplete: (text: string) => void;
  onClose?: () => void;
  disableInput?: boolean;
}) {
  const [uri, setUri] = useState(``);
  const { trackClick } = useAnalytics();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const scanner = new QrScanner(
      videoRef.current!,
      (result: any) => {
        props.onScanComplete(result);
      },
      NOOB,
    );
    scanner.start();
    return () => {
      scanner.destroy();
    };
  }, [open]);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <HeaderWithButtonLayout
      onClose={props.onClose}
      ctaContent={
        <div css={styles.ctaContainer}>
          <PrimaryButton
            onClick={() => {
              if (uri) props.onScanComplete(uri);
              trackClick(CLICK.CONTINUE_HOME_SCAN);
            }}
            addStyles={styles.cta}
          >
            {props.buttonName}
          </PrimaryButton>
        </div>
      }
    >
      <div css={styles.innerWrapper}>
        <div css={styles.scanRoot}>
          <div css={styles.scanCodeContainer}>
            <em css={styles.guidelineContainer}>
              <div css={styles.guidelines}>
                <span></span>
                <span></span>
              </div>
            </em>
            <video
              ref={videoRef}
              style={{ width: `100%`, height: `100%`, objectFit: `cover` }}
            ></video>
          </div>
        </div>

        {!props.disableInput && (
          <>
            <div css={styles.orText}>OR</div>
            <div>
              <div css={styles.inputLabel}>{props.inputLabel}</div>
              <Input
                addStylesToContainer={styles.inputContainer}
                getInputText={(value) => setUri(value)}
                value={uri}
                isEnable
                placeholder={props.inputPlaceholder}
                type={`text`}
              />
            </div>
          </>
        )}
      </div>
    </HeaderWithButtonLayout>
  );
}
