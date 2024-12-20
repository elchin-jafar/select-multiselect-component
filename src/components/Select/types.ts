import { CSSProperties } from "react";

export interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
}

export interface SelectProp {
  options: Option[];
  colorScheme?: CSSProperties["color"];
  placeholder?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  borderRadius?: CSSProperties["borderRadius"];
  closeOnSelect?: boolean;
  disableOption?: (option: Option) => boolean;
}