import { useRef, useState } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';
import { useRouter } from 'next/router';
import { BackButton, Video } from '@components/Shared';
import * as styles from '@styles/Modules/details';
import { ToastType } from '../../../components/Shared/Toast';
import generateToast from '../../../components/Shared/GenerateToast';
import useCustomBack from '@utils/hooks/custom-back';
import { useTranslate } from '@utils/useTranslate';

export default function ZoomNft() {
  const router = useRouter();
  const ref = useRef<ReactZoomPanPinchRef>(null);
  const [loadError, setLoadError] = useState(false);
  const { onBack } = useCustomBack();

  const isVedio = router.query?.media_type === `video`;
  const { translate } = useTranslate();
  return (
    <>
      {!loadError && (
        <TransformWrapper ref={ref}>
          <TransformComponent wrapperStyle={{ width: `100%`, height: `100%` }}>
            {isVedio ? (
              <Video
                source={router.query.url as string}
                width="100%"
                height="100%"
                disablePictureInPicture={true}
                controls={false}
                controlsList="nodownload"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                onLoad={() => ref.current?.centerView()}
                onError={() => {
                  setLoadError(true);
                  generateToast({
                    customDuration: 2000,
                    type: ToastType.ERROR,
                    content: translate(`FAILED_TO_LOAD`),
                  });
                  onBack();
                }}
              />
            ) : (
              <img
                src={router.query.url as string}
                alt={`Details Image`}
                width={`100%`}
                height={`100%`}
                onLoad={() => ref.current?.centerView()}
                onError={() => {
                  setLoadError(true);
                  generateToast({
                    customDuration: 2000,
                    type: ToastType.ERROR,
                    content: translate(`FAILED_TO_LOAD`),
                  });
                  onBack();
                }}
              />
            )}
          </TransformComponent>
        </TransformWrapper>
      )}
      <BackButton addStyles={styles.backButton} />
    </>
  );
}
