export interface TransferCompleteState {
  status: boolean;
  title?: string;
  ctaText?: string;
  ctaClick?: () => void;
  subTitle?: string;
}
