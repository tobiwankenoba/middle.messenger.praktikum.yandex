import { MOCK_CHAT } from "../../constants/chatMock";
import { IProfileState } from "../../types/profile";
import set from "../../utils/set";
import { EventBus } from "../EventBus";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: Nullable<IProfileState> = {
    isDraft: false,
    profile: {
      firstName: "",
      secondName: "",
      email: "",
      phone: "",
      displayName: "",
      login: "",
      avatar: "",
      password: "",
    },
    chatsState: MOCK_CHAT,
  };

  constructor() {
    super();
    this.on(StoreEvents.Updated, () => null);
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }

  public getState(): IProfileState {
    return this.state as IProfileState;
  }
}

export default new Store();
