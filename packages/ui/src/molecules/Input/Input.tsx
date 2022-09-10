import clsx from "clsx";
import React from "react";
import Label from "../../atoms/Label/Label";
import { BackgroundColor, BorderColor } from "../../styles/Color";
import { RoundedSize, TextSize } from "../../styles/Size";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  className?: string;
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className={className}>
      {label && <Label text={label} />}
      <input
        className={clsx(
          BorderColor.primary,
          BackgroundColor.light,
          RoundedSize.lg,
          TextSize.lg,
          "p-2 w-full h-12"
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
