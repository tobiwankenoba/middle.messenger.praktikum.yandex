import { User } from "../types/api";
import { IProfile } from "../types/profile";

export const prepareUser = (data: User): Omit<IProfile, "password"> => ({
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar,
  phone: data.phone,
  email: data.email,
});
