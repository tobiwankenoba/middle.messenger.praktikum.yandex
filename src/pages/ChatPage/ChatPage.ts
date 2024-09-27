import { LocalNav } from "../../components";
import { ChatItem } from "../../components/ChatItem/ChatItem";
import { OpenedChat } from "../../components/OpenedChat";
import { Block } from "../../framework/Block";
import { IChatState } from "../../types/profile";

interface IChatPageProps {
  chatState: IChatState[];
  selectedChat?: IChatState;
}

export class ChatPage extends Block {
  constructor({ chatState, selectedChat }: IChatPageProps) {
    super({
      LocalNav: new LocalNav(),
      Chats: chatState.map(
        (currentChat) =>
          new ChatItem({
            selectedChat: selectedChat,
            currentChat,
            onClick: () => {
              this.setProps({
                selectedChat: currentChat,
              });
            },
          }),
      ),
      CurrentChat: new OpenedChat({ selectedChat }),
    });
  }

  override render() {
    return `
    <div class="container">
      {{{ LocalNav }}}
      <div class="chat-wrapper no-shadow">
        <div class="chats-block">
            <div class="chats-header">
              <div class="chats-wrapper">
                <a data-name="pageLink" data-url="profile" class="chats-link">
                  <div>Профиль</div>
                  <div class="chats-arrow"></div>
                </a>
                <div class="chats-search">
                  <input type="text" class="chats-search-input" />
                </div>
              </div>
            </div>
            <div class="chats-list">
                  {{{ Chats }}}
            </div>
        </div>
        {{{ CurrentChat }}}
      </div>
    </div>
    `;
  }
}
