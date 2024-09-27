import { Block } from "../../framework/Block";
import { IChatState } from "../../types/profile";

interface IOpenedChatProps {
  selectedChat?: IChatState;
}

export class OpenedChat extends Block {
  constructor(props: IOpenedChatProps) {
    console.log(props);
    super({
      events: {
        click: () => {
          console.log(this.props);
        },
      },
    });
  }

  override render() {
    return `
      {{chat}}
      {{#unless selectedChat }}
        <div class="chat-content">Выберите чат чтобы отправить сообщение</div>
      {{else}}
        <div class="chat-content open-chat">
          <div class="chat-head">
            <div class="chat-head-wrapper">
              <div class="chat-head-info">
                <div class="chat-image chat-head-image">
                  <img src="{{#if selectedChat.avatar }}{{selectedChat.partner.avatar}}{{else}}src/assets/defaultAvatar.svg{{/if}}" />
                </div>
                <div class="chat-user-name">{{selectedChat.partner.name}}</div>
              </div>
              <div class="chat-more-info">
                <div class="chat-btn"></div>
              </div>
            </div>
          </div>
        </div>
      {{/unless}}

    `;
  }
}
