import { SizeConfigValues, Sizes } from "./types";

export const placementStyles = {
  bottom: { top: "100%", left: 0 },
  top: { bottom: "100%", left: 0 },
  left: { right: "100%", top: 6 },
  right: { left: "100%", top: 6 },
};

export const sizeConfig: Record<Sizes, SizeConfigValues> = {
  xs: { inputHeight: "30px", fontSize: "10px", padding: "12px" },
  sm: { inputHeight: "35px", fontSize: "12px", padding: "14px" },
  md: { inputHeight: "40px", fontSize: "14px", padding: "16px" },
  lg: { inputHeight: "45px", fontSize: "16px", padding: "18px" },
  xl: { inputHeight: "50px", fontSize: "18px", padding: "20px" },
  xxl: { inputHeight: "55px", fontSize: "20px", padding: "22px" },
};
