import {
  Gap,
  Leadings,
  NormalSizes,
  RoundedSizes,
  Spaces,
  Spans,
  TextSizes,
  TextWeights,
} from "../types/sizes";

export const ButtonSize: Record<NormalSizes, string> = {
  xs: "px-2",
  sm: "px-3",
  md: "px-4 py-2",
  lg: "px-6 py-4",
  xl: "px-10 py-6",
};

export const RoundedSize: Record<RoundedSizes, string> = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const TextSize: Record<TextSizes, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

export const TextWeight: Record<TextWeights, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

export const ColumnSpan: Record<Spans, string> = {
  full: "col-span-full",
  auto: "col-span-full",
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export const GridGap: Record<Gap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
};

export const SpaceBetweenX: Record<Spaces, string> = {
  0: "space-x-0",
  1: "space-x-1",
  2: "space-x-2",
  3: "space-x-3",
  4: "space-x-4",
  5: "space-x-5",
  6: "space-x-6",
  7: "space-x-7",
  8: "space-x-8",
  9: "space-x-9",
  10: "space-x-10",
  11: "space-x-11",
  12: "space-x-12",
  0.5: "space-x-0.5",
  1.5: "space-x-1.5",
  2.5: "space-x-2.5",
  14: "space-x-14",
  16: "space-x-16",
  18: "space-x-18",
  20: "space-x-20",
};

export const SpaceBetweenY: Record<Spaces, string> = {
  0: "space-y-0",
  1: "space-y-1",
  2: "space-y-2",
  3: "space-y-3",
  4: "space-y-4",
  5: "space-y-5",
  6: "space-y-6",
  7: "space-y-7",
  8: "space-y-8",
  9: "space-y-9",
  10: "space-y-10",
  11: "space-y-11",
  12: "space-y-12",
  0.5: "space-y-0.5",
  1.5: "space-y-1.5",
  2.5: "space-y-2.5",
  14: "space-y-14",
  16: "space-y-16",
  18: "space-y-18",
  20: "space-y-20",
};

export const LineHeight: Record<Leadings, string> = {
  3: "leading-3",
  4: "leading-4",
  5: "leading-5",
  6: "leading-6",
  7: "leading-7",
  8: "leading-8",
  9: "leading-9",
  10: "leading-10",
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

export const MaxWidth: Record<NormalSizes, string> = {
  xs: "max-w-3xl",
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};
