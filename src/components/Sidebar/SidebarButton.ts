import { Block } from "../../framework/Block";
import "./styles.pcss";

interface ISidebarButtonProps {
  onClick?: VoidFunction;
  class?: string;
}

export class SidebarButton extends Block<StringIndexed> {
  constructor(props: ISidebarButtonProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
    });
  }

  render() {
    return `
        <button
          class="hidden-border sidebar-button {{class}}"
        />
    `;
  }
}
