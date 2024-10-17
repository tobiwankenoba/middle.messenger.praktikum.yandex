import { IMessagesState } from "./api";
import { IChatState, IMessage, IProfileState } from "./profile";

export type TStoreState = {
  profileState: IProfileState;
  selectedChat?: IChatState;
  messages: IMessage[][];
  chats: IMessagesState[];
  modalContent?: {
    title: string;
    buttonText: string;
  };
  error: string | null;
};
