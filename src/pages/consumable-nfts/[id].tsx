import { getConsumableNFTdata } from '@actions/consumableNFT';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import Scan from '@components/Scan';
import {
  BottomPopup,
  FullScreenPopUp,
  Header,
  PrimaryButton,
} from '@components/Shared';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import { StatusType } from '@typings/api/shared';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import * as styles from '@styles/Modules/BenefitsDetails';
import * as consumeNFTstyles from '@styles/Modules/consumableNFTs';
import utils from '@styles/shared/utils';
import ConsumeNFTCard from '@components/Benefits/ConsumeNFTCard';
import Success from '@components/Success';
import AssetsImg from '@public/images';
import Authentication from '@components/Authentication';
import { noSpecialCharacter } from '@utils/regexes';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useUserSession } from '@utils/hooks/useUserSession';

function ConsumableNFTs() {
  const router = useRouter();
  const { query } = router;
  const session = useUserSession();
  const [scanSheetOpen, SetScanSheetOpen] = useState<boolean>(true);
  const [walletUUId, setWalletUUId] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [consumableNFTs, setConsumableNFTs] = useState<{
    status?: StatusType;
    data?: any;
  }>({});

  async function getConsumableNFTs() {
    const benefit_uuid = query.id as string;
    try {
      setConsumableNFTs({ status: StatusType.LOADING });

      if (walletUUId) {
        const payload = noSpecialCharacter.test(walletUUId)
          ? {
              benefit_uuid: benefit_uuid,
              address: walletUUId,
            }
          : {
              benefit_uuid: benefit_uuid,
              user_uuid: walletUUId,
            };
        const response = await getConsumableNFTdata(payload);
        setConsumableNFTs({ status: StatusType.SUCCESS, data: response.data });
      } else {
        setConsumableNFTs({ status: StatusType.ERROR });
      }
    } catch (error) {
      setConsumableNFTs({ status: StatusType.ERROR });
    }
  }

  useEffect(() => {
    if (walletUUId) {
      getConsumableNFTs();
      SetScanSheetOpen(false);
    } else {
      setConsumableNFTs({});
    }
  }, [walletUUId]);

  const handleScanAgain = () => {
    setWalletUUId(``);
    setConsumableNFTs({});
    SetScanSheetOpen(true);
  };

  if (!session.isLoggedIn && !isLoggedIn) {
    return (
      <FullScreenPopUp isOpen={true}>
        <Authentication
          onSuccess={() => {
            setIsLoggedIn(true);
          }}
          isPopUp={true}
        />
      </FullScreenPopUp>
    );
  }

  if (consumableNFTs?.status === StatusType.LOADING) {
    return (
      <Fragment>
        <ShimmerLargeImage />
        <ShimmerCard height={30} borderRadius={10} isEffect={true} />
        <ShimmerCard height={240} borderRadius={10} isEffect={true} />
      </Fragment>
    );
  }

  if (
    consumableNFTs?.status === StatusType.SUCCESS ||
    consumableNFTs?.status === StatusType.ERROR
  ) {
    return (
      <ButtonLayout
        buttonComponent={
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              default: { duration: 0.3 },
              ease: `easeIn`,
            }}
            className="purchase-button-container"
            css={[styles.shareNftContainer]}
          >
            <PrimaryButton
              addStyles={styles.bodyContainer}
              onClick={handleScanAgain}
            >
              Scan Again
            </PrimaryButton>
          </motion.div>
        }
        addStyles={utils.widthPercent(100)}
      >
        {consumableNFTs?.status === StatusType.SUCCESS ? (
          <Fragment>
            {consumableNFTs?.data.length > 0 && (
              <Header title={`Validate Tickets`} />
            )}
            {consumableNFTs?.data.length > 0 ? (
              consumableNFTs.data?.map((item: any) => (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    default: { duration: 0.3 },
                    ease: `easeIn`,
                  }}
                  css={consumeNFTstyles.transactionDetailsContainer}
                  key={item?.id}
                >
                  <ConsumeNFTCard
                    image={item?.image}
                    title={item?.name}
                    mediaType={item?.media_type}
                    isBenefitConsumed={item?.is_nft_consumed}
                    id={item?.id}
                  />
                </motion.div>
              ))
            ) : (
              <div>
                <Success
                  title={`No AZR tickets found.`}
                  subTitle={`Please try scanning another QR.`}
                  smallIcon={true}
                  ellipse={true}
                  avatar={AssetsImg.ic_failed.src}
                />
              </div>
            )}
          </Fragment>
        ) : (
          <div>
            <Success
              title={`Invalid QR code`}
              subTitle={`Sorry, the QR code is invalid. Please scan again.`}
              smallIcon={true}
              ellipse={true}
              avatar={AssetsImg.ic_failed.src}
            />
          </div>
        )}
      </ButtonLayout>
    );
  }

  return (
    <BottomPopup isOpen={scanSheetOpen}>
      <HeaderWithButtonLayout onClose={() => SetScanSheetOpen(false)}>
        <Scan hideTitle onSuccess={(add) => setWalletUUId(add)} />
      </HeaderWithButtonLayout>
    </BottomPopup>
  );
}
export default ConsumableNFTs;
