export enum ControlType {
  Text = "text",
  Number = "number",
  Textarea = "textarea",
  Date = "date",
  Select = "select",
  Checkbox = "checkbox",
  Radio = "radio",
  File = "file",
  Button = "button",
  Password = "password",
  Array = "array",
  Group = "group",
}

export type JSONControl = ControlBase;

export type JSONForm = {
  controls: JSONControl[];
  values?: any;
}

export type ControlWithChildren = ControlBase & {
  controls: JSONControl[];
}

export type ControlLayout = {
  width: number;
}

type ControlBase = {
  type: ControlType;
  name: string;
  label?: string;
  placeholder?: string;
  validations?: Validation[];
  controls?: JSONControl[];
  options?: ControlSelectOption[];
  layout?: ControlLayout;
}

export enum ButtonActionType {
  DeleteArrayItem = "deleteArrayItem",
  AddArrayItem = "addArrayItem",
  submit = "submit",
}

export type ControlButton = ControlBase & {
  action: ButtonActionType;
}

export type ControlSelectOption = {
  value: string;
  label: string;
  default?: boolean;
}

export type ControlTextArea = ControlBase & {
  rows?: number;
}

type Validation = {
  fnc: Function;
  name: string;
  message: string;
}