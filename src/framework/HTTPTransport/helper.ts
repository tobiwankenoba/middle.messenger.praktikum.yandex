// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта

import { EMethods, TDataOptions, TOptions } from "../../types/fetch";

export class HTTPTransport {
  queryStringify(data: TDataOptions) {
    if (typeof data !== "object" || data === null) {
      throw new Error("Data must be object");
    }

    let result = "?";

    for (const [key, value] of Object.entries(data)) {
      result += `${key}=${value}&`;
    }

    return result.slice(0, -1);
  }

  get = (url: string, options: TOptions) => {
    return this.request(
      options.data ? `${url}${this.queryStringify(options.data)}` : url,
      { ...options, method: EMethods.GET },
      options.timeout,
    );
  };

  post = (url: string, options: TOptions) => {
    return this.request(
      url,
      { ...options, method: EMethods.POST },
      options.timeout,
    );
  };

  put = (url: string, options: TOptions) => {
    return this.request(
      url,
      { ...options, method: EMethods.PUT },
      options.timeout,
    );
  };

  delete = (url: string, options: TOptions) => {
    return this.request(
      url,
      { ...options, method: EMethods.DELETE },
      options.timeout,
    );
  };

  request = (url: string, options: TOptions, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();

      const isGet = method === EMethods.GET;

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;

      xhr.onerror = reject;

      xhr.timeout = timeout;

      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
