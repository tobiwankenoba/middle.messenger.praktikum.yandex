import { HTTPTransport } from '../framework/HTTPTransport';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(apiPath: string) {
    this.http = new HTTPTransport(apiPath);
  }
}
