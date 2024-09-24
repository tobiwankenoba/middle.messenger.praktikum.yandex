import { Title } from "../../components";
import { Block } from "../../framework/Block";

export class ErrorPage extends Block {
  constructor() {
    super({
      Title: new Title({ text: "Вход" }),
    });
  }

  override render() {
    return `
        <div class="container">
          <div class="wrapper no-shadow">
              <div class="not-found-text-block">
                  <div class="not-found-error">404</div>
                  <div class="not-found-notice">Ошибка, тестовая!</div>
              </div>
          </div>
        </div>`;
  }
}
