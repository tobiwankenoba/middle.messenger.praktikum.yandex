import api, { AuthApi } from "../api/AuthApi";
import { router } from "../framework/Router";
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
    store.resetError();
    try {
      const { response, status } = await this.api.read();

      if (status === 200) {
        const profileState = {
          profile: prepareUser(response as User),
        };

        store.set("profileState", profileState);
      } else {
        throw new Error(response.reason);
      }
    } catch (error) {
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
    }
  }

  public async logout() {
    try {
      await this.api.logout();
      store.set("user", {});
      router.go("/");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthController();
