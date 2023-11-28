import { FC, useEffect } from 'react';
import * as styles from './styles';
import parse from 'html-react-parser';
import { useAnalytics } from '@utils/useAnalytics';

interface SecretAsset {
  secret: string;
}

const SecretAsset: FC<SecretAsset> = ({ secret }) => {
  const { trackPage } = useAnalytics();

  useEffect(() => {
    trackPage(`Benefit Claim Secret Text`, { secret: secret });
  }, []);

  return <div css={styles.secretWrapper}>{parse(secret)}</div>;
};

export default SecretAsset;
