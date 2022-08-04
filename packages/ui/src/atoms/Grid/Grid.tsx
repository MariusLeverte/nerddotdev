import clsx, { ClassValue } from "clsx";
import { ReactNode } from "react";
import { ColumnSpan, GridGap } from "../../styles/Size";
import { Spans } from "../../types/sizes";

export interface GridRowProps {
  gap?: 0 | 1 | 2 | 3 | 4;
  children?: ReactNode | undefined;
  className?: ClassValue;
}

export interface GridProps {
  className?: ClassValue;
  children?: ReactNode | undefined;
}

const Grid = ({ children, className }: GridRowProps) => {
  return (
    <div
      className={clsx(
        "grid gap-4 grid-cols-2 md:grid-cols-6 lg:grid-cols-12",
        className
      )}
    >
      {children}
    </div>
  );
};

const Column = ({ className, children }: GridProps) => (
  <div className={clsx(className)}>{children}</div>
);

Grid.Column = Column;

export default Grid;
