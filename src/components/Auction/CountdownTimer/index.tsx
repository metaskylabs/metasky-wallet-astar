import { SerializedStyles } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import { useTranslate } from '@utils/useTranslate';

interface CountdownTimerProps {
  remainingTimeInSecond: any;
  addedStyles?: SerializedStyles;
  onTimerFinish: () => void;
}

const CountdownTimer: FC<CountdownTimerProps> = ({
  remainingTimeInSecond,
  onTimerFinish,
  addedStyles,
}) => {
  const [time, setTime] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    days: `00`,
    hours: `00`,
    minutes: `00`,
    seconds: `00`,
  });

  let secondsRemaining = Math.abs(remainingTimeInSecond);
  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsRemaining >= 0) {
        const days = Math.floor(secondsRemaining / (60 * 60 * 24)).toString();
        const hours = Math.floor(
          (secondsRemaining % (60 * 60 * 24)) / (60 * 60),
        ).toString();
        const minutes = Math.floor(
          (secondsRemaining % (60 * 60)) / 60,
        ).toString();
        const seconds = Math.floor(secondsRemaining % 60).toString();

        setTime({
          days: days.padStart(2, `0`),
          hours: hours.padStart(2, `0`),
          minutes: minutes.padStart(2, `0`),
          seconds: seconds.padStart(2, `0`),
        });
        secondsRemaining--;
      } else {
        clearInterval(interval);
        onTimerFinish && onTimerFinish();
      }
    }, 1000);
    return () => {
      interval && clearInterval(interval);
    };
  }, [secondsRemaining]);
  const { translate } = useTranslate();

  return (
    <div css={[styles.container, addedStyles]}>
      <div css={styles.boxWrapper}>
        <div css={styles.hand}>{time.days}</div>
        <div css={styles.handTitle}>{translate(`DAYS`)}</div>
      </div>
      <div css={styles.divider}>:</div>
      <div css={styles.boxWrapper}>
        <div css={styles.hand}>{time.hours}</div>
        <div css={styles.handTitle}>{translate(`HRS`)}</div>
      </div>
      <div css={styles.divider}>:</div>
      <div css={styles.boxWrapper}>
        <div css={styles.hand}>{time.minutes}</div>
        <div css={styles.handTitle}>{translate(`MINS`)}</div>
      </div>
      <div css={styles.divider}>:</div>
      <div css={styles.boxWrapper}>
        <div css={styles.hand}>{time.seconds}</div>
        <div css={styles.handTitle}> {translate(`SECS`)}</div>
      </div>
    </div>
  );
};
export default CountdownTimer;
