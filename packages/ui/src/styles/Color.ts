import { NormalColors, TextColors } from "../types/colors";

export const BorderColor: Record<NormalColors, string> = {
  primary: "border border-primary border-2",
  secondary: "border border-secondary border-2",
  success: "border border-success border-2",
  warning: "border border-warning border-2",
  error: "border border-error border-2",
  transparent: "",
};

export const BackgroundColor: Record<NormalColors, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  transparent: "bg-transparent",
};

export const TextColorOnBackgroundColor: Record<NormalColors, string> = {
  primary: "text-white",
  secondary: "text-white",
  success: "text-white",
  warning: "text-white",
  error: "text-white",
  transparent: "text-black",
};

export const TextColorOnBorderColor: Record<NormalColors, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  transparent: "text-black",
};

export const ShadowColor: Record<NormalColors, string> = {
  primary: "shadow shadow-primary/50",
  secondary: "shadow shadow-secondary/50",
  success: "shadow shadow-success/50",
  warning: "shadow shadow-warning/50",
  error: "shadow shadow-error/50",
  transparent: "",
};

export const HoverBackgroundColor: Record<NormalColors, string> = {
  primary: "hover:bg-primary-hover",
  secondary: "hover:bg-secondary-hover",
  success: "hover:bg-success-hover",
  warning: "hover:bg-warning-hover",
  error: "hover:bg-error-hover",
  transparent: "",
};

export const HoverBorderColor: Record<NormalColors, string> = {
  primary: "hover:border-primary-hover",
  secondary: "hover:border-secondary-hover",
  success: "hover:border-success-hover",
  warning: "hover:border-warning-hover",
  error: "hover:border-error-hover",
  transparent: "",
};

export const HoverTextColorOnBorderColor: Record<NormalColors, string> = {
  primary: "hover:text-primary-hover",
  secondary: "hover:text-secondary-hover",
  success: "hover:text-success-hover",
  warning: "hover:text-warning-hover",
  error: "hover:text-error-hover",
  transparent: "text-black",
};

export const HoverShadowColor: Record<NormalColors, string> = {
  primary: "hover:shadow-primary-hover/50",
  secondary: "hover:shadow-secondary-hover/50",
  success: "hover:shadow-success-hover/50",
  warning: "hover:shadow-warning-hover/50",
  error: "hover:shadow-error-hover/50",
  transparent: "",
};

export const TextColor: Record<TextColors, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  default: "",
};
