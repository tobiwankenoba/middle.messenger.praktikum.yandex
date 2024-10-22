import { BlockProps } from '../../framework/Block';
import { EFormFieldNames } from '../../types/registerForm';
import { validateFormFields } from './validate';

export const validateFormRegister = (props: BlockProps) => {
  const validateEmail = validateFormFields(EFormFieldNames.Email, props.email);
  const validateLogin = validateFormFields(EFormFieldNames.Login, props.login);
  const validateFirstName = validateFormFields(
    EFormFieldNames.FirstName,
    props.first_name,
  );
  const validateSecondName = validateFormFields(
    EFormFieldNames.SecondName,
    props.second_name,
  );
  const validatePhone = validateFormFields(EFormFieldNames.Phone, props.phone);
  const validatePassword = validateFormFields(
    EFormFieldNames.Password,
    props.password,
  );

  return [
    { name: EFormFieldNames.Email, isValid: validateEmail },
    { name: EFormFieldNames.Login, isValid: validateLogin },
    { name: EFormFieldNames.FirstName, isValid: validateFirstName },
    { name: EFormFieldNames.SecondName, isValid: validateSecondName },
    { name: EFormFieldNames.Phone, isValid: validatePhone },
    { name: EFormFieldNames.Password, isValid: validatePassword },
    {
      name: EFormFieldNames.PasswordRepeat,
      isValid: props.password === props.passwordRepeat,
    },
  ];
};
