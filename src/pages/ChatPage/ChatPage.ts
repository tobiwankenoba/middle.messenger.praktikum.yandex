/* eslint-disable @typescript-eslint/no-floating-promises */
import { LinkButton } from '../../components';
import { ChatItem } from '../../components/ChatItem/ChatItem';
import { ModalChatCreate } from '../../components/ModalChatCreate';
import { OpenedChat } from '../../components/OpenedChat';
import chatsController from '../../controllers/ChatController';
import { Block } from '../../framework/Block';
import { router } from '../../framework/Router';
import { store } from '../../framework/Store';
import { connect } from '../../hoc/connectStore';

class ChatPage extends Block<StringIndexed> {
  constructor() {
    const { selectedChat, chats } = store.getState();

    super({
      Chats: chats.map(
        (currentChat) =>
          new ChatItem({
            selectedChatId: selectedChat?.id,
            currentChat,
            onClick: () => {
              store.set('selectedChat', currentChat);
            },
          }),
      ),
      CurrentChat: new OpenedChat(),
      ProfileLink: new LinkButton({
        text: 'Профиль',
        theme: 'chats-link',
        onClick: () => {
          router.go('/profile');
        },
      }),
      CreateChat: new LinkButton({
        text: 'Создать чат',
        theme: 'chats-link',
        onClick: () => {
          store.set('modalChatVisible', true);

          const input = document.getElementById('createChatInput');

          if (input instanceof HTMLInputElement) {
            input.value = '';
          }
        },
      }),
      Modal: new ModalChatCreate({
        onClickClose: () => {
          store.set('modalChatVisible', false);
        },
      }),
    });

    chatsController.getChats();
  }

  override render() {
    return `
    <div class="container">
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
