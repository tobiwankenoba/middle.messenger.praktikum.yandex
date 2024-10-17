import { Block } from "../../framework/Block";
import { router } from "../../framework/Router";
import { SidebarButton } from "./SidebarButton";
import "./styles.pcss";

export class Sidebar extends Block<StringIndexed> {
  constructor() {
    super({
      button: new SidebarButton({
        onClick: () => {
          router.back();
        },
      }),
    });
  }

  render() {
    return `
      <div class="sidebar">
        {{{ button }}}
      </div>
    `;
  }
}
