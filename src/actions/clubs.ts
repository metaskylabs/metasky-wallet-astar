import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { ClubsListResponse } from '@typings/api/clubs';
import { ApiSkyClub } from '@actions/Axios';

export const getClubsList = async (): Promise<
  MetaskyAPIWrap<ClubsListResponse>
> => {
  const response = await ApiSkyClub.get(`/club/list-clubs`);

  return response.data;
};
