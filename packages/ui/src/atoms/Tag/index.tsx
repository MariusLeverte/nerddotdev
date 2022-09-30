import clsx from "clsx";
import {
  BackgroundColor,
  TextColorOnBackgroundColor,
} from "../../styles/Color";
import { NormalColors } from "../../types/colors";

interface Props {
  text: string;
  color?: NormalColors;
}

const Tag = ({ text, color = "primary" }: Props) => {
  return (
    <span
      className={clsx(
        "p-1 text-xs rounded-md",
        TextColorOnBackgroundColor[color],
        BackgroundColor[color]
      )}
    >
      {text}
    </span>
  );
};

export default Tag;
