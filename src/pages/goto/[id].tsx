import * as styles from '@styles/Modules/raindrops';
import * as checkAnimation from '@public/lottie/checkAnimation.json';
import * as whitelistedAnimation from '@public/lottie/whitelistedAnimation.json';
import { mixins } from '@styles/shared';
import { useRouter } from 'next/router';
import { Fragment, ReactText, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
import { useUserSession } from '@utils/hooks/useUserSession';

function Raindrops() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImage, setImage] = useState<boolean>(false);
  const [isEnterPinOpen, setIsEnterPinOpen] = useState<boolean>(false);
  const [pin, setPin] = useState<string>(``);
  const [pinInValid, setPinInValid] = useState<{
    status: boolean;
    errorMessage?: string;
  }>({ status: false });
  const [raindropData, setRainDropData] = useState<RaindropNftDetails>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loadingPin, setIsLoadingPin] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const session = useUserSession();

  useEffect(() => {
    if (router.isReady) {
      const raindrop = router.query.id as string;
      fetchRainDropDetails(raindrop);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (pin.length < 4) {
      setPinInValid({ status: false });
    }
  }, [pin]);

  const fetchRainDropDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getRainDropDetails(id);
      if (response) {
        setRainDropData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(error);
    }
  };

  const handlePurchase = () => {
    if (!session.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsEnterPinOpen(true);
    }
  };

  const WhitelisteOptions = {
    loop: 1,
    autoplay: true,
    animationData: whitelistedAnimation,
  };

  const checkOptions = {
    loop: false,
    autoplay: true,
    animationData: checkAnimation,
  };

  setTimeout(() => {
    setImage(true);
  }, 5000);

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    // console.log(pin);
    setPin(pin);
  };

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === `Enter` && pin.length === 4) {
      setPinInValid({ status: false });
      claimNft();
    }
  };

  const claimNft = async () => {
    try {
      setIsLoadingPin(true);
      const raindrop = router.query.id as string;
      const payload = {
        bantaId: raindrop,
        pin: pin,
      };
      const response = await claimRaindrop(payload);
      setIsLoadingPin(false);
    } catch (error) {
      setIsLoadingPin(false);
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

  return (
    <section
      css={[
        styles.whitelistContainer,
        mixins.flexColumn,
        mixins.flexAlignJustifiedCenter,
      ]}
    >
      {raindropData?.media && raindropData.media_type === `video` && (
        <Video
          autoPlay={true}
          loop={true}
          playsInline={true}
          controls={false}
          disablePictureInPicture={true}
          controlsList="nodownload"
          source={raindropData.media}
          addStyles={styles.nftVideo}
        />
      )}

      {raindropData?.media && raindropData.media_type === `image` && (
        <img src={raindropData.media} />
      )}

      <article>
        <p css={[styles.whitelistText, mixins.textAlignmentCenter]}>
          Congratulations!
        </p>
        <span
          css={[
            styles.whitelistDescription,
            mixins.textAlignmentCenter,
            mixins.flexJustifiedCenter,
          ]}
        >
          You just received an NFT
        </span>
        <span css={styles.nftName}>{raindropData?.name}</span>
      </article>
      <FullScreenPopUp isOpen={isLoggedIn}>
        <Authentication
          setLoginStatus={(status) => setIsLoggedIn(status)}
          onSuccess={() => setIsEnterPinOpen(true)}
          isPopUp={true}
        />
      </FullScreenPopUp>
      <PrimaryButton addStyles={styles.clickToView} onClick={handlePurchase}>
        {isLoading ? <MLottie addStyles={styles.loader} /> : `Claim Now`}
      </PrimaryButton>

      {/*//pin page*/}
      <FullScreenPopUp isOpen={isEnterPinOpen}>
        <Fragment>
          <Header
            isBackEnabled={true}
            title="Claim NFT"
            customBack={() => setIsEnterPinOpen(false)}
          />
          <div css={styles.popupContent}>
            <h4 css={styles.formLabel}>Enter Access Code</h4>
            <div css={styles.formGroup}>
              <div css={styles.mobile}>
                <MPinInput
                  length={4}
                  focus={true}
                  initialValue={pin}
                  onChange={verifyPin}
                  type="numeric"
                  inputMode="number"
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
            {pinInValid.status && pinInValid.errorMessage && (
              <div css={styles.errorEnable}>
                <p>{pinInValid.errorMessage}</p>
              </div>
            )}
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
                  claimNft();
                }}
                disabled={pin.length < 4 || loadingPin}
              >
                {!loadingPin && <p>VALIDATE CODE</p>}
                <span>
                  {loadingPin && <MLottie addStyles={styles.loader} />}
                </span>
              </PrimaryButton>
            </motion.div>
          </div>
        </Fragment>
      </FullScreenPopUp>
      <FullScreenPopUp isOpen={showSuccess}>
        <article css={styles.checkAnimation}>
          <Lottie options={checkOptions} />
          <div css={styles.whitelistAnimation}>
            <Lottie options={WhitelisteOptions} />
          </div>
        </article>
        <article>
          <p css={[styles.whitelistText, mixins.textAlignmentCenter]}>
            Congratulations!
          </p>
          <span
            css={[
              styles.whitelistDescription,
              mixins.textAlignmentCenter,
              mixins.flexJustifiedCenter,
            ]}
          >
            You just received an NFT
          </span>
          <span css={styles.nftName}>{raindropData?.name}</span>
        </article>
      </FullScreenPopUp>
    </section>
  );
}

export default Raindrops;
