import { Link } from "@mantine/tiptap";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import styles from "./RichText.module.css";

// => Tiptap packages
import StarterKit from "@tiptap/starter-kit";

import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor } from "@tiptap/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { UuidV4 } from "..";
import { useRichTextDisclosureStore } from "./Modal";

interface RichTextProps {
  id: UuidV4;
  text: Content;
}

const RichText = ({ id, text }: RichTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: text,
  }) as Editor;

  const store = useRichTextDisclosureStore();

  return (
    <>
      <motion.div
        ref={containerRef}
        className={styles.rich_text_container}
        onTap={() => {
          store.open(id, text);
        }}
      >
        <EditorContent editor={editor} />
      </motion.div>
    </>
  );
};

export { RichText };
export type { RichTextProps };
