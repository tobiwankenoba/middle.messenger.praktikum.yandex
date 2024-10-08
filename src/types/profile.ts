export interface IProfileState {
  isDraft: boolean;
  profile: IProfile;
  chatsState: IChatState[];
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

export interface IChatState {
  id: number;
  partner: {
    name: string;
    avatar: string | null;
  };
  messages: IMessage[];
}

export enum ESender {
  Me = "me",
  Partner = "partner",
}

export interface IMessage {
  sender: ESender;
  message: string;
  timeSend: string;
  isReading: boolean;
}
