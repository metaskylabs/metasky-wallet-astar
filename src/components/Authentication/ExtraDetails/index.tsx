import { useEffect, useState } from 'react';
import { GetCampignConfigurationResponse } from '@typings/api/wallet';
import AdditionalDetails from '@components/AdditionalDetails';
import { getCampaignConfiguration } from '@actions/wallet';
import { getToken } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { useRouter } from 'next/router';
import { Logger } from '@utils/logger';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { WalletType } from '@constants/wallet';
import { useUserSession } from '@utils/hooks/useUserSession';

const ExtraDetails = () => {
  const router = useRouter();
  const [showCollectAdditionalData, setShowCollectAdditionalData] =
    useState(false);
  const [campaignConfiguration, setCampaignConfiguration] =
    useState<GetCampignConfigurationResponse>();
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const session = useUserSession();

  useEffect(() => {
    if (router.isReady) {
      getCampaignConfiguration({
        clientId:
          (router.query.client_id as string) ||
          getToken(LocalStorageVariables.METACLIENTID) ||
          `default`,
      })
        .then((res) => {
          setCampaignConfiguration(res?.data);
        })
        .catch((err) => console.error(err));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (
      user?.profile &&
      campaignConfiguration &&
      campaignConfiguration.additional_data?.show_screen
    ) {
      const isProfileIncomplete =
        campaignConfiguration.additional_data?.required_fields?.some(
          (fieldName: string) => {
            return !Boolean((user?.profile as any)?.[fieldName]);
          },
        );
      const shouldCollectDetails =
        user.isLogin &&
        isProfileIncomplete &&
        session.wallets?.some((wallet) => wallet === WalletType.SKYWALLET);
      setShowCollectAdditionalData(shouldCollectDetails);
    }
  }, [user, router.query, campaignConfiguration]);

  const babbuScreenFields: string[] = [
    ...(campaignConfiguration?.additional_data?.required_fields || []),
    ...(campaignConfiguration?.additional_data?.optional_fields || []),
  ];
  const babbuReqFields: string[] =
    campaignConfiguration?.additional_data?.required_fields || [];
  if (showCollectAdditionalData) {
    return (
      <AdditionalDetails
        city={
          babbuScreenFields.includes(`city`) && !user?.profile?.city
            ? {
                required: babbuReqFields.includes(`city`),
              }
            : null
        }
        email={
          babbuScreenFields.includes(`email`) && !user?.profile?.email
            ? {
                required: babbuReqFields.includes(`email`),
              }
            : null
        }
        name={
          babbuScreenFields.includes(`name`) && !user?.profile?.name
            ? {
                required: babbuReqFields.includes(`name`),
              }
            : null
        }
      />
    );
  } else {
    return null;
  }
};

export default ExtraDetails;
