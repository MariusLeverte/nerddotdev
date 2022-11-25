import Editor from "@monaco-editor/react";
// import Editor from "react-simple-code-editor";
// import { highlight, languages } from "prismjs/components/prism-core";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { defaultEditorValue } from "../constants";
import clsx from "clsx";
import { Input, Select } from "ui";

interface Props {
  code: string;
}

const CodeView = ({ code }: Props) => {
  return (
    <div className="border-2 border-slate-800 rounded-lg bg-stone-900 shadow-lg flex-1 flex flex-col">
      <Editor
        defaultValue={code}
        options={{ readOnly: true, codeLens: false }}
      />
    </div>
  );
};

export default CodeView;
