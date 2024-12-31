export enum EInputType {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DATE = "date",
  FILE = "file",
  TEL = "tel",
  TEXTAREA = "textarea",
  SELECT = "select",
}

type TInputType =
  | "text"
  | "email"
  | "password"
  | "file"
  | "checkbox"
  | "date"
  | "tel"
  | "number";

export type TFormSection<T> = {
  title: string;
  fields: TFormField<T>[];
};

export type TFormField<T> = (
  | {
      type: TInputType;
    }
  | {
      type: EInputType.SELECT;
      option?: {
        label: string;
        value: string;
      }[];
    }
) & {
  required: boolean;
  grid: 1 | 2 | 3 | 4;
  label: string;
  placeholder?: string;
  name: keyof T;
};
