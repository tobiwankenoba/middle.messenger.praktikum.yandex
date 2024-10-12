import { Block } from "../../framework/Block";
import "./styles.pcss";

export class Sidebar extends Block<StringIndexed> {
  constructor() {
    super({});
  }

  render() {
    return `
      <div class="sidebar">
        <button
          class="hidden-border sidebar-button"
          data-name="pageLink"
          data-url="chat"
        />
      </div>
    `;
  }
}
