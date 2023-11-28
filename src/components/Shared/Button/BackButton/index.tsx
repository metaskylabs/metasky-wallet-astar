import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { SerializedStyles } from '@emotion/react';
import { mixins } from '@styles/shared';
import useCustomBack from '@utils/hooks/custom-back';

interface backButtonProps {
  addStyles?: SerializedStyles;
  customBack?: () => void;
}

const BackButton: FC<backButtonProps> = (props) => {
  const { onBack } = useCustomBack();

  const handleBackRoute = () => {
    if (props.customBack) {
      props.customBack();
    } else {
      onBack();
    }
  };

  return (
    <div
      css={[styles.backButtonContainer, { ...props.addStyles }]}
      onClick={handleBackRoute}
    >
      <button css={[mixins.flexAlignJustifiedCenter, styles.backButton]}>
        <img src={AssetsImg.ic_backArrowBlue.src} alt="back" />
      </button>
    </div>
  );
};

export default BackButton;
