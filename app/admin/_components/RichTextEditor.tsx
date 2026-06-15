"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <div className="h-40 w-full animate-pulse bg-slate-100 rounded-xl" /> });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="bg-white dark:bg-slate-900 quill-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="dark:text-white"
      />
      <style jsx global>{`
        .quill-container .ql-editor {
          min-height: 250px;
          font-family: inherit;
          font-size: 1rem;
        }
        .quill-container .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: #e2e8f0;
          background-color: #f8fafc;
        }
        .quill-container .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #e2e8f0;
        }
        .dark .quill-container .ql-toolbar {
          border-color: #1e293b;
          background-color: #0f172a;
        }
        .dark .quill-container .ql-container {
          border-color: #1e293b;
        }
        .dark .quill-container .ql-stroke {
          stroke: #cbd5e1;
        }
        .dark .quill-container .ql-fill {
          fill: #cbd5e1;
        }
        .dark .quill-container .ql-picker-label {
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
