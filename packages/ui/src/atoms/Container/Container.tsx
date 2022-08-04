import { ElementType, ReactNode } from "react";
import clsx, { ClassValue } from "clsx";
import { NormalSizes } from "../../types/sizes";
import { MaxWidth } from "../../styles/Size";

export interface ContainerProps {
  as?: ElementType;
  padding?: boolean;
  width?: NormalSizes;
  className?: ClassValue;
  children?: ReactNode | undefined;
}

const Container = ({
  as = "div",
  padding = true,
  width = "lg",
  className,
  children,
}: ContainerProps) => {
  const Component: ElementType = as;

  return (
    <Component
      className={clsx(
        MaxWidth[width],
        "w-full mx-auto",
        { "px-4": padding },
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
