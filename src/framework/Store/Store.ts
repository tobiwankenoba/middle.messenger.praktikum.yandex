import { TStoreState } from "../../types/store";
import set from "../../utils/set";
import { EventBus } from "../EventBus";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: Nullable<TStoreState> = {
    profileState: {
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
      chatsState: [],
    },
    chats: [],
    error: null,
  };

  constructor() {
    super();
    this.on(StoreEvents.Updated, () => null);
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }

  public resetError() {
    this.set("error", null);
  }

  public getState(): TStoreState {
    return this.state as TStoreState;
  }
}

export default new Store();
