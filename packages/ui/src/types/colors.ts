export type NormalColors =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "transparent";

export type TextColors = "default" | Exclude<NormalColors, "transparent">;
