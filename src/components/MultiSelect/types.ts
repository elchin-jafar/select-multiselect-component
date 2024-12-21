import { BoxProps, ListItemProps, ListRootProps } from "@chakra-ui/react";
import { CSSProperties } from "react";

export interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
}

export interface MultiSelectProps {
  options: Option[];
  disableSearch?: boolean;
  hideSelected?: boolean;
  colorScheme?: CSSProperties["color"];
  width?: CSSProperties["width"];
  borderRadius?: CSSProperties["borderRadius"];
  popoverProps?: BoxProps;
  listProps?: ListRootProps;
  listItemProps?: ListItemProps;
  getLabel?: (option: Option) => string;
  getValue?: (option: Option) => string;
}
