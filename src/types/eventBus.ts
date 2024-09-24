export type TListener<T> = {
  [key: string]: Array<(...args: TArgsFunc<T>) => void>;
};

export type TArgsFunc<T> = T[];
