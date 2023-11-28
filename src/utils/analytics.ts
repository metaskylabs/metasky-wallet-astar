import { logEvent } from './amplitude';
import { click, screen, swipe } from '@constants/analytics';

export const trackScreen = (screenName: screen, properties: object = {}) => {
  logEvent(screenName, properties);
};

export const trackClick = (click: click, properties: object = {}) => {
  logEvent(click, properties);
};

export const trackSwipe = (swipe: swipe, properties: object = {}) => {
  logEvent(swipe, properties);
};

export const trackEvent = (eventName: click, properties: object = {}) => {
  logEvent(eventName, properties);
};
