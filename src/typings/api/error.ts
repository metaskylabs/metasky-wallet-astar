import { ToastContext } from './wrapper';

export interface ErrorResponse {
  errorType: string;
  errorMessage: string;
  errors: string;
  errorsValidation: [];
  toastContext: ToastContext | null;
  requestId: string;
}
