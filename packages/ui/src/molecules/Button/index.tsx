import clsx from "clsx";
import React from "react";
import {
  BackgroundColor,
  BorderColor,
  HoverBackgroundColor,
  HoverBorderColor,
  HoverShadowColor,
  HoverTextColorOnBorderColor,
  ShadowColor,
  TextColorOnBackgroundColor,
  TextColorOnBorderColor,
} from "../../styles/Color";
import { ButtonSize, RoundedSize } from "../../styles/Size";
import { NormalColors } from "../../types/colors";
import { NormalSizes, RoundedSizes } from "../../types/sizes";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  color?: NormalColors;
  size?: NormalSizes;
  bordered?: boolean;
  rounded?: RoundedSizes;
  shadow?: boolean;
  animated?: boolean;
}

const Button = ({
  size = "md",
  color = "primary",
  bordered,
  rounded = "lg",
  shadow,
  children,
  animated,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        bordered
          ? [BorderColor[color], HoverBorderColor[color]]
          : [BackgroundColor[color], HoverBackgroundColor[color]],
        bordered
          ? [TextColorOnBorderColor[color], HoverTextColorOnBorderColor[color]]
          : TextColorOnBackgroundColor[color],
        ButtonSize[size],
        RoundedSize[rounded],
        shadow && [ShadowColor[color], HoverShadowColor[color]],
        animated && "transition-all"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
