import { BlockProps } from "../../framework/Block";
import { IProfile } from "../../types/profile";
import { EFormFieldNames } from "../../types/registerForm";
import { validateFormFields } from "./validate";

export const validateFormProfile = (props: BlockProps, profile: IProfile) => {
  const validateEmail = validateFormFields(
    EFormFieldNames.Email,
    props.email ?? profile.email,
  );
  const validateFirstName = validateFormFields(
    EFormFieldNames.FirstName,
    props.first_name ?? profile.firstName,
  );
  const validateDisplayName = validateFormFields(
    EFormFieldNames.DisplayName,
    props.displayName ?? profile.displayName,
  );
  console.log(props);
  console.log(props.display_name ?? profile.displayName);
  const validateSecondName = validateFormFields(
    EFormFieldNames.SecondName,
    props.second_name ?? profile.secondName,
  );

  const validatePhone = validateFormFields(
    EFormFieldNames.Phone,
    props.phone ?? profile.phone,
  );

  return [
    { name: EFormFieldNames.Email, isValid: validateEmail },
    { name: EFormFieldNames.FirstName, isValid: validateFirstName },
    { name: EFormFieldNames.SecondName, isValid: validateSecondName },
    { name: EFormFieldNames.Phone, isValid: validatePhone },
    { name: EFormFieldNames.DisplayName, isValid: validateDisplayName },
  ];
};
