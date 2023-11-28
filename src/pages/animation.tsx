import { BackButton, BottomPopup, SecondaryButton } from '@components/Shared';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as styles from '@styles/Modules/animation';
import loading_slot_lottie from '@public/images/lotties/loading_slot_lottie.json';
import ronit_failed from '@public/images/lotties/ronit-campaign/failed.json';
import binocs_won from '@public/images/lotties/binocs/win.json';
import ronit_tshirt from '@public/images/lotties/ronit-campaign/tshirt.json';
import Lottie, { Options } from 'react-lottie';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import useLinkHandler from '@utils/hooks/useLinkHandler';

type AnimationConfig = {
  animation: string;
  startOnAction?: boolean;
  actionName?: string;
  sheetActionName?: string;
  showSheetOnComplete?: boolean;
  sheetImgUrl?: string;
  sheetTitle?: string;
  sheetDescription?: string;
  action_button_text?: string;
  navigate_to?: string;
  has_action?: boolean;
};

export default function Animation() {
  const router = useRouter();
  const [data, setData] = useState();
  const [isPaused, setIsPaused] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [config, setConfig] = useState<AnimationConfig>({ animation: `` });
  const [sheetOpen, setSheetOpen] = useState(false);
  const { linkHandler } = useLinkHandler();

  useEffect(() => {
    setConfig(router.query as any as AnimationConfig);
    const link = router.query.animation as string;
    if (
      link === `tshirt_won` ||
      link === `mng_won` ||
      link === `lost` ||
      link === `binocs_won`
    ) {
      const pathMap = {
        tshirt_won: ronit_tshirt,
        mng_won: loading_slot_lottie,
        lost: ronit_failed,
        binocs_won: binocs_won,
      };
      setData(pathMap[link] as any);
    } else
      fetch(router.query.animation as string)
        .then(async (res) => {
          setData(await res.json());
        })
        .catch(console.log);
  }, [router.isReady]);

  return (
    <div css={styles.container}>
      {data && config && (
        <div>
          <Lottie
            options={{
              loop: false,
              autoplay: false,
              animationData: data,
            }}
            isClickToPauseDisabled={true}
            isPaused={Boolean(config.startOnAction) ? isPaused : false}
            eventListeners={[
              {
                eventName: `complete`,
                callback: () => setIsComplete(true),
              },
            ]}
          />
        </div>
      )}
      {!isComplete && Boolean(config.startOnAction) && (
        <div css={styles.buttonContainer}>
          <SecondaryButton
            addStyles={styles.button}
            onClick={() => setIsPaused(false)}
          >
            {config.actionName}
          </SecondaryButton>
        </div>
      )}
      {isComplete && Boolean(config.showSheetOnComplete) && (
        <div css={styles.buttonContainer}>
          <SecondaryButton
            addStyles={styles.button}
            onClick={() => setSheetOpen(true)}
          >
            {config.sheetActionName}
          </SecondaryButton>
        </div>
      )}
      {sheetOpen && (
        <BottomPopup isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
          <ErrorBottomSheet
            img={config.sheetImgUrl}
            title={config.sheetTitle || ``}
            description={config.sheetDescription || ``}
            hasAction={config.has_action}
            buttonText={config.action_button_text}
            onActionClick={() => {
              if (config.navigate_to) {
                linkHandler(``, config.navigate_to);
              }
            }}
          />
        </BottomPopup>
      )}
      {isComplete && (
        <div css={styles.headerContainer}>
          <BackButton />
        </div>
      )}
    </div>
  );
}
