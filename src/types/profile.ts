export interface IProfileState {
  isDraft: boolean;
  profile: IProfile;
}

export interface IProfile {
  name: string;
  lastname: string;
  email: string;
  login: string;
  chatLogin: string;
  phone: string;
  avatar: string | null;
  password: string;
}
