import React, { ReactNode, useRef } from "react";
import clsx, { ClassValue } from "clsx";
import { Leadings, TextSizes, TextWeights } from "../../types/sizes";
import { LineHeight, TextSize, TextWeight } from "../../styles/Size";
import { TextTransforms } from "../../types/transform";
import { TextColors } from "../../types/colors";

type TextElements =
  | "p"
  | "span"
  | "i"
  | "em"
  | "b"
  | "blockquote"
  | "del"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type NormalTextProps = {
  weight?: TextWeights;
  lineHeight?: Leadings;
};

export interface TextProps extends NormalTextProps {
  as?: TextElements;
  children: ReactNode;
  className?: ClassValue;
}

const Text = ({
  as = "p",
  weight = "normal",
  lineHeight = "normal",
  children,
  className,
}: TextProps) => {
  const Component: React.ElementType = as;

  return (
    <Component
      className={clsx(TextWeight[weight], LineHeight[lineHeight], className)}
    >
      {children}
    </Component>
  );
};

export default Text;
