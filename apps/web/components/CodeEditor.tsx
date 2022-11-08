import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { defaultEditorValue } from "../constants";
import clsx from "clsx";

interface Props {
  onSubmit?: (value: string) => void;
  loading?: boolean;
}

const CodeEditor = ({ onSubmit, loading }: Props) => {
  const router = useRouter();
  const [code, setCode] = useState(defaultEditorValue);

  return (
    <div className="border-2 border-slate-800 rounded-lg bg-stone-900 shadow-lg flex-1 flex flex-col">
      <div className="flex p-4 space-x-2 justify-between items-center">
        <button
          className="w-4 h-4 bg-red-400 rounded-full"
          type="button"
          aria-label="Back"
          onClick={() => router.push("/dashboard")}
        />
        {onSubmit && (
          <button
            className={clsx(
              "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold px-4 py-2 rounded-md",
              { "opacity-25": loading }
            )}
            onClick={() => onSubmit(code)}
            disabled={loading}
          >
            Submit
          </button>
        )}
      </div>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={16}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
        className="bg-white !overflow-scroll flex-1"
        autoFocus
      />
    </div>
  );
};

export default CodeEditor;
