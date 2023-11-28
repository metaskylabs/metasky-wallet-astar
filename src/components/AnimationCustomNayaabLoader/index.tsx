import { FC, useEffect, useState } from 'react';
import { pollingTransaction } from '@actions/payment';
import { TransactionStatus } from '@utils/constants';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { MLottie, PrimaryButton } from '@components/Shared';
import Lottie, { Options } from 'react-lottie';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';

interface AnimationCustomNayaabLoaderProps {
  orderId?: string;
}

enum andaState {
  LOADING,
  WIN,
  FAIL,
}
const AnimationCustomNayaabLoader: FC<AnimationCustomNayaabLoaderProps> = ({
  orderId,
}) => {
  const router = useRouter();
  const [resultState, setResultState] = useState<andaState>(andaState.LOADING);
  const [ctaLoading, seCtaLoading] = useState<boolean>(false);
  const [animationData, setAnimationData] = useState<Options>({
    loop: true,
    autoplay: true,
    animationData: AssetsImg.l_slot_loading,
  });
  const [nftId, setNftId] = useState<string>();

  const confettiOption = {
    loop: false,
    autoplay: true,
    animationData: AssetsImg.l_confetti,
  };

  const [statusContent, setStatusContent] = useState({
    title: `Checking the Anda Supply`,
    subTitle: `default`,
    cta: ``,
  });
  useEffect(() => {
    const poll = setInterval(async () => {
      if (orderId) {
        const payload = {
          orderId: orderId,
        };
        try {
          const response = await pollingTransaction(payload);

          if (response.data.status === TransactionStatus.completed) {
            changeViewState(andaState.WIN);
            clearInterval(poll);
            setNftId(response.data.token.id);
          } else if (
            response.data.status === TransactionStatus.failed ||
            response.data.status === TransactionStatus.expired
          ) {
            changeViewState(andaState.FAIL);
            clearInterval(poll);
          }
        } catch (e) {}
      }
    }, 5000);

    return () => clearInterval(poll);
  }, [orderId]);

  const changeViewState = (updatedState: andaState) => {
    if (updatedState === andaState.WIN) {
      setAnimationData({
        loop: false,
        autoplay: true,
        animationData: AssetsImg.l_slot_win,
      });
      setStatusContent({
        title: `Hooray!`,
        subTitle: `You have received an Anda!`,
        cta: `VIEW ANDA`,
      });
      setResultState(updatedState);
    } else if (updatedState === andaState.FAIL) {
      setAnimationData({
        loop: false,
        autoplay: true,
        animationData: AssetsImg.l_slot_fail,
      });
      setStatusContent({
        title: `Better Luck Next Time..`,
        subTitle: `You didn’t receive an Anda this time.`,
        cta: `BACK TO WALLET`,
      });
      setResultState(updatedState);
    }
  };

  const handleRedirection = () => {
    seCtaLoading(true);
    if (resultState === andaState.FAIL) {
      router.push(Pages.HOME);
    } else if (resultState === andaState.WIN) {
      router.push(`${Pages.NFT_DETAILS}/${nftId}`);
    }
  };
  return (
    <div css={styles.mainContainer}>
      {resultState === andaState.WIN && (
        <div css={styles.confetti}>
          <Lottie options={confettiOption} />
        </div>
      )}
      <h2 css={styles.title}>{statusContent.title}</h2>
      <div css={styles.slotContainer}>
        <img src={AssetsImg.i_slot_machine.src} css={styles.slotMask} />
        <div css={styles.animationContainer}>
          <Lottie options={animationData} />
        </div>
      </div>
      {statusContent.subTitle === `default` ? (
        <>
          <p css={styles.figCaption}>You win if the slot machine lands on</p>
          <p css={styles.figCaption}>🥚🥚🥚</p>
          <p css={styles.figCaption}>
            <b>3 Andas</b>
          </p>
        </>
      ) : (
        <p css={styles.figCaption}>{statusContent.subTitle}</p>
      )}

      <div css={styles.buttonContainer}>
        {/*TODO : Need to remove added style*/}
        {resultState === andaState.LOADING ? (
          `This might take a moment, please don’t close this tab.`
        ) : (
          <PrimaryButton
            addStyles={styles.buttonAddedStyle}
            onClick={handleRedirection}
          >
            {!ctaLoading && statusContent.cta}
            <span>{ctaLoading && <MLottie addStyles={styles.loader} />}</span>
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default AnimationCustomNayaabLoader;
