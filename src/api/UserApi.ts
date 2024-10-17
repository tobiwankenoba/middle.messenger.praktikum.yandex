import { TUserUpdateValues } from "../types/api";
import BaseApi from "./BaseApi";

export class UserAPI extends BaseApi {
  constructor() {
    super("/user");
  }

  public updateProfile = (data: TUserUpdateValues) =>
    this.http.put("/profile", { data });

  public updateAvatar = (data: FormData) =>
    this.http.put("/profile/avatar", { data });

  public updatePassword = (data: any) => this.http.put("/password", { data });
}

export default new UserAPI();
