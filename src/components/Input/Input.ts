import { Block } from "../../framework/Block";
import "./styles.pcss";

interface IInputProps {
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
}

export class Input extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return `<div class="input-container">
            <label class="input-label">{{label}}</label>
            <input
              id="{{id}}"
              type="{{type}}"
              name="{{name}}"
              value="{{value}}"
              placeholder="{{placeholder}}"
              class="hidden-border input"
            />
          </div>`;
  }
}
