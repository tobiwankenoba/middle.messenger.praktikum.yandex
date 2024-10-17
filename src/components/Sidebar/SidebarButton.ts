import { Block } from "../../framework/Block";
import "./styles.pcss";

interface ISidebarButtonProps {
  onClick?: VoidFunction;
}

export class SidebarButton extends Block<StringIndexed> {
  constructor(props: ISidebarButtonProps) {
    super({
      events: {
        click: () => props.onClick && props.onClick(),
      },
    });
  }

  render() {
    return `
        <button
          class="hidden-border sidebar-button"
          data-name="pageLink"
          data-url="chat"
        />
    `;
  }
}
