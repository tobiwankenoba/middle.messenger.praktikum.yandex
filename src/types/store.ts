import { IMessagesState } from './api';
import { IChatState, IMessage, IProfileState } from './profile';

export type TStoreState = {
  profileState: IProfileState;
  selectedChat?: IChatState;
  messages: {
    [key in number]: IMessage[];
  };
  chats: IMessagesState[];
  modalContent?: {
    title: string;
    buttonText: string;
  };
  error: string | null;
};
