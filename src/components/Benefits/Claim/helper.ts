import { BenefitClaimMimeType } from '@typings/api/wallet';

export enum VIEW_STATE {
  VIDEO_ASSET = `VIDEO_ASSET`,
  AUDIO_ASSET = `AUDIO_ASSET`,
  IMAGE_ASSET = `IMAGE_ASSET`,
  SECRET_ASSET = `SECRET_ASSET`,
  DISCORD_ASSET = `DISCORD_ASSET`,
  BENEFIT_GRID = `BENEFIT_GRID`,
}
export enum BenefitMediaType {
  IMAGE,
  VIDEO,
  AUDIO,
  ZIP,
  PDF,
}

export const getMediaTypeFromMime = (
  mimeType: BenefitClaimMimeType,
): BenefitMediaType => {
  switch (mimeType) {
    case BenefitClaimMimeType.IMAGE_JPEG:
      return BenefitMediaType.IMAGE;
    case BenefitClaimMimeType.IMAGE_PNG:
      return BenefitMediaType.IMAGE;
    case BenefitClaimMimeType.IMAGE_GIF:
      return BenefitMediaType.IMAGE;
    case BenefitClaimMimeType.IMAGE_SVG:
      return BenefitMediaType.IMAGE;
    case BenefitClaimMimeType.VIDEO:
      return BenefitMediaType.VIDEO;
    case BenefitClaimMimeType.AUDIO_MPEG:
      return BenefitMediaType.AUDIO;
    case BenefitClaimMimeType.AUDIO_XWAV:
      return BenefitMediaType.AUDIO;
    case BenefitClaimMimeType.AUDIO_WAV:
      return BenefitMediaType.AUDIO;
    case BenefitClaimMimeType.ZIP:
      return BenefitMediaType.ZIP;
    case BenefitClaimMimeType.PDF:
      return BenefitMediaType.PDF;
  }
};

export const getViewStateFromMedia = (
  type: BenefitMediaType,
): VIEW_STATE | undefined => {
  switch (type) {
    case BenefitMediaType.IMAGE:
      return VIEW_STATE.IMAGE_ASSET;
    case BenefitMediaType.AUDIO:
      return VIEW_STATE.AUDIO_ASSET;
    case BenefitMediaType.VIDEO:
      return VIEW_STATE.VIDEO_ASSET;
  }
};

export const getNameFromUrl = (url: string): string => {
  const pathname = new URL(url).pathname;
  const index = pathname.lastIndexOf(`/`);
  return pathname.substring(index + 1).replaceAll(/%20/g, ` `); // if index === -1 then index+1 will be 0
};
