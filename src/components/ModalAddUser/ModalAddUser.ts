import chatsController from "../../controllers/ChatController";
import { Block } from "../../framework/Block";
import { store } from "../../framework/Store";
import { Button } from "../Button";
import { Input } from "../Input";
import "./styles.pcss";

interface IModalProps {
  onClickClose: () => void;
}

export class ModalAddUser extends Block<StringIndexed> {
  constructor(props: IModalProps) {
    super({
      ...props,
      Input: new Input({
        class: "full-width",
        id: "addUser",
        placeholder: "Id пользователя",
        onBlur: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const userId = { userIdForAdd: e.target.value };

            this.setProps({
              disabled: !Boolean(userId.userIdForAdd),
              ...userId,
            });
          }
        },
      }),
      SaveButton: new Button({
        fullWidth: true,
        text: "Добавить",
        disabled: true,
        onClick: async () => {
          if (this.props.userIdForAdd && this.props.selectedChat.id) {
            await chatsController.addUserToChat(
              this.props.selectedChat.id,
              this.props.userIdForAdd,
            );
            store.set("modalAddUserVisible", false);
          }
        },
      }),
      CloseButton: new Button({
        fullWidth: true,
        class: "cancel-btn",
        text: "Отмена",
        onClick: () => {
          props.onClickClose && props.onClickClose();
        },
      }),
    });
  }

  render() {
    return `
      <div class="modal-container">
        <div class="modal-wrapper">
          <div class="modal-title">
            Добавить пользователя в чат
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
