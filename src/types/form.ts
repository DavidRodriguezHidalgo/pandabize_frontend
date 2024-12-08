import { FieldError, UseFormRegister } from "react-hook-form";

export type FormFieldProps = {
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  label: string;
};
