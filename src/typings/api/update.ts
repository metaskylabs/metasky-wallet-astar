export enum UpdatesCategories {
  NOTIFICATION = `NOTIFICATION`,
  LISTING = `LISTING`,
  BENEFIT = `BENEFIT`,
}

export enum UpdatesStatus {
  READ = `read`,
  UNREAD = `unread`,
}

export interface GetUpdatesResponse {
  id: number;
  category: UpdatesCategories;
  status: UpdatesStatus;
  title: string;
  image?: string;
  description: string;
  user_uuid: string;
  additional_data?: string | null;
  cta_name?: string;
  cta_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserUpdatesStatusProps {
  user_update_uuids: Array<number>;
}
