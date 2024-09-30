import { Block } from "../../framework/Block";
import { IChatState } from "../../types/profile";
import "./styles.pcss";

interface IChatItemProps {
  currentChat: IChatState;
  isActive?: boolean;
  selectedChat?: IChatState;
  onClick: () => void;
}

export class ChatItem extends Block {
  constructor({
    currentChat,
    onClick,
    selectedChat,
    isActive,
  }: IChatItemProps) {
    super({
      id: currentChat.id,
      lastMessage: currentChat.messages[currentChat.messages.length - 1],
      name: currentChat.partner.name,
      avatar: currentChat.partner.avatar,
      isActive,
      countUnreadMessages: currentChat.messages.filter(
        (item) => !item.isReading,
      ).length,
      events: {
        click: () => {
          onClick();
        },
      },
      selectedChat,
      currentChat,
    });
  }

  render() {
    return `
    <div class="chat-container {{#if (eq selectedChat.id id) }}selected-chat{{/if}}">
        <div class="chats-item">
          <div class="chat-image"><img src="{{#if avatar }}{{avatar}}{{else}}src/assets/defaultAvatar.svg{{/if}}" /></div>
          <div class="chat-textblock">
            <div class="chat-textblock-title">{{name}}</div>
            <div class="chat-textblock-message">{{ lastMessage.message }}</div>
          </div>
          <div class="chat-infoblock">
            <div class="chat-infoblock-time">{{ lastMessage.timeSend }}</div>
            {{#if countUnreadMessages }}<div class="chat-infoblock-count-new-messages">{{countUnreadMessages}}</div>{{/if}}
          </div>
        </div>
    </div>
    `;
  }
}
