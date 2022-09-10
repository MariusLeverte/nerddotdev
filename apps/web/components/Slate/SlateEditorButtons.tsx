import clsx from "clsx";
import { ReactChild } from "react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import { Icon, IconTypes } from "./SlateEditorIcon";
import { ElementType, MarkType } from "./SlateEditorSerializer";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

const Button = ({
  isActive,
  onPress,
  children,
}: {
  isActive: boolean;
  onPress?: () => void;
  children: ReactChild;
}) => (
  <button
    className={clsx("text-slate-500 flex items-center", {
      "text-red-900": isActive,
    })}
    onClick={(e) => {
      e.preventDefault();
      if (onPress) {
        onPress();
      }
    }}
  >
    {children}
  </button>
);

interface TypeButtonProps {
  format: MarkType | ElementType;
  icon: IconTypes;
}

const BlockButton = ({ format, icon }: TypeButtonProps) => {
  const editor = useSlate();
  const isButtonActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );

  return (
    <Button
      isActive={isButtonActive}
      onPress={() => {
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

const MarkButton = ({ format, icon }: TypeButtonProps) => {
  const editor = useSlate();
  const isButtonActive = isMarkActive(editor, format);

  return (
    <Button
      isActive={isButtonActive}
      onPress={() => {
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

export { BlockButton, MarkButton, toggleMark };
