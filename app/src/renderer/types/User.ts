export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
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
  user: User;
  token: string;
}
