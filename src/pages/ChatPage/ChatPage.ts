import { LocalNav } from "../../components";
import { ChatItem } from "../../components/ChatItem/ChatItem";
import { Block } from "../../framework/Block";
import { IChatState } from "../../types/profile";

interface IChatPageProps {
  chatState: IChatState[];
  selectedChat?: IChatState;
}

export class ChatPage extends Block {
  constructor(props: IChatPageProps) {
    super({
      LocalNav: new LocalNav(),
      Chats: props.chatState.map(
        (currentChat) =>
          new ChatItem({
            currentChat,
            onClick: () => {
              this.setProps({ selectedChat: currentChat });
            },
          }),
      ),
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
        {{#unless ${this.props.selectedChat?.id} }}
        <div class="chat-content">Выберите чат чтобы отправить сообщение</div>
        {{else}}
        <div class="chat-content">Тут будет чат</div>
        {{/unless}}
      </div>
    </div>
    `;
  }
}
