export interface IProfileState {
  isDraft: boolean;
  profile: IProfile;
}

export interface IProfile {
  firstName: string;
  secondName: string;
  email: string;
  login: string;
  displayName: string;
  phone: string;
  avatar: string | null;
  password: string;
}
