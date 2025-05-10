"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TiptapProps = {
  val: string;
};
const Tiptap = ({ val }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: val,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
