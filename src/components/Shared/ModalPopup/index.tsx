import { FC } from 'react';
import * as styles from './styles';
// import IconClose from '@public/icon-close.png';

type AppProps = {
  handleClose: () => void;
};

const ModalPopup: FC<AppProps> = ({ handleClose, children }) => (
  <div css={styles.modalPopup}>
    <div css={styles.backDrop}></div>
    <div css={styles.modalBody}>
      {/* <div css={styles.closeBtn} onClick={handleClose}>
        <Image src={IconClose} alt="Close" />
      </div> */}
      {children}
    </div>
  </div>
);

export default ModalPopup;
