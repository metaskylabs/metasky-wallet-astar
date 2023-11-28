import { NFTCardDescription, NFTCardImg, NFTMainCard } from './styles';

type NFTCardType = {
  nftImgSrc: string;
  nftName: string;
  nftPrice: string;
  nftQty: string;
  onClick: () => void;
};

export const NFTCard = ({
  nftImgSrc,
  nftName,
  nftPrice,
  nftQty,
  onClick,
}: NFTCardType) => {
  return (
    <div css={NFTMainCard} onClick={onClick}>
      <div>
        <img css={NFTCardImg} src={nftImgSrc} alt={`${nftName} NFT`} />
      </div>
      <div css={NFTCardDescription}>
        <p className="cardHeader">{nftName}</p>
        <div className="cardPurchaseDetails">
          <p className="cardPrice">{nftPrice}</p>
          {nftQty && (
            <>
              &middot;
              <p>{nftQty} available</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
