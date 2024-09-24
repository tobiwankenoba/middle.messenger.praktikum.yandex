import { Block } from "../../framework/Block";
import { IInput } from "../../types/input";
import { Input } from "../Input";
import "./styles.pcss";

interface IInputProps extends IInput {
  label: string;
}

export class InputBlock extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
      Input: new Input(props),
    });
  }

  override render(): string {
    return `<div class="input-container">
            <label class="input-label">{{label}}</label>
            {{{ Input }}}
          </div>`;
  }
}
