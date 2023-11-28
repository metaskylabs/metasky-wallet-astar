export interface ClubsListResponse {
  clubs: ClubMetaData[];
}

export interface ClubMetaData {
  club_url: string;
  club_uuid: string;
  title: string;
  logo: string;
  noOfMembers: number;
  noOfNotification: number;
  colors: ClubColors;
}
export interface ClubColors {
  primary: string;
  secondary: string;
  tertiary: string;
}
