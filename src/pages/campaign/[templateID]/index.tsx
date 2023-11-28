import React, { useEffect, useRef, useState } from 'react';
import { utils } from '@styles/shared';
import { useRouter } from 'next/router';
import CTAButton from '@components/clientCollection/CTAButton';
import {
  cardAccessText,
  descriptionText,
  descriptionTitle,
  imageWidth,
  nftCardContainer,
  nftContainer,
} from '@components/clientCollection/style';
import parse from 'html-react-parser';
import { NFTCard } from '@components/clientCollection/NFTCard';
import toast from 'react-hot-toast';
import { fetchCollectionTemplateDetails } from '@actions/collections';
import { FullScreenKiteLoader } from '@components/Shared';

type CollectionTemplateType = {
  name: string;
  image: string;
  description: string;
  listings: {
    name: string;
    description: string;
    image: string;
    price: string;
    currency: string;
    listing_uuid: string;
  }[];
};

const ClientCollections = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CollectionTemplateType | null>(null);
  /* const { trackPage, trackClick } = useAnalytics(); */

  useEffect(() => {
    if (router.isReady && typeof router.query.templateID === `string`) {
      fetchCollectionTemplateDetails(router.query.templateID)
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          toast.error(`Couldn't fetch collection details`);
        });
    }
  }, [router.isReady, router.query.templateID]);

  if (data === null) {
    return (
      <FullScreenKiteLoader isOpen>
        <></>
      </FullScreenKiteLoader>
    );
  } else {
    return (
      <div>
        <img
          src={data.image}
          alt="logo"
          css={imageWidth}
          width="100%"
          height="100%"
        />
        <p css={cardAccessText}>{data.name}</p>

        <CTAButton
          onClick={() => {
            if (ref.current) {
              ref.current.scrollIntoView({ behavior: `smooth` });
            }
          }}
          ctaText={`Buy Now`}
        />
        <div css={[utils.pl(16), utils.pr(16)]}>
          <div css={[utils.mt(24), utils.mb(24)]}>
            <p css={descriptionTitle}>Description</p>
            <div css={descriptionText}>{parse(data.description)}</div>
          </div>
          <div ref={ref} css={[nftContainer, utils.mt(24)]}>
            {data.listings.map((collection, i) => (
              <div key={i} css={nftCardContainer}>
                <NFTCard
                  key={i}
                  nftImgSrc={collection.image}
                  nftName={collection.name}
                  nftPrice={`${collection.price} ${collection.currency}`}
                  nftQty={`` /* nft.quantity */}
                  onClick={() =>
                    router.push(`/purchase-nft/${collection.listing_uuid}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ClientCollections;
