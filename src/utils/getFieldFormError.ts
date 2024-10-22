/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { EFormFieldNames } from '../types/registerForm';

export const getFieldFormError = (name: string, isValid: boolean): string => {
  if (isValid) {
    return '';
  }

  switch (name) {
    case EFormFieldNames.Password:
      return 'Не выполнены условия пароля: минимум 1 большая буква и цифра';
    case EFormFieldNames.Phone:
      return 'Неверный формат телефона: может начинаться с + и иметь от 10 до 15 цифр';
    case EFormFieldNames.SecondName:
      return 'Неверный формат фамилии: первая буква заглавная без пробелов и цифр';
    case EFormFieldNames.FirstName:
      return 'Неверный формат имени: первая буква заглавная без пробелов и цифр';
    case EFormFieldNames.Login:
    case EFormFieldNames.DisplayName:
      return 'Неверный логин: от 3 до 20 символов';
    case EFormFieldNames.Email:
      return 'Неверный формат почты: должна быть «собака» (@)';
    case EFormFieldNames.PasswordRepeat:
      return 'Пароль не совпадает';
    default:
      return '';
  }
};
