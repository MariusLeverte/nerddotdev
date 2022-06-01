import React from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type XSpace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type YSpace = XSpace;

interface SpaceBetweenProps {
  x?: XSpace;
  y?: YSpace;
}

const SpaceBetween: React.FC<SpaceBetweenProps> = ({ x, y, children }) => (
  <div
    className={clsx({
      [styles[`x-${x}`]]: x,
      [styles[`y-${y}`]]: y,
    })}
  >
    {children}
  </div>
);

export default SpaceBetween;
