import chatsController from "../../controllers/ChatController";
import { Block } from "../../framework/Block";
import { store } from "../../framework/Store";
import { Button } from "../Button";
import { ChatItem } from "../ChatItem/ChatItem";
import { Input } from "../Input";
import "./styles.pcss";

interface IModalProps {
  onClick: () => void;
}

export class ModalChatCreate extends Block<StringIndexed> {
  constructor(props: IModalProps) {
    super({
      ...props,
      Input: new Input({
        class: "full-width",
        placeholder: "Название чата",
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const title = { chatTitle: e.target.value };

            this.setProps({
              disabled: !Boolean(title.chatTitle),
              ...title,
            });
          }
        },
      }),
      SaveButton: new Button({
        fullWidth: true,
        text: "Создать",
        disabled: true,
        onClick: async () => {
          if (this.props.chatTitle) {
            await chatsController.create(this.props.chatTitle);

            const { chats, selectedChat } = store.getState();

            console.log(chats);

            store.set("Chats", [
              chats.map(
                (currentChat) =>
                  new ChatItem({
                    selectedChat: selectedChat,
                    currentChat,
                    onClick: () => {
                      store.set("selectedChat", currentChat);
                    },
                  }),
              ),
            ]);

            console.log(this.props);

            store.set("modalChatVisible", false);
          }
        },
      }),
      CloseButton: new Button({
        fullWidth: true,
        class: "cancel-btn",
        text: "Отмена",
        onClick: () => {
          store.set("modalChatVisible", false);
        },
      }),
    });
  }

  render() {
    return `
      <div class="modal-container">
        <div class="modal-wrapper">
          <div class="modal-title">
            Создать чат
          </div>
          <div class="modal-body">
            <div class="modal-input">
              {{{Input}}}
            </div>
            <div class="modal-btn">
              {{{ SaveButton }}}
              {{{CloseButton}}}
            </div>
          </div>
        </div>
        <div class="modal-shadow"></div>
      </div>
    `;
  }
}
