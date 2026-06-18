"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const fonts = [
  "sans-serif",
  "serif",
  "monospace",
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "tahoma",
  "times-new-roman",
  "trebuchet",
  "verdana",
];

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ, Quill } = await import("react-quill-new");
    const Font = Quill.import("formats/font") as any;
    Font.whitelist = fonts;
    Quill.register(Font, true);
    return RQ;
  },
  {
    ssr: false,
    loading: () => <div className="h-40 w-full animate-pulse bg-slate-100 rounded-xl" />,
  }
);

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
        [{ font: fonts }],
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

        /* Custom Quill Fonts */
        .ql-font-arial { font-family: "Arial", sans-serif !important; }
        .ql-font-comic-sans { font-family: "Comic Sans MS", cursive, sans-serif !important; }
        .ql-font-courier-new { font-family: "Courier New", Courier, monospace !important; }
        .ql-font-georgia { font-family: "Georgia", serif !important; }
        .ql-font-helvetica { font-family: "Helvetica", sans-serif !important; }
        .ql-font-lucida { font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif !important; }
        .ql-font-tahoma { font-family: "Tahoma", Geneva, sans-serif !important; }
        .ql-font-times-new-roman { font-family: "Times New Roman", Times, serif !important; }
        .ql-font-trebuchet { font-family: "Trebuchet MS", Helvetica, sans-serif !important; }
        .ql-font-verdana { font-family: "Verdana", Geneva, sans-serif !important; }

        /* Custom Quill Font Dropdown Labels */
        .ql-picker.ql-font .ql-picker-label[data-value="arial"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="arial"]::before { content: "Arial"; font-family: "Arial", sans-serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="comic-sans"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="comic-sans"]::before { content: "Comic Sans"; font-family: "Comic Sans MS", cursive, sans-serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="courier-new"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="courier-new"]::before { content: "Courier New"; font-family: "Courier New", Courier, monospace; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="georgia"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="georgia"]::before { content: "Georgia"; font-family: "Georgia", serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="helvetica"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="helvetica"]::before { content: "Helvetica"; font-family: "Helvetica", sans-serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="lucida"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="lucida"]::before { content: "Lucida"; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="tahoma"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="tahoma"]::before { content: "Tahoma"; font-family: "Tahoma", Geneva, sans-serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="times-new-roman"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="times-new-roman"]::before { content: "Times New Roman"; font-family: "Times New Roman", Times, serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="trebuchet"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="trebuchet"]::before { content: "Trebuchet"; font-family: "Trebuchet MS", Helvetica, sans-serif; }
        
        .ql-picker.ql-font .ql-picker-label[data-value="verdana"]::before,
        .ql-picker.ql-font .ql-picker-item[data-value="verdana"]::before { content: "Verdana"; font-family: "Verdana", Geneva, sans-serif; }

        /* Make font dropdown scrollable */
        .ql-snow .ql-picker.ql-font .ql-picker-options {
          max-height: 250px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
