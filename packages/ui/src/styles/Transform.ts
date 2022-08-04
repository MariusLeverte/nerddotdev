import { TextTransforms } from "../types/transform";

export const TextTransform: Record<TextTransforms, string> = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};
