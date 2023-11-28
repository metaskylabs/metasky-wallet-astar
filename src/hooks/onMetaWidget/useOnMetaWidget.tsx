import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { onMetaWidgetProducer } from '@typings/onMetaWidgetTypes';
import { useAnalytics } from '@utils/useAnalytics';
import { useCallback } from 'react';

const onMetaWidget =
  typeof window !== `undefined` && window.onMetaWidget
    ? window.onMetaWidget
    : null;

const TOKEN_ADDRESSES: { [key: string]: string } = {
  '0x0000000000000000000000000000000000001010': `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`,
};

/**
 * Custom hook to open OnMeta payment widget in new tab
 * @see https://docs.onmeta.in/widget/widget-creation
 */
export function useOnMetaWidget(): onMetaWidgetProducer {
  const { trackEvent } = useAnalytics();
  const openWidget = useCallback((options: any = {}): any => {
    try {
      const {
        allowOpeningNewTab,
        elementId,
        eventType,
        getOnlyURL,
        callbackFn,
        ...onMetaWidgetParams
      } = options;

      /* the token address for MATIC token on stage used by onMeta
      is different than what we use hence we map ours to theirs before 
        asking them to create a URL (applicable on stage env) */
      if (onMetaWidgetParams.tokenAddress in TOKEN_ADDRESSES) {
        onMetaWidgetParams.tokenAddress =
          TOKEN_ADDRESSES[onMetaWidgetParams.tokenAddress];
      }
      /* stringify metadata object */
      if (typeof onMetaWidgetParams.metaData !== `undefined`) {
        onMetaWidgetParams.metaData = JSON.stringify(
          onMetaWidgetParams.metaData,
        );
      }

      /* define onMeta Widget */
      if (onMetaWidget) {
        const widget = new onMetaWidget({
          elementId: elementId || null,
          apiKey: process.env.NEXT_PUBLIC_ONMETA_API_KEY || ``,
          ...onMetaWidgetParams,
        });
        if (allowOpeningNewTab) {
          const url = widget.constructUrl();
          window.open(process.env.NEXT_PUBLIC_ONMETA_BASE_URL + url, `_blank`);
        } else {
          if (getOnlyURL) {
            const url = widget.constructUrl();
            return url;
          } else {
            widget.init();
            if (eventType && callbackFn) {
              widget.on(eventType, callbackFn);
            }
            return widget;
          }
        }
      } else {
        generateToast({
          type: ToastType.ERROR,
          content: `Unable to generate payment link`,
        });
      }
    } catch (err) {
      trackEvent(`OnMeta Widget Init Failed`);
      generateToast({
        type: ToastType.ERROR,
        content: `Unknown error occurred, while initializing payment widget`,
      });
    }
  }, []);

  return { openWidget };
}
