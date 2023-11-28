import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import BenefitGrid from '@components/Benefits/Claim/BenefitGrid';
import VideoAsset from '@components/Benefits/Claim/VideoAsset';
import ImageAsset from '@components/Benefits/Claim/ImageAsset';
import { BottomPopup } from '@components/Shared';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import SecretAsset from '@components/Benefits/Claim/SecretAsset';
import DiscordAsset from '@components/Benefits/Claim/DiscordAsset';
import AudioAsset from '@components/Benefits/Claim/AudioAsset';
import {
  AccessBenefit,
  BenefitClaimMedia,
  BenefitTypes,
  DiscordBenefitType,
} from '@typings/api/wallet';
import {
  getMediaTypeFromMime,
  getNameFromUrl,
  getViewStateFromMedia,
  VIEW_STATE,
} from '@components/Benefits/Claim/helper';
import FileAsset from './FileAsset';
import toast from 'react-hot-toast';
import { getDiscordBenefitDiscordServerLink } from '@actions/benefits';

interface ClaimBenefitProps {
  benefitDetails: AccessBenefit;
  onClose: () => void;
  image: string;
}

const ClaimBenefit: FC<ClaimBenefitProps> = ({
  benefitDetails,
  onClose,
  image,
}) => {
  const [viewState, setViewState] = useState<{
    view: VIEW_STATE;
    size: BottomPopupSize;
    onBack?: () => void;
  }>({ view: VIEW_STATE.AUDIO_ASSET, size: BottomPopupSize.BIG });

  const [benefitMedias, setBenefitMedias] = useState<BenefitClaimMedia[]>([]);
  const [benefitAsset, setBenefitAsset] = useState<BenefitClaimMedia>();
  const [secretText, setSecretText] = useState<string>(``);
  const [discordBenefitData, setDiscordBenefitData] =
    useState<DiscordBenefitType | null>(null);

  useEffect(() => {
    (async () => {
      switch (benefitDetails.type) {
        case BenefitTypes.SECRET_TEXT_BENEFIT:
          if (benefitDetails.seceretText)
            setSecretText(benefitDetails.seceretText);
          setViewState({
            view: VIEW_STATE.SECRET_ASSET,
            size: BottomPopupSize.MEDIUM,
          });
          break;
        case BenefitTypes.MEDIA_BENEFIT:
          if (benefitDetails.media && benefitDetails.media.length > 1) {
            setBenefitMedias(benefitDetails.media);
            setViewState({
              view: VIEW_STATE.BENEFIT_GRID,
              size: BottomPopupSize.BIG,
            });
          } else if (
            benefitDetails.media &&
            benefitDetails.media.length === 1
          ) {
            const mediaType = getMediaTypeFromMime(
              benefitDetails.media[0].mimeType,
            );
            const viewState = getViewStateFromMedia(mediaType);
            if (viewState) {
              setBenefitAsset(benefitDetails.media[0]);
              setViewState({ view: viewState, size: BottomPopupSize.MEDIUM });
            }
          }
          break;
        case BenefitTypes.DISCORD_ROLE_BENEFIT:
          const data: {
            clubID: string;
            discordRoleName: string | null;
            text: string;
            skyclubLink: string;
            linkToDiscordServer: string | null;
          } = {
            clubID: benefitDetails.club_uuid || ``,
            discordRoleName: null,
            text: ``,
            skyclubLink: ``,
            linkToDiscordServer: null,
          };
          if (window.location.host === `wallet.metasky.me`) {
            data.skyclubLink = `https://skyclub.metasky.me/clubs/${data.clubID}?showConnections=true`;
            /* window.open(data.skyclubLink, `_blank`); */
          } else {
            data.skyclubLink = `https://skyclub-stage.metasky.me/clubs/${data.clubID}?showConnections=true`;
            /* window.open(data.skyclubLink, `_blank`); */
          }
          if (benefitDetails.discord_text === `CONNECT_DISCORD`) {
            data.text = `Please connect discord to your Skyclub account`;
          } else if (benefitDetails.role?.roleName) {
            data.text = `Discord Role Claimed`;
            data.discordRoleName = benefitDetails.role?.roleName ?? null;
            try {
              const link = await getDiscordBenefitDiscordServerLink(
                data.clubID,
              );
              data.linkToDiscordServer = link;
            } catch (err) {
              toast.error(`Couldn't fetch server link`);
            }
          } else if (benefitDetails.discord_text) {
            data.text = benefitDetails.discord_text;
          }
          setDiscordBenefitData(data);
          setViewState({
            view: VIEW_STATE.DISCORD_ASSET,
            size: BottomPopupSize.BIG,
          });
          break;
      }
    })();
  }, [
    benefitDetails.club_uuid,
    benefitDetails.discord_text,
    benefitDetails.media,
    benefitDetails.role?.roleName,
    benefitDetails.seceretText,
    benefitDetails.type,
  ]);

  const handleGridSetView = (media: BenefitClaimMedia) => {
    const viewState = getViewStateFromMedia(
      getMediaTypeFromMime(media.mimeType),
    );
    if (viewState) {
      setBenefitAsset(media);
      setViewState({
        view: viewState,
        size: BottomPopupSize.BIG,
        onBack: () =>
          setViewState({
            view: VIEW_STATE.BENEFIT_GRID,
            size: BottomPopupSize.BIG,
          }),
      });
    } else {
      window.open(media.url, `_blank`);
    }
  };

  const handleViewState = () => {
    switch (viewState.view) {
      case VIEW_STATE.BENEFIT_GRID:
        return (
          <BenefitGrid
            setView={handleGridSetView}
            data={benefitMedias}
            image={image}
          />
        );
      case VIEW_STATE.VIDEO_ASSET:
        if (benefitAsset?.url) {
          return (
            <VideoAsset
              title={getNameFromUrl(benefitAsset.url)}
              url={benefitAsset.url}
            />
          );
        } else break;
      case VIEW_STATE.IMAGE_ASSET:
        if (benefitAsset?.url) {
          return (
            <ImageAsset
              name={getNameFromUrl(benefitAsset.url)}
              image={benefitAsset.url}
            />
          );
        } else break;
      case VIEW_STATE.SECRET_ASSET:
        return <SecretAsset secret={secretText} />;
      case VIEW_STATE.DISCORD_ASSET:
        if (discordBenefitData === null) {
          return <></>;
        } else {
          return <DiscordAsset data={discordBenefitData} />;
        }
      case VIEW_STATE.AUDIO_ASSET:
        if (benefitAsset?.url) {
          return <AudioAsset image={image} url={benefitAsset.url} />;
        } else break;
      case VIEW_STATE.FILE_ASSET:
        if (benefitAsset?.url) {
          return (
            <FileAsset
              name={getNameFromUrl(benefitAsset.url)}
              fileLink={benefitAsset.url}
            />
          );
        } else break;
      case VIEW_STATE.CUSTOM_ASSET:
        return <></>;
    }
  };
  return (
    <BottomPopup isOpen={true} size={viewState.size}>
      <HeaderWithButtonLayout
        onBack={viewState.onBack}
        title={`Benefit Details`}
        onClose={onClose}
      >
        <div css={styles.claimBenefitWrapper}>{handleViewState()}</div>
      </HeaderWithButtonLayout>
    </BottomPopup>
  );
};

export default ClaimBenefit;
