export interface IFieldsValid {
  name: string;
  isValid: boolean;
}

export enum EFormFieldNames {
  Email = "email",
  Login = "login",
  FirstName = "first_name",
  SecondName = "second_name",
  Phone = "phone",
  Password = "password",
  PasswordRepeat = "passwordRepeat",
  DisplayName = "display_name",
}
