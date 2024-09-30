import { EFormFieldNames } from "../types/registerForm";

export const validateFormFields = (name: EFormFieldNames, value: string) => {
  if (value === "") {
    return true;
  }
  switch (name) {
    case EFormFieldNames.Login:
    case EFormFieldNames.DisplayName:
      return /^[a-zA-Zа-яА-Я]{3,20}$/.test(value);
    case EFormFieldNames.Password:
      return /^(?=.*[A-Z])(?=.*\d)[a-zA-Zа-яА-Я0-9.,!?]{8,40}$/.test(value);
    case EFormFieldNames.Email:
      return /[a-zA-Z0-9_-]+@.+[a-zA-Z]+\./.test(value);
    case EFormFieldNames.FirstName:
    case EFormFieldNames.SecondName:
      return /[А-Яа-яЁё][a-zA-Zа-яёЁ]$/.test(value);
    case EFormFieldNames.Phone:
      return /\+?[0-9]{10,15}/.test(value);
    default:
      return false;
  }
};
