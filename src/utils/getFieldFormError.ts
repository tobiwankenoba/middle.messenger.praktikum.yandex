import { EFormFieldNames } from "../types/registerForm";

export const getFieldFormError = (name: string, isValid: boolean): string => {
  if (isValid) {
    return "";
  }

  switch (name) {
    case EFormFieldNames.Password:
      return "Не выполнены условия пароля";
    case EFormFieldNames.Phone:
      return "Неверный формат телефона";
    case EFormFieldNames.SecondName:
      return "Неверный формат фамилии";
    case EFormFieldNames.FirstName:
      return "Неверный формат имени";
    case EFormFieldNames.Login:
    case EFormFieldNames.DisplayName:
      return "Неверный логин";
    case EFormFieldNames.Email:
      return "Неверный формат почты";
    case EFormFieldNames.PasswordRepeat:
      return "Пароль не совпадает";
    default:
      return "";
  }
};
