import { FC, useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import Slider from 'rc-slider';
import { motion } from 'framer-motion';
import 'rc-slider/assets/index.css';
import { useTranslate } from '@utils/useTranslate';

interface SwipeButtonProps {
  onComplete: () => void;
  resetMode: boolean;
  setIsFailure: (status: boolean) => void;
  flow?: string;
}

const SwipeMainButton: FC<SwipeButtonProps> = ({
  onComplete,
  resetMode,
  setIsFailure,
  flow,
}) => {
  const initialStep = 0;

  const [sliderValue, setSliderValue] = useState<number | number[]>(
    initialStep,
  );

  const sliderParentRef = useRef<HTMLDivElement>(null);

  const [lastStep, setLastStep] = useState(100);
  const { translate } = useTranslate();

  const afterDragComplete = (value: number | number[]) => {
    if (value <= lastStep - 2) {
      sliderDown(value);
    } else if (value > lastStep - 2) {
      onComplete();
    }
  };

  useEffect(() => {
    if (resetMode) {
      setSliderValue(initialStep);
      setIsFailure(false);
    }
  }, [resetMode]);

  useEffect(() => {
    if (sliderParentRef.current) {
      setLastStep(100 - (59 * 100) / sliderParentRef.current.offsetWidth);
    }
  }, [sliderParentRef]);

  const sliderDown = (currentValue: number | number[]) => {
    let count: number | number[] = currentValue;

    const interval = setInterval(() => {
      if (count > initialStep) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        count -= 1;
        setSliderValue(count);
      }
    }, 1);
    if (count <= initialStep) {
      clearInterval(interval);
    }
  };

  return (
    <div css={styles.container} ref={sliderParentRef}>
      <div css={styles.slideInfoText}>{flow ?? translate(`SEND_NFT`)}</div>
      <Slider
        onAfterChange={afterDragComplete}
        min={0}
        max={100}
        step={1}
        disabled={sliderValue >= lastStep - 2}
        value={sliderValue}
        onChange={(value: any) => {
          if (value > initialStep && value < lastStep) {
            setSliderValue(value);
          }
        }}
        defaultValue={0}
        trackStyle={{
          ...styles.trackStyle,
          minWidth: `calc(${sliderValue}% + 59px)`,
        }} // 59px is the width of the arrow handle
        handleStyle={styles.handleStyle}
        railStyle={styles.railStyle}
      />

      {sliderValue >= lastStep - 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.05,
            default: { duration: 0.5 },
            ease: `easeIn`,
          }}
          css={styles.slideLoadingText}
        >
          {translate(`LOADING`)}
        </motion.div>
      )}
    </div>
  );
};

export default SwipeMainButton;
