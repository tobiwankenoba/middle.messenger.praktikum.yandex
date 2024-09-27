export const getFieldFormError = (name: string, isValid: boolean): string => {
  if (isValid) {
    return "";
  }

  switch (name) {
    case "password":
      return "Не выполнены условия пароля";
    case "phone":
      return "Неверный формат телефона";
    case "second_name":
      return "Неверный формат фамилии";
    case "first_name":
      return "Неверный формат имени";
    case "login":
      return "Неверный логин";
    case "email":
      return "Неверный формат почты";
    case "passwordRepeat":
      return "Пароль не совпадает";
    default:
      return "";
  }
};
