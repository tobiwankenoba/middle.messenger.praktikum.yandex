/* eslint-disable @typescript-eslint/no-shadow */
import { BlockProps } from '../../framework/Block';
import { EFormFieldNames } from '../../types/registerForm';
import { validateFormFields } from './validate';

export const validatePassword = (props: BlockProps) => {
  console.log(props);
  const validatePassword = validateFormFields(
    EFormFieldNames.Password,
    props.newPassword,
  );

  const validateOldPassword = validateFormFields(
    EFormFieldNames.Password,
    props.oldPassword,
  );

  return [
    {
      name: EFormFieldNames.OldPassword,
      isValid: validateOldPassword,
    },
    { name: EFormFieldNames.Password, isValid: validatePassword },
    {
      name: EFormFieldNames.PasswordRepeat,
      isValid: props.newPassword === props.passwordRepeat,
    },
  ];
};
