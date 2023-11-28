import moment from 'moment';

export const getTimeDifferenceFromNow = (unFormatedTime: any) => {
  try {
    const formatedTime = moment(unFormatedTime).format();
    const currentTime = moment().diff(formatedTime, `seconds`);
    return currentTime;
  } catch (e) {
    return false;
  }
};

//takes date in epoch
export const isTimeRemaining = (futureDate: string) => {
  try {
    const formatTime = moment(parseInt(futureDate));
    const nowTime = moment();

    if (nowTime > formatTime) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export const getMinutes = (seconds: number) => {
  return moment.utc(seconds * 1000).format(`mm:ss`);
};
