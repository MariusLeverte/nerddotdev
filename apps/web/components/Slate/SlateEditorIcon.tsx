import {
  RiBold,
  RiCodeLine,
  RiHeading,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiUnderline,
} from "react-icons/ri";

export type IconTypes =
  | "bold"
  | "italic"
  | "code"
  | "underline"
  | "list-ordered"
  | "list-unordered"
  | "heading";

export const Icon = ({ icon }: { icon: IconTypes }) => {
  switch (icon) {
    case "bold":
      return <RiBold />;
    case "italic":
      return <RiItalic />;
    case "code":
      return <RiCodeLine />;
    case "underline":
      return <RiUnderline />;
    case "list-ordered":
      return <RiListOrdered />;
    case "list-unordered":
      return <RiListUnordered />;
    case "heading":
      return <RiHeading />;
    default:
      break;
  }

  return null;
};
