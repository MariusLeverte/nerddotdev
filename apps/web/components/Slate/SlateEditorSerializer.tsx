export type ElementType =
  | "block-quote"
  | "h1"
  | "h2"
  | "numbered-list"
  | "bulleted-list";

interface ElementProps {
  attributes: any;
  children: any;
  element: { type: ElementType & "list-item" };
}

export const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: "left" };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "h1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export type MarkType = "bold" | "code" | "italic" | "underline";

interface MarkProps {
  attributes: any;
  children: any;
  leaf: Record<MarkType, boolean>;
}

export const Mark = ({ attributes, children, leaf }: MarkProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
