export enum StatusType {
  LOADING,
  SUCCESS,
  ERROR,
}

export type LinkPayload = {
  type: string;
  ctaLink: string;
  ctaTarget: string;
  ctaText: string;
  bottomSheetPopUp?: boolean;
  ctaButtonText?: string;
  bottomSheetImg?: string;
};
