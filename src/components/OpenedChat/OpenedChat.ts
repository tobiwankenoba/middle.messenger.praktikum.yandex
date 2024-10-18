import chatsController from "../../controllers/ChatController";
import MessagesController from "../../controllers/MessagesController";
import { Block } from "../../framework/Block";
import { store } from "../../framework/Store";
import { ChatButton } from "../ChatButton";
import { Input } from "../Input";
import { ModalAddUser } from "../ModalAddUser";
import { ModalRemoveUser } from "../ModalRemoveUser";
import { SidebarButton } from "../Sidebar/SidebarButton";
import "./styles.pcss";

export class OpenedChat extends Block<StringIndexed> {
  constructor() {
    super({
      DeleteChatButton: new ChatButton({
        elementForRender: "delete chat",
        onClick: async () => {
          const selectedChat = store.getState().selectedChat;

          if (selectedChat) {
            await chatsController.delete(selectedChat.id);

            store.set("selectedChat", { id: 0 });
          }
        },
      }),
      AddUserButton: new ChatButton({
        elementForRender: "add user",
        onClick: async () => {
          store.set("modalAddUserVisible", true);
        },
      }),
      RemoveUserButton: new ChatButton({
        elementForRender: "remove user",
        onClick: async () => {
          store.set("modalRemoveUserVisible", true);
        },
      }),
      ModalAddUser: new ModalAddUser({
        onClickClose: () => {
          store.set("modalAddUserVisible", false);
        },
      }),
      ModalRemoveUser: new ModalRemoveUser({
        onClickClose: () => {
          store.set("modalAddUserVisible", false);
        },
      }),
      SendButton: new SidebarButton({
        onClick: async () => {
          const selectedChat = store.getState().selectedChat;

          if (selectedChat && this.props.messageForSend) {
            await MessagesController.postMessage(
              selectedChat?.id,
              this.props.messageForSend,
            );
          }

          const AllMessages = store.getState().messages;

          console.log(store.getState().messages);

          const messages = Object.entries(AllMessages).find(
            (item) => Number(item[0]) === selectedChat?.id,
          );

          if (messages && messages.length > 0) {
            store.set("activeMessages", messages[1]);
          }

          console.log(store.getState());
        },
        class: "rotate",
      }),
      Input: new Input({
        class: "chat-message-input",
        type: "text",
        placeholder: "Сообщение",
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const message = e.target.value;

            store.set("messageForSend", message);
          }
        },
      }),
    });
  }

  override render() {
    return `
      {{#unless selectedChat.id }}
        <div class="chat-content">Выберите чат чтобы отправить сообщение</div>
      {{else}}
        <div class="chat-content open-chat">
          <div class="chat-head">
            <div class="chat-head-wrapper">
              <div class="chat-head-info">
                <div class="chat-image chat-head-image">
                  <img alt="{{selectedChat.partner.name}}" src="{{#if selectedChat.avatar }}{{selectedChat.avatar}}{{else}}src/assets/defaultAvatar.svg{{/if}}" />
                </div>
                <div class="chat-user-name">{{selectedChat.title}}</div>
              </div>
              <div class="chat-more-info">
                <div class="chat-btn">
                {{{RemoveUserButton}}}
                  {{{AddUserButton}}}
                  {{{ DeleteChatButton }}}
                </div>
              </div>
            </div>
          </div>
          <div class="chat-story">
            {{#if activeMessages }}
              {{# each activeMessages }}
                <div class="chat-story-message {{#unless (eq user_id ../profileState.profile.id )}}partner{{else}}me{{/unless}}">{{content}}</div>
              {{/each}}
            {{else}}
              <div class="chat-empty">Здесь будет история ваших сообщений</div>
            {{/if}}
          </div>
          <div class="chat-message">
            <div class="chat-message-wrapper">
              <div class="chat-message-link"></div>
                {{{Input}}}
                {{{SendButton}}}
            </div>
          </div>
          {{#if modalAddUserVisible}} {{{ModalAddUser}}} {{/if}}
          {{#if modalRemoveUserVisible}} {{{ModalRemoveUser}}} {{/if}}
        </div>
      {{/unless}}

    `;
  }
}
