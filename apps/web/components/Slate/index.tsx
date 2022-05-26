import React, { useCallback, useMemo } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

import { Container } from "@nextui-org/react";
import styles from "./Editor.module.css";
import { BlockButton, MarkButton } from "./SlateEditorButtons";
import { Element, Mark } from "./SlateEditorSerializer";
import { toPortableText } from "./utils";

interface SlateEditorProps {
  initialValue: Descendant[];
  onChange: (value: any[]) => void;
}

const SlateEditor = ({ initialValue, onChange }: SlateEditorProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Mark {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Container
      fluid
      css={{
        backgroundColor: "$accents0",
        borderRadius: "$sm",
      }}
    >
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => onChange(toPortableText(value))}
      >
        <div className={styles.toolbar}>
          <BlockButton format="h2" icon="heading" />
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="code" icon="code" />
          <MarkButton format="underline" icon="underline" />
          <BlockButton format="numbered-list" icon="list-ordered" />
          <BlockButton format="bulleted-list" icon="list-unordered" />
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
        />
      </Slate>
    </Container>
  );
};

export default SlateEditor;
