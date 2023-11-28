import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { PrimaryButton } from '@components/Shared';

interface FileAssetProps {
  name: string;
  fileLink: string;
}

const FileAsset: FC<FileAssetProps> = ({ name, fileLink }) => {
  const onClickDownload = () => {
    window.open(fileLink, `_blank`);
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.iconContainer}>
        <span css={styles.iconBg}>
          <img src={AssetsImg.ic_file.src} />
        </span>
      </div>
      <div css={styles.titleContainer}>{name}</div>
      <PrimaryButton onClick={onClickDownload}>Download Now</PrimaryButton>
    </div>
  );
};

export default FileAsset;
