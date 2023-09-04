import { formRules } from "../../../../../config/validations/formRules";
import { validations } from "../../../../../config/validations/validations";

export const rules: any = {
  name: () => formRules.name(),
  email: (field?: string) => [
    validations.required.text(field),
    validations.email(field),
  ],
  mobileNumber: () => formRules.phone(),
  roleId: (field?: string) => [validations.required.select(field)],
  password: (field?: any) => [
    validations.required.text(field),
    validations.pattern.password(field),
  ],
};
