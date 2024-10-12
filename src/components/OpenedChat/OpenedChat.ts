import { Block } from "../../framework/Block";
import "./styles.pcss";

export class OpenedChat extends Block<StringIndexed> {
  constructor() {
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
                  <img alt="{{selectedChat.partner.name}}" src="{{#if selectedChat.partner.avatar }}{{selectedChat.partner.avatar}}{{else}}src/assets/defaultAvatar.svg{{/if}}" />
                </div>
                <div class="chat-user-name">{{selectedChat.partner.name}}</div>
              </div>
              <div class="chat-more-info">
                <div class="chat-btn"></div>
              </div>
            </div>
          </div>
          <div class="chat-story">
            {{#if selectedChat.messages.length }}
            {{# each selectedChat.messages}}
            <div class="chat-story-message {{#if (eq sender 'partner')}}partner{{else}}me{{/if}}">{{message}}</div>
            {{/each}}
            {{else}}
            <div class="chat-empty">Здесь будет история ваших сообщений</div>
            {{/if}}
          </div>
          <div class="chat-message">
            <div class="chat-message-wrapper">
              <div class="chat-message-link"></div>
              <input type="text" placeholder="Сообщение" class="chat-message-input" />
              <div class="sidebar-button rotate"></div>
            </div>
          </div>
        </div>
      {{/unless}}

    `;
  }
}
