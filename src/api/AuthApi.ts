import { TLoginData, TRegisterData } from "../types/api";
import BaseAPI from "./BaseApi";

export class AuthApi extends BaseAPI {
  constructor() {
    super("/auth");
  }

  public login = (data: TLoginData) => this.http.post("/signin", { data });

  public read = (): Promise<XMLHttpRequest> => this.http.get("/user");

  public register = (data: TRegisterData) =>
    this.http.post("/signup", { data });
}

export default new AuthApi();
