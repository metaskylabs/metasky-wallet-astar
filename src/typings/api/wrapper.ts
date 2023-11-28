import { ToastType } from '@components/Shared/Toast';

export enum APIStatusType {
  SUCCESS = `success`,
  ERROR = `error`,
}
export interface MetaskyAPIWrap<T> {
  status?: APIStatusType.SUCCESS;
  message?: string;
  toastContext?: ToastContext;
  data: T;
  requestId?: string;
}

export interface MetaskyErrorAPIResponse {
  errorType: string;
  errorMessage: string;
  status: APIStatusType.ERROR;
  errors: any; //TODO: need proper typing from backend
  errorsValidation: any[]; //TODO: need proper typing from backend
  toastContext: ToastContext;
  requestId: string;
}

export interface ToastContext {
  api?: 'USER' | 'WALLET' | string;
  toast_message?: string;
  show_toast?: boolean;
  has_action?: boolean;
  toast_level?: ToastType;
  navigate_to?: string;
  action_button_text?: string;
  target?: string;
}
