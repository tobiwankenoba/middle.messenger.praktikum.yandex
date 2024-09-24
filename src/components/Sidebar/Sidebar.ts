import { Block } from "../../framework/Block";
import "./styles.pcss";

export class Sidebar extends Block {
  constructor() {
    super();
  }

  render() {
    return `
      <div class="sidebar">
        <button
          class="hidden-border sidebar-button"
          data-name="pageLink"
          data-url="login"
        />
      </div>
    `;
  }
}
