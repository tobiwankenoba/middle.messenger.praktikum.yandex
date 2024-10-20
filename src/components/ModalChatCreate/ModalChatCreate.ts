import chatsController from "../../controllers/ChatController";
import { Block } from "../../framework/Block";
import { store } from "../../framework/Store";
import { Button } from "../Button";
import { Input } from "../Input";
import "./styles.pcss";

interface IModalProps {
  onClickClose: () => void;
}

export class ModalChatCreate extends Block<StringIndexed> {
  constructor(props: IModalProps) {
    super({
      ...props,
      Input: new Input({
        class: "full-width",
        id: "createChatInput",
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

            store.set("modalChatVisible", false);
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
