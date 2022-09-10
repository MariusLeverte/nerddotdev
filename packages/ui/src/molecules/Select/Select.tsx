import clsx from "clsx";
import React from "react";
import Label from "../../atoms/Label/Label";
import { BackgroundColor, BorderColor } from "../../styles/Color";
import { RoundedSize, TextSize } from "../../styles/Size";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const Select = ({ label, className, children, ...props }: SelectProps) => {
  return (
    <div className={className}>
      {label && <Label text={label} />}
      <select
        className={clsx(
          BorderColor.primary,
          BackgroundColor.light,
          RoundedSize.lg,
          TextSize.lg,
          "p-2 w-full h-12"
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
