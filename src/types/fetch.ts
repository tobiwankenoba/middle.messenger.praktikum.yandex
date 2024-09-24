export enum EMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type TOptions = {
  data: TDataOptions;
  timeout: number;
  withCredentials: boolean;
  method: EMethods;
  headers: {
    [key: string]: string;
  };
};

export type TDataOptions = Document | XMLHttpRequestBodyInit | null | undefined;
