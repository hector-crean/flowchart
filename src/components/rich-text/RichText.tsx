import { Link, RichTextEditor } from "@mantine/tiptap";
import { Content, useEditor } from "@tiptap/react";
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
import { useState } from "react";
import { createPortal } from "react-dom";
import { UuidV4 } from "..";

interface RichTextProps {
  id: UuidV4;
  text: Content;
  setContent?: (draft: Content) => void;
}

const RichText = ({ text, setContent }: RichTextProps) => {
  const [draft, setDraft] = useState(text);

  const [editing, setEditing] = useState(false);

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
    content: draft,
    onUpdate: ({ editor }) => {
      setDraft(editor.getJSON());
    },
  }) as Editor;



  const postDraftHandler = (draft: Content) => {
    if (setContent) setContent(draft)
    setEditing(false);

  }

  return (
    <>
      <motion.div
        className={styles.rich_text_container}
        onDoubleClick={() => setEditing(true)}
      >

        <RichTextEditor
          editor={editor}
          classNames={{
            root: styles.root,
            content: styles.content,
            toolbar: styles.toolbar,
            typographyStylesProvider: styles.typographyStylesProvider,
          }}
        >
          <RichTextEditor.Content />
        </RichTextEditor>

      </motion.div>

      {editing && createPortal(
        <>
          <div
            className={styles.modal}
          >
            <RichTextEditor
              editor={editor}
              classNames={{
                root: styles.root,
                content: styles.content,
                toolbar: styles.toolbar,
                typographyStylesProvider: styles.typographyStylesProvider,
              }}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={0}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <button onPointerDown={() => postDraftHandler(draft)}>Publish</button>
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          <div className={styles.background} onPointerDown={() => setEditing(false)} />
        </>
        , document.body
      )}



    </>
  );
};

export { RichText };
export type { RichTextProps };

