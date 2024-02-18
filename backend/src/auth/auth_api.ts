export interface SignTokenPayload extends RegisterResponse {}

export interface JwtToken {
  accessToken: string;
}

export interface JwtPair extends JwtToken {
  refreshToken: string;
}

export interface RegisterResponse {
  email: string;
  user_id: string;
}

export type LoginResponse = JwtToken;

export type RefreshResponse = JwtToken;

export interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshDto {
  token: string;
}
