import { FC, Fragment } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { InputBase, PrimaryButton } from '../Shared';
import { mixins } from '@styles/shared';
import * as Constants from '@utils/constants';
import NOOB from '@constants/noob';
//comment not in use
const SendNFt: FC = () => {
  return (
    <Fragment>
      {/*<div css={[styles.sendnftHeader, mixins.flexAlignCenter]}>*/}
      {/*  <div css={[styles.sendnftImage, mixins.flexAlignJustifiedCenter]}>*/}
      {/*    <img src={AssetsImg.ic_sendnft.src} alt="sendnft" />*/}
      {/*  </div>*/}
      {/*  <span css={styles.sendnftTitle}>{Constants.nftList.sendNft}</span>*/}
      {/*</div>*/}
      {/*<form css={[mixins.flexColumn]}>*/}
      {/*  <InputBase*/}
      {/*    label="Asset"*/}
      {/*    labelIcon={AssetsImg.ic_formAsset.src}*/}
      {/*    labelIconName="asset"*/}
      {/*    inputIcon={AssetsImg.ic_arrowDown.src}*/}
      {/*    inputIconName="arrowDown"*/}
      {/*    type={Constants.InputType.text}*/}
      {/*    placeholder=""*/}
      {/*  />*/}
      {/*  <InputBase*/}
      {/*    label="Count"*/}
      {/*    labelIcon={AssetsImg.ic_formCount.src}*/}
      {/*    labelIconName="count"*/}
      {/*    inputIcon={AssetsImg.ic_arrowDown.src}*/}
      {/*    inputIconName="arrowDown"*/}
      {/*    type={Constants.InputType.number}*/}
      {/*    placeholder="No. of NFTs"*/}
      {/*  />*/}
      {/*  <InputBase*/}
      {/*    label="To"*/}
      {/*    labelIcon={AssetsImg.ic_formMobile.src}*/}
      {/*    labelIconName="mobile"*/}
      {/*    inputIcon={AssetsImg.ic_formScan.src}*/}
      {/*    inputIconName="scan"*/}
      {/*    type={Constants.InputType.number}*/}
      {/*    placeholder="Mobile Number / Address"*/}
      {/*  />*/}
      {/*  <InputBase*/}
      {/*    label="Note"*/}
      {/*    labelIcon={AssetsImg.ic_formEdit.src}*/}
      {/*    labelIconName="edit"*/}
      {/*    inputIcon={AssetsImg.ic_formScan.src}*/}
      {/*    inputIconName="scan"*/}
      {/*    type={Constants.InputType.text}*/}
      {/*    placeholder="Enter Note"*/}
      {/*  />*/}
      {/*  <div css={[styles.sendNftBtnWrapper]}>*/}
      {/*    <PrimaryButton addStyles={styles.sendNftBtn}>SEND NFT</PrimaryButton>*/}
      {/*  </div>*/}
      {/*</form>*/}
    </Fragment>
  );
};

export default SendNFt;
