import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { ApiSkyClub } from './Axios';

export const getDiscordBenefitDiscordServerLink = async (
  clubUUID: string,
): Promise<string | null> => {
  const response = await ApiSkyClub.get<
    MetaskyAPIWrap<
      {
        connection_uuid: 'twitter' | 'discord';
        logo: string;
        link: string;
      }[]
    >
  >(`club/${clubUUID}/official_links`);

  for (const social of response.data.data) {
    if (social.connection_uuid === `discord`) {
      return social.link;
    }
  }
  return null;
};
