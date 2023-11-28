import Image from 'next/image';
import AssetsImg from '@public/images';
import * as styles from './styles';
import { FC, useState, useEffect } from 'react';

interface TimerProps {
  minutesLeft: number;
  secondsLeft: number;
  onTimeOut: () => void;
}

const Timer: FC<TimerProps> = ({ minutesLeft, secondsLeft, onTimeOut }) => {
  const [minutes, setMinutes] = useState(minutesLeft);
  const [seconds, setSeconds] = useState(secondsLeft);
  if (minutes === 0 && seconds === 0) {
    onTimeOut();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(60);
      }
      if (minutes === 0 && seconds === 0) {
        setMinutes(0);
        setSeconds(0);
        return () => clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <div css={styles.countDownContainer}>
      <img src={AssetsImg.ic_clock.src} />
      <div css={styles.timerContainer}>
        {minutes}:{seconds > 9 ? `` : 0}
        {seconds}
      </div>
    </div>
  );
};

export default Timer;
