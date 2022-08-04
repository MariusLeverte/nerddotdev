import clsx from "clsx";
import { ReactNode } from "react";
import { SpaceBetweenX, SpaceBetweenY } from "../../styles/Size";
import { Spaces } from "../../types/sizes";

export interface SpaceBetweenProps {
  x?: Spaces;
  y?: Spaces;
  children?: ReactNode | undefined;
}

const SpaceBetween = ({ x, y, children }: SpaceBetweenProps) => (
  <div className={clsx(x && SpaceBetweenX[x], y && SpaceBetweenY[y])}>
    {children}
  </div>
);

export default SpaceBetween;
