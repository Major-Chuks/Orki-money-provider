import { StaticImageData } from "next/image";

export interface ICustomInput {
  id?: InputIdState;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => void;
  value?: GetValueProps["value"];
  error?: GetErrorProps["error"];
  errorMsg?: string;
  label?: string;
  disabled?: boolean;
  outline?: boolean;
  leftIcon?: StaticImageData;
  rightIcon?: StaticImageData;
  faint?: boolean;
  plain?: boolean;
}

export type ErrorState = { [key: number | string]: boolean };
export type InputState = { [key: number | string]: string };
export type InputIdState = string;

export interface ResetValidationProps {
  id: InputIdState;
  error: ErrorState;
  setError: React.Dispatch<React.SetStateAction<ErrorState>>;
}

export interface ValidateInputProps {
  input: InputState;
  setError: React.Dispatch<React.SetStateAction<ErrorState>>;
}

export interface ClearIinputStates {
  input: InputState;
  setPassword: React.Dispatch<React.SetStateAction<InputState>>;
}

export interface GetErrorProps {
  error?: ErrorState | boolean;
  id?: InputIdState;
}

export interface GetValueProps {
  value?: InputState | string;
  id?: InputIdState;
}

export const validateInput = ({ input, setError }: ValidateInputProps) => {
  let state = true;
  Object.keys(input).forEach((key) => {
    const index = key as keyof typeof input;
    const value = input[index];
    if (!value) {
      setError((e) => ({ ...e, [index]: true }));
      state = false;
    } else {
      setError((e) => ({ ...e, [index]: false }));
    }
  });
  return state;
};

export const resetValidation = ({
  id,
  error,
  setError,
}: ResetValidationProps) => {
  if (error[id as keyof typeof error]) {
    setError((e) => ({ ...e, [id]: false }));
  }
};

export const clearInputs = ({ input, setPassword }: ClearIinputStates) => {
  Object.keys(input).forEach((key) => {
    const _key = key as keyof typeof input;
    setPassword((e) => ({ ...e, [_key]: "" }));
  });
};

export const getValue = ({ value, id }: GetValueProps): string => {
  if (typeof value === "string") {
    return value;
  } else {
    if (value && id) {
      return value[id];
    }
  }
  return "";
};

export const getError = ({ error, id }: GetErrorProps): boolean => {
  if (typeof error === "boolean") {
    return error;
  } else {
    if (error && id) {
      return error[id];
    }
  }
  return false;
};
