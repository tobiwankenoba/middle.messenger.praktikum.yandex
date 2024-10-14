import api, { AuthApi } from "../api/AuthApi";
import { router } from "../framework/Router";
// import { router } from "../framework/Router";
import { store } from "../framework/Store";
import { prepareUser } from "../mappers";
import { TLoginData, TRegisterData, User } from "../types/api";

class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = api;
  }

  public async login(data: TLoginData) {
    try {
      await this.api.login(data);
      await this.getUser();
      router.go("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  public async getUser() {
    try {
      const user = await this.api.read();
      console.log(user.response);
      store.set("profile", prepareUser(user.response as User));
      store.set("isDraft", false);

      console.log(store);
    } catch (error) {
      console.error(error);
      store.set("error", error);
    }
  }

  public async register(data: TRegisterData) {
    try {
      await this.api.register(data);
      await this.getUser();
      router.go("/profile");
    } catch (error) {
      console.error(error);
      store.set("error", error);
    }
  }

  // public async logout() {
  //   try {
  //     await this.api.logout();
  //     store.set("user", {});
  //     router.go(routes.LoginPage);
  //   } catch (error) {
  //     console.error(error);
  //     if (String(error) === redirectErrors.BAD_USER_COOKIE) {
  //       router.go(routes.LoginPage);
  //     } else {
  //       store.set("error", error);
  //     }
  //   }
  // }
}

export default new AuthController();
