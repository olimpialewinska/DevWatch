export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface UserChangeDetails {
  first_name: string;
  last_name: string;
  email: string;
}
