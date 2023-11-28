import amplitude from 'amplitude-js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { init as initApm } from '@elastic/apm-rum';
import { Logger } from './logger';

export const initAmplitude = () => {
  if (
    typeof window !== `undefined` &&
    typeof window.navigator !== `undefined` &&
    process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED === `true`
  ) {
    try {
      amplitude
        .getInstance()
        .init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ``);
    } catch (error) {
      Logger.debug(error);
    }
  }
};

// export const initElasticRum = () => {
//   const apm = initApm({
//     // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
//     serviceName: `metasky-react-frontend`,
//     environment: process.env.NEXT_PUBLIC_ENV_NAME,
//     // Set custom APM Server URL (default: http://localhost:8200)
//     serverUrl: `https://ba17def64060453c8d04339581a1b19b.apm.us-central1.gcp.cloud.es.io:443`,
//   });
// };

export const logEvent = (eventName: string, props: object = {}) => {
  if (
    typeof window !== `undefined` &&
    typeof window.navigator !== `undefined` &&
    process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED === `true`
  ) {
    try {
      amplitude.getInstance().logEvent(eventName, props);
    } catch (error) {
      Logger.debug(error);
    }
  }
};

export const setUserId = (userId: string) => {
  if (
    typeof window !== `undefined` &&
    typeof window.navigator !== `undefined` &&
    process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED === `true`
  ) {
    try {
      amplitude.getInstance().setUserId(userId);
    } catch (error) {
      Logger.debug(error);
    }
  }
};
