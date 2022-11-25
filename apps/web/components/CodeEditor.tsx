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
  onSubmit?: (value: string, title: string, language: string) => void;
  loading?: boolean;
}

const CodeEditor = ({ onSubmit, loading }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState("Hello world");
  const [code, setCode] = useState(defaultEditorValue);
  const [language, setLanguage] = useState("javascript");

  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="border-2 border-slate-800 rounded-lg bg-stone-900 shadow-lg flex-1 flex flex-col">
      <div className="flex p-4 space-x-2 justify-between items-center">
        <div className="space-x-2 flex items-center">
          <button
            className="w-4 h-4 bg-red-400 rounded-full"
            type="button"
            aria-label="Back"
            onClick={() => router.push("/dashboard")}
          />
          <select
            value={language}
            onChange={({ target: { value } }) => setLanguage(value)}
            className="bg-stone-900 text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
        </div>
        <Input
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          placeholder="Title"
        />
        {onSubmit && (
          <button
            className={clsx(
              "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold px-4 py-2 rounded-md",
              { "opacity-25": loading }
            )}
            onClick={() => onSubmit(code, title, language)}
            disabled={loading}
          >
            Submit
          </button>
        )}
      </div>
      <Editor
        defaultValue={code}
        defaultLanguage="javascript"
        language={language}
        onChange={(value) => setCode(value as string)}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
