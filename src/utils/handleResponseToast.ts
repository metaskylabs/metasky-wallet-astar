import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { ErrorResponse } from '@typings/api/error';
import ToastWithAction from '@components/Shared/ToastWithAction';
import { ToastContext } from '@typings/api/wrapper';

export const handleSuccessMessage = (
  toastContext: ToastContext | null = null,
  successMessage: string | null = null,
) => {
  if (successMessage) {
    generateToast({
      content: successMessage,
      type: ToastType.SUCCESS,
    });
  } else if (toastContext) {
    getApiSuccessMessage(toastContext);
  }
};

export const getApiSuccessMessage = (toastContext: ToastContext) => {
  if (
    toastContext.has_action &&
    toastContext.toast_message &&
    toastContext.navigate_to &&
    toastContext.action_button_text &&
    toastContext.toast_level
  ) {
    generateToast({
      type: toastContext.toast_level as ToastType,
      content: ToastWithAction({
        text: toastContext.toast_message,
        buttonText: toastContext.action_button_text,
        redirectUrl: toastContext.navigate_to,
      }),
    });
  } else if (toastContext.toast_level && toastContext.toast_message) {
    generateToast({
      type: toastContext.toast_level as ToastType,
      content: toastContext.toast_message,
    });
  }
};

export const handleErrorMessage = (
  error: any,
  errorMessage: string | null = null,
) => {
  const errorData: ErrorResponse = error?.response?.data;
  if (errorMessage) {
    generateToast({
      content: errorMessage,
      type: ToastType.ERROR,
    });
  } else if (
    errorData &&
    errorData.toastContext !== null &&
    errorData.toastContext?.show_toast
  ) {
    getApiErrorMessage(errorData.toastContext);
  } else {
    generateToast({
      type: ToastType.ERROR,
      content: `Something went wrong please try again later.`,
    });
  }
};

export const getApiErrorMessage = (toastContext: ToastContext) => {
  if (
    toastContext.has_action &&
    toastContext.toast_message &&
    toastContext.navigate_to &&
    toastContext.action_button_text &&
    toastContext.toast_level
  ) {
    generateToast({
      type: toastContext.toast_level as ToastType,
      content: ToastWithAction({
        text: toastContext.toast_message,
        buttonText: toastContext.action_button_text,
        redirectUrl: toastContext.navigate_to,
        target: toastContext.target,
      }),
    });
  } else if (toastContext.toast_level && toastContext.toast_message) {
    generateToast({
      type: toastContext.toast_level as ToastType,
      content: toastContext.toast_message,
    });
  } else {
    generateToast({
      type: ToastType.ERROR,
      content: `Something went wrong please try again later.`,
    });
  }
};
