import { SizeConfigValues, Sizes } from "./types";

export const sizeConfig: Record<Sizes, SizeConfigValues> = {
  sm: {
    fontSize: "12px",
    inputPadding: "6px",
    tagPadding: "2px",
  },
  md: {
    fontSize: "14px",
    inputPadding: "8px",
    tagPadding: "4px",
  },
  lg: {
    fontSize: "16px",
    inputPadding: "10px",
    tagPadding: "6px",
  },
};
