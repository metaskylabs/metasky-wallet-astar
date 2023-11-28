import * as styles from '@styles/Modules/banta';
import * as checkAnimation from '@public/lottie/checkAnimation.json';
import * as whitelistedAnimation from '@public/lottie/whitelistedAnimation.json';
import { mixins, utils } from '@styles/shared';
import { useRouter } from 'next/router';
import { Fragment, ReactText, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { claimRaindrop, getRainDropDetails } from '@actions/wallet';
// import { getRainDropDetails } from '@actions/wallet';
import {
  FullScreenPopUp,
  Header,
  MLottie,
  MPinInput,
  PrimaryButton,
  Video,
} from '@components/Shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { RaindropNftDetails } from '@typings/api/wallet';
import Authentication from '@components/Authentication';
import { AxiosError } from 'axios';
import Lottie from 'react-lottie';
import { Pages } from '@utils/navigation';
import AssetsImg from '@public/images';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import PrivateRoute from '@components/PrivateRoute';
import NOOB from '@constants/noob';
import { useUserSession } from '@utils/hooks/useUserSession';

const Banta = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bantaData, setBantaData] = useState<RaindropNftDetails>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [pin, setPin] = useState<string>(``);
  const [pinInValid, setPinInValid] = useState<{
    status: boolean;
    errorMessage?: string;
  }>({ status: false });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const session = useUserSession();
  const [imageShimmer, setImageShimmer] = useState<boolean>(true);
  const [showNFT, setShowNFT] = useState<boolean>(false);

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    setPinInValid({ status: false });
    setPin(pin);
  };

  const fetchRainDropDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getRainDropDetails(id);
      setIsLoading(false);
      if (response) {
        setBantaData(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(error);
      router.push(Pages.PAGE_NOT_FOUND);
    }
  };

  const claimNft = async () => {
    try {
      setIsLoading(true);
      const raindrop = router.query.id as string;
      const payload = {
        bantaId: raindrop,
        pin: pin,
      };
      const response = await claimRaindrop(payload);
      setIsLoading(false);
      if (response) {
        setIsSuccess(true);
        setTimeout(() => setShowNFT(true), 2000);
      }
    } catch (error) {
      setIsLoading(false);
      const axiosError = error as AxiosError;
      if (
        axiosError?.response?.data.toastContext !== null &&
        !axiosError.response?.data.toastContext.show_toast &&
        axiosError?.response?.data.toastContext.toast_message
      ) {
        setPinInValid({
          status: true,
          errorMessage: axiosError?.response?.data.toastContext.toast_message,
        });
      } else {
        setPinInValid({ status: true });
        handleErrorMessage(error);
      }
    }
  };

  const handleClaim = () => {
    if (!session.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      claimNft();
    }
  };

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === `Enter` && pin.length === 4) {
      setPinInValid({ status: false });
    }
  };

  const checkOptions = {
    loop: false,
    autoplay: true,
    animationData: checkAnimation,
  };

  const WhitelisteOptions = {
    loop: false,
    autoplay: true,
    animationData: whitelistedAnimation,
  };

  useEffect(() => {
    if (router.isReady) {
      const raindrop = router.query.id as string;
      fetchRainDropDetails(raindrop);
    }
  }, [router.isReady]);

  return (
    <Fragment>
      <ButtonLayout
        buttonComponent={
          <motion.div
            css={[styles.buttonContainer]}
            className="popup-button"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              default: { duration: 0.3 },
              ease: `easeIn`,
            }}
          >
            <PrimaryButton
              addStyles={styles.pinButton}
              onClick={() => {
                setPinInValid({ status: false });
                handleClaim();
              }}
              disabled={pin.length < 4 || isLoading}
            >
              {!isLoading && <p>CLAIM NOW</p>}
              <span>{isLoading && <MLottie addStyles={styles.loader} />}</span>
            </PrimaryButton>
          </motion.div>
        }
      >
        <>
          {bantaData?.media_type === `video` ? (
            <Video
              source={bantaData.media}
              width="100%"
              height="100%"
              disablePictureInPicture={true}
              controls={false}
              controlsList="nodownload"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              onDurationChange={() => {
                const imgRef = document.getElementsByClassName(
                  `nftVideo`,
                )[0] as HTMLDivElement;
                imgRef.style.display = `block`;
                setImageShimmer(false);
              }}
              addStyles={styles.video}
            />
          ) : (
            <img
              src={bantaData?.media ? bantaData?.media : AssetsImg.i_default}
              alt={`Details Image`}
              width="100%"
              css={styles.image}
              height="100%"
              className="nftMedia"
              onLoad={() => {
                const imgRef = document.getElementsByClassName(
                  `nftMedia`,
                )[0] as HTMLDivElement;
                imgRef.style.display = `block`;
                setImageShimmer(false);
              }}
            />
          )}
          {imageShimmer && <ShimmerLargeImage />}
          <div css={styles.wrapper}>
            <article css={{ padding: utils.remConverter(16) }}>
              <p css={[styles.whitelistText]}>Claim Your NFT!</p>
              <p css={[styles.whitelistDescription]}>
                Enter access code to claim NFT -
              </p>
              <p css={styles.nftName}>{bantaData?.name}</p>
            </article>
            <h4 css={styles.formLabel}>Enter Access Code</h4>
            <div css={styles.formGroup}>
              <div css={styles.mobile}>
                <MPinInput
                  length={4}
                  focus={true}
                  initialValue={pin}
                  type="numeric"
                  inputMode="number"
                  onChange={verifyPin}
                  style={styles.pinsContainer}
                  inputStyle={
                    pinInValid.status
                      ? (styles.InvalidPinStyle as React.CSSProperties)
                      : (styles.pinStyle as React.CSSProperties)
                  }
                  inputFocusStyle={{
                    border: `3px solid #4969F9`,
                    WebkitAppearance: `none`,
                  }}
                  onKeyPress={onKeyPressHandler}
                />
              </div>
            </div>
            {pinInValid.status && (
              <div css={[styles.errorText]}>
                <p>{pinInValid.errorMessage}</p>
              </div>
            )}
          </div>
        </>
      </ButtonLayout>
      <FullScreenPopUp isOpen={isLoggedIn}>
        <Authentication
          setLoginStatus={(status) => setIsLoggedIn(status)}
          isPopUp={true}
          onSuccess={() => {
            setIsLoggedIn(false);
            claimNft();
          }}
        />
      </FullScreenPopUp>
      <FullScreenPopUp isOpen={isSuccess}>
        <ButtonLayout
          buttonComponent={
            <motion.div
              css={[styles.browseButtonContainer]}
              className="popup-button"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              <PrimaryButton
                addStyles={styles.pinButton}
                onClick={() => {
                  setPinInValid({ status: false });
                  router.push(Pages.HOME);
                }}
              >
                {!isLoading && <p>BROWSE WALLET</p>}
                <span>
                  {isLoading && <MLottie addStyles={styles.loader} />}
                </span>
              </PrimaryButton>
            </motion.div>
          }
        >
          <div css={[mixins.flexAlignJustifiedCenter, styles.successContainer]}>
            <AnimatePresence>
              <article
                css={[styles.checkAnimation, mixins.flexAlignJustifiedCenter]}
              >
                {showNFT &&
                  (bantaData?.media_type === `video` ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        default: { duration: 0.4 },
                        ease: `easeIn`,
                      }}
                      css={[mixins.flexAlignJustifiedCenter]}
                    >
                      <Video
                        autoPlay={true}
                        loop={true}
                        playsInline={true}
                        controls={false}
                        disablePictureInPicture={true}
                        controlsList="nodownload"
                        source={bantaData.media}
                        width="80%"
                        height="auto"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      css={[
                        styles.imgContainer,
                        mixins.flexAlignJustifiedCenter,
                      ]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        default: { duration: 0.5 },
                        ease: `easeIn`,
                      }}
                    >
                      <img src={bantaData?.media} width="80%" height="auto" />
                    </motion.div>
                  ))}
                {!showNFT && (
                  <motion.div
                    key="fade_in_out"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Lottie options={checkOptions} />
                  </motion.div>
                )}
                {!showNFT && (
                  <div css={styles.whitelistAnimation}>
                    <Lottie options={WhitelisteOptions} />
                  </div>
                )}
              </article>
            </AnimatePresence>
            <article css={{ padding: utils.remConverter(16) }}>
              <p css={[styles.whitelistText, mixins.textAlignmentCenter]}>
                Congratulations!
              </p>
              <p
                css={[
                  styles.whitelistDescription,
                  mixins.textAlignmentCenter,
                  mixins.flexJustifiedCenter,
                ]}
              >
                You just received an NFT
              </p>
              <p css={[styles.nftName, mixins.textAlignmentCenter]}>
                {bantaData?.name}
              </p>
            </article>
          </div>
        </ButtonLayout>
      </FullScreenPopUp>
    </Fragment>
  );
};

export default Banta;
