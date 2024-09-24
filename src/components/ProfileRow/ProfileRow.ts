import { Block } from "../../framework/Block";
import { IInput } from "../../types/input";
import { Input } from "../Input";
import "./styles.pcss";

interface IProfileRowProps extends IInput {
  label: string;
}

export class ProfileRow extends Block {
  constructor(props: IProfileRowProps) {
    const { label } = props;

    super({
      label,
      Input: new Input({ ...props, class: "row-input" }),
    });
  }

  render() {
    return `
      <div class="profile-row">
        <label class="row-label">{{label}}</label>
        {{{ Input }}}
      </div>
    `;
  }
}
