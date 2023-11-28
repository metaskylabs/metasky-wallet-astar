import { getWalletAnnouncements, getWalletBenefits } from '@actions/wallet';
import AssetsImg from '@public/images';
import {
  WalletAnnouncements,
  WalletBenefitsResponse,
} from '@typings/api/wallet';
import { Pages } from '@utils/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import { BlueBanner } from './BlueBanner';

const HomePageBanner: FC = () => {
  const [walletBenefits, setWalletBenefits] = useState<
    WalletBenefitsResponse[]
  >([]);
  const [announcements, setAnnouncements] = useState<WalletAnnouncements[]>([]);

  const [isBenefitsListLoading, setIsBenefitsLoading] = useState<boolean>(true);

  const fetchBenefits = useCallback(async () => {
    try {
      setIsBenefitsLoading(true);
      const [benefits, announcements] = await Promise.allSettled([
        getWalletBenefits(`/wallet/benefits`),
        getWalletAnnouncements(),
      ]);
      if (announcements.status === `fulfilled`) {
        setAnnouncements(announcements.value);
      } else {
        setAnnouncements([]);
      }
      if (benefits.status === `fulfilled`) {
        setWalletBenefits(benefits.value.data);
      } else {
        setWalletBenefits([]);
      }
      setIsBenefitsLoading(false);
    } catch (err) {
      setAnnouncements([]);
      setWalletBenefits([]);
    }
  }, []);

  useEffect(() => {
    fetchBenefits();
  }, [fetchBenefits]);

  return (
    <>
      {!isBenefitsListLoading && walletBenefits.length > 0 ? (
        <BlueBanner
          title={`You have ${walletBenefits.length} benefits. Click here to view.`}
          ctaLink={Pages.ALL_BENEFITS}
          imgSrc={AssetsImg.ic_gift.src}
        />
      ) : (
        <></>
      )}
      {announcements.map((announcement, index) => (
        <BlueBanner
          title={announcement.title}
          ctaLink={announcement.ctaLink}
          imgSrc={AssetsImg.ic_gift.src}
          key={index}
        />
      ))}
    </>
  );
};

export default HomePageBanner;
