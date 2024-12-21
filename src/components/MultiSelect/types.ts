export interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
}

export interface MultiSelectProps {
  options: Option[];
  disableSearch?: boolean;
  hideSelected?: boolean;
}
