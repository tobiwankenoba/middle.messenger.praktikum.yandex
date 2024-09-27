export const validateFormFields = (name: string, value: string) => {
  switch (name) {
    case "login":
      return /^[a-zA-Zа-яА-Я]{3,20}$/.test(value);
    case "password":
      return /^(?=.*[A-Z])(?=.*\d)[a-zA-Zа-яА-Я0-9.,!?]{8,40}$/.test(value);
    default:
      return false;
  }
};
