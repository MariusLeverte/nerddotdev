import clsx from "clsx";
import { TextSize } from "../../styles/Size";

const Label = ({ text }: { text: string }) => {
  return <label className={clsx(TextSize.lg, "ml-2 mb-2 block")}>{text}</label>;
};

export default Label;
