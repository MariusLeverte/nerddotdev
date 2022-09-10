export type NormalColors =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "transparent"
  | "light";

export type TextColors = "default" | Exclude<NormalColors, "transparent">;
