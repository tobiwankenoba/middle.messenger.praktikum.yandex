import { Block } from "../../framework/Block";
import { ErrorPage } from "./ErrorPage";

export class ServerErrorPage extends Block<StringIndexed> {
  constructor() {
    super({
      ErrorPage: new ErrorPage({
        errorMessage: "Мы уже фиксим",
        statusCode: 500,
      }),
    });
  }

  override render() {
    return `{{{ ErrorPage }}}`;
  }
}
