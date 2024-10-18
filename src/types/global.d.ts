declare global {
  type Nullable<T> = T | null | {};

  type Indexed<T = any> = {
    [key in string | symbol]: T;
  };

  type PlainObject<T = any> = {
    [key in string]: T;
  };

  type StringIndexed = Record<string, any>;
}

export {};
