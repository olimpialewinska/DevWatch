export interface GetProfileRequest {
  user_id: string;
}

export type GetProfileResponse = {
  user_id: string;
  email: string;
};
