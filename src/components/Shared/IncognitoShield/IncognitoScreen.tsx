import React from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { useTranslate } from '@utils/useTranslate';

export default function IncognitoScreen() {
  const { translate } = useTranslate();
  return (
    <>
      <div css={styles.container}>
        <div>
          <div css={styles.box}>
            <div css={styles.content}>
              <img src={AssetsImg.ic_private.src} alt={`private`} />
            </div>
          </div>
          <div css={styles.apology}>{translate(`INCOGNITO_ERROR_MESSAGE`)}</div>
          <div css={styles.redirection}>
            {translate(`INCOGNITO_ERROR_DESCRIPTION`)}
          </div>
        </div>

        <div css={styles.query}>
          <p>
            {translate(`FOR_ANY_QUERIES`)}, please write to us on{` `}
            <a href="mailto:support@metasky.ai">support@metasky.ai</a>
          </p>
        </div>
      </div>
    </>
  );
}
