import {
  LoginResponse,
  RefreshResponse,
  User,
  UserLogin,
  UserRegister,
} from "@/renderer/types/User";
import Api from "../Api";

export class UserApi {
  static async login(credentials: UserLogin) {
    const { data: user } = await Api.post<LoginResponse>(
      "auth/login",
      credentials
    );
    return user;
  }
  static async refresh(refresh: string) {
    const {
      data: { accessToken },
    } = await Api.post<RefreshResponse>("/auth/refresh/", {
      token: refresh,
    });
    return accessToken;
  }
  static async register(credentials: UserRegister) {
    const { data: user } = await Api.post<User>("auth/register", credentials);
    return user;
  }
  static async get() {
    const { data: user } = await Api.get<User>("auth/user");
    return user;
  }
}
