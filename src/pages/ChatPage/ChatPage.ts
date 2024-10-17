import { LinkButton, LocalNav } from "../../components";
import { ChatItem } from "../../components/ChatItem/ChatItem";
import { ModalChatCreate } from "../../components/ModalChatCreate";
import { OpenedChat } from "../../components/OpenedChat";
import chatsController from "../../controllers/ChatController";
import { Block } from "../../framework/Block";
import { router } from "../../framework/Router";
import { store } from "../../framework/Store";
import { connect } from "../../hoc/connectStore";

class ChatPage extends Block<StringIndexed> {
  constructor() {
    const { selectedChat, chats } = store.getState();

    super({
      LocalNav: new LocalNav(),
      Chats: chats.map(
        (currentChat) =>
          new ChatItem({
            selectedChat: selectedChat,
            currentChat,
            onClick: () => {
              store.set("selectedChat", currentChat);
            },
          }),
      ),
      CurrentChat: new OpenedChat(),
      ProfileLink: new LinkButton({
        text: "Профиль",
        theme: "chats-link",
        onClick: () => {
          router.go("/profile");
        },
      }),
      CreateChat: new LinkButton({
        text: "Создать чат",
        theme: "chats-link",
        onClick: () => {
          console.log(store.getState());
          store.set("modalChatVisible", true);
        },
      }),
      Modal: new ModalChatCreate({
        onClick: () => {
          store.set("modalChatVisible", false);
        },
      }),
    });

    chatsController.getChats();
  }

  override render() {
    return `
    <div class="container">
      {{{ LocalNav }}}
      <div class="chat-wrapper no-shadow">
        <div class="chats-block">
            <div class="chats-header">
              <div class="chats-wrapper">
              <div class="chats-links">
                {{{CreateChat}}}
                <div class="chats-link-container">
                  {{{ProfileLink}}}
                  <div class="chats-arrow"></div>
                </div>
              </div>
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
      {{#if modalChatVisible}} {{{Modal}}} {{/if}}

    </div>
    `;
  }
}

export default connect(ChatPage);
