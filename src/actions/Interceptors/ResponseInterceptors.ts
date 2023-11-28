import { handleSuccessMessage } from '@utils/handleResponseToast';
import { AxiosResponse } from 'axios';
import { localStore } from '@utils/redux/createStore';
import { setLogout } from '@actions/auth';

export const responseSuccessInterceptor = (response: AxiosResponse) => {
  if (
    response.data.toastContext !== null &&
    response.data.toastContext.show_toast
  ) {
    handleSuccessMessage(response.data.toastContext);
  }

  return response;
};

export const responseErrorInterceptor = (error: any) => {
  if (error?.response?.status === 401) {
    setLogout(localStore.dispatch);
  }
};
