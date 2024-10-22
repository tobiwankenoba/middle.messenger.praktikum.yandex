import { ChatItem } from '../../components/ChatItem/ChatItem';
import { Block } from '../../framework/Block';
import { store, StoreEvents } from '../../framework/Store';

export function connect(Component: typeof Block<StringIndexed>) {
  return class extends Component {
    constructor(...args: any) {
      super({ ...args });

      const storeState = store.getState();

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...storeState });

        const { chats, selectedChat } = storeState;

        const newChats = chats.map(
          (currentChat) =>
            new ChatItem({
              selectedChatId: selectedChat?.id,
              currentChat,
              onClick: () => {
                store.set('selectedChat', currentChat);

                const AllMessages = store.getState().messages;

                const messages = Object.entries(AllMessages).find(
                  (item) => Number(item[0]) === selectedChat?.id,
                );

                if (messages && messages.length > 0) {
                  store.set('activeMessages', messages[1]);
                }
              },
            }),
        );

        this.setLists({
          Chats: newChats,
        });
      });
    }
  };
}
