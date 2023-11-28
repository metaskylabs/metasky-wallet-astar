import { onCopy } from '@utils/helper';

export const share = (title: string, url: string) => {
  if (window && window.navigator && window.navigator.share!) {
    navigator
      .share({
        title: title,
        text: url,
        url: url,
      })
      .catch(() => onCopy(url, `Link copied!`));
  } else {
    onCopy(url, `Link copied!`);
  }
};
