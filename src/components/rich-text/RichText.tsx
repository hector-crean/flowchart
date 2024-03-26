import { Link, RichTextEditor } from "@mantine/tiptap";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import styles from "./RichText.module.css";

// => Tiptap packages
import StarterKit from "@tiptap/starter-kit";

import { useClickOutside } from "@mantine/hooks";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor } from "@tiptap/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { UuidV4 } from "..";

interface RichTextProps {
  id: UuidV4;
  text: Content;
}

const RichText = ({ id, text }: RichTextProps) => {
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

  const containerRef = useClickOutside(() => setEditing(false));

  const postDraftHandler = (blockId: UuidV4, draft: Content) => {
    // POST request using fetch inside useEffect React hook

    const payload = {
      uuid: blockId,
      props: {
        text: draft,
      },
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    fetch("http://localhost:1122/editor", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log);

    setEditing(false);
  };

  return (
    <>
      <motion.div
        className={styles.rich_text_container}
        onDoubleClick={() => {
          setEditing(true);
        }}
      >
        {editing ? (
          <div className={styles.dialog_inner} ref={containerRef}>
            <RichTextEditor
              editor={editor}
              classNames={{
                root: styles.root,
                content: styles.content,
                toolbar: styles.toolbar,
                typographyStylesProvider: styles.typographyStylesProvider,
              }}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>

            <div className={styles.publish_container}>
              <button onClick={() => postDraftHandler(id, draft)}>
                Publish
              </button>
            </div>
          </div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </motion.div>
    </>
  );
};

export { RichText };
export type { RichTextProps };
