export interface IInput {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  class?: string;
  readonly?: boolean;
  onBlur?: (e: Event) => void;
  onInput?: (e: Event) => void;
}
