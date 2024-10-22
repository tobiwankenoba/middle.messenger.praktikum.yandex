/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Api, { UserAPI } from '../api/UserApi';
import { store } from '../framework/Store';

import { TUserUpdateValues } from '../types/api';

class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = Api;
  }

  public updateProfile = (data: TUserUpdateValues) => {
    const profileState = store.getState().profileState;

    this.api.updateProfile(data);

    const convertedData = {
      firstName: data.first_name,
      secondName: data.second_name,
      email: data.email,
      displayName: data.display_name,
      phone: data.phone,
    };

    store.set('profileState', {
      ...profileState,
      profile: { ...profileState.profile, ...convertedData },
    });
  };

  public updateAvatar = async (data: FormData) => {
    const profileState = store.getState().profileState;

    await this.api
      .updateAvatar(data)
      .then((data) => {
        store.set('profileState', {
          ...profileState,
          profile: { ...profileState.profile, avatar: data.response.avatar },
        });
      })
      .catch((error) => store.set('error', error));
  };

  public updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const res = await this.api.updatePassword(data);
    if (res.status !== 200) {
      return { status: 'error', message: res.response.reason };
    }
  };
}
export default new UserController();
