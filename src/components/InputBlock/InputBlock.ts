import { Block } from "../../framework/Block";
import { IInput } from "../../types/input";
import { Input } from "../Input";
import "./styles.pcss";

interface IInputProps extends Omit<IInput, "onBlur"> {
  label: string;
  onBlur?: (e: Event) => string | undefined;
}

export class InputBlock extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
      Input: new Input({
        ...props,
        onBlur: (e: Event) => {
          if (props.onBlur) {
            const res = props.onBlur(e);

            this.setProps({
              errorMessage: res !== "" ? res : undefined,
            });
          }
        },
      }),
    });
  }

  override render(): string {
    return `<div class="input-container">
              <label class="input-label">{{label}}</label>
              {{{ Input }}}
              {{# if errorMessage }}<div class="input-error-message">{{ errorMessage }}</div>{{/if}}
          </div>`;
  }
}
