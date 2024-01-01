import { LoginResponse, User, UserLogin, UserRegister } from "@/types/User";
import Api from "./Api";

export class UserApi {
  static async login(credentials: UserLogin) {
    const { data: user } = await Api.post<LoginResponse>(
      "auth/login",
      credentials
    );
    return user;
  }
  static async register(credentials: UserRegister) {
    console.log(credentials);
    const { data: user } = await Api.post<User>("auth/register", credentials);
    return user;
  }
}
