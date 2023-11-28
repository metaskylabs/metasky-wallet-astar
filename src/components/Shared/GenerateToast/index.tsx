import toast, { useToasterStore } from 'react-hot-toast';
import { MetaToast } from '@components/Shared';
import { ToastType } from '@components/Shared/Toast';
import { ReactNode } from 'react';

// toast components.

interface generateToastProps {
  type: ToastType;
  content?: ReactNode;
  customDuration?: number;
}

const generateToast = ({
  type,
  content,
  customDuration,
}: generateToastProps) => {
  const closeToast = () => {
    toast.remove(toastId);
  };
  const toaster: JSX.Element = (
    <MetaToast type={type} onCloseClick={closeToast}>
      {content}
    </MetaToast>
  );
  const customOptions: any = {};
  if (customDuration) {
    customOptions.duration = customDuration;
  }

  const toastId: string = toast.custom(toaster, customOptions);
};

export default generateToast;
