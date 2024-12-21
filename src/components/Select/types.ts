import { BoxProps, ListItemProps, ListRootProps } from "@chakra-ui/react";
import { CSSProperties } from "react";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type SizeConfigValues = {
  inputHeight: CSSProperties["height"];
  fontSize: CSSProperties["fontSize"];
  padding: CSSProperties["padding"];
};

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
  hideSelected?: boolean;
  placement?: "bottom" | "top" | "left" | "right";
  disableOption?: (option: Option) => boolean;
  popoverProps?: BoxProps;
  listProps?: ListRootProps;
  listItemProps?: ListItemProps;
  getLabel?: (option: Option) => string;
  getValue?: (option: Option) => string | number;
  size?: Sizes;
}
