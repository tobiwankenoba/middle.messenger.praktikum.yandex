import { Block } from "../../framework/Block";
import { ErrorPage } from "./ErrorPage";

export class NotFoundPage extends Block<StringIndexed> {
  constructor() {
    super({
      ErrorPage: new ErrorPage({
        errorMessage: "Не туда попали",
        statusCode: 404,
      }),
    });
  }

  override render() {
    return `{{{ ErrorPage }}}`;
  }
}
