import { Block } from "../../framework/Block";
import { store, StoreEvents } from "../../framework/Store";

export function connect(Component: typeof Block<StringIndexed>) {
  return class extends Component {
    constructor(...args: any) {
      super({ ...args });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...store.getState() });
      });
    }
  };
}
