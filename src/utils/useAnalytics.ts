import { logEvent } from './amplitude';
import {
  click,
  screen,
  swipe,
  EVENT_PAGE,
  CLICK,
  EVENT_PROCESS,
} from '@constants/analytics';
import { State as userProfileState } from '@reducers/user';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import moment from 'moment';

export const useAnalytics = () => {
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const trackPage = (
    pageName: EVENT_PAGE | string,
    properties: object = {},
  ) => {
    logEvent(`Landed on ${pageName}`, {
      ...properties,
      is_logged_in: user.isLogin,
      user_preferences: user?.profile?.user_preferences,
      client: window && window.localStorage.getItem(`MetaClientID`),
      page_url: window && window.location.href,
      user_timestamp: moment().format(`DD MMMM YYYY hh:mm:ss a`),
    });
  };
  const trackClick = (clickName: CLICK | string, properties: object = {}) => {
    logEvent(`Clicked on ${clickName}`, {
      ...properties,
      is_logged_in: user.isLogin,
      user_preferences: user?.profile?.user_preferences,
      client: window.localStorage.getItem(`MetaClientID`),
      page_url: window && window.location.href,
      user_timestamp: moment().format(`DD MMMM YYYY hh:mm:ss a`),
    });
  };
  const trackProcess = (name: EVENT_PROCESS, properties: object = {}) => {
    logEvent(`${name}`, {
      ...properties,
      is_logged_in: user.isLogin,
      user_preferences: user?.profile?.user_preferences,
      client: window.localStorage.getItem(`MetaClientID`),
      page_url: window && window.location.href,
      user_timestamp: moment().format(`DD MMMM YYYY hh:mm:ss a`),
    });
  };
  const trackEvent = (name: string, properties: object = {}) => {
    logEvent(`${name}`, {
      ...properties,
      is_logged_in: user.isLogin,
      user_preferences: user?.profile?.user_preferences,
      client: window.localStorage.getItem(`MetaClientID`),
      user_timestamp: moment().format(`DD MMMM YYYY hh:mm:ss a`),
    });
  };

  return { trackPage, trackClick, trackProcess, trackEvent };
};
