import { Link, RichTextEditor } from "@mantine/tiptap";
import { Content, useEditor } from "@tiptap/react";
import styles from "./RichText.module.css";

import { useState } from "react";

// => Tiptap packages
import StarterKit from "@tiptap/starter-kit";

import { useClickOutside } from "@mantine/hooks";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor } from "@tiptap/react";
import { AnimatePresence } from "framer-motion";
import { create } from "zustand";
import { UuidV4 } from "..";

interface DisclosureState {
  id: UuidV4;
  draft: Content;
  isOpen: boolean;
  open: (id: UuidV4, draft: Content) => void;
  setDraft: (draft: Content) => void;
  toggle: () => void;
  close: () => void;
}

export const useRichTextDisclosureStore = create<DisclosureState>((set) => ({
  id: "",
  draft: "",
  isOpen: false,
  setDraft: (draft) => set({ draft }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: (id: UuidV4, draft: Content) => set({ isOpen: true, draft, id }),
  close: () => set({ isOpen: false }),
}));

// => Tiptap packages
const RichTextModal = () => {
  const store = useRichTextDisclosureStore();

  const [editing, setEditing] = useState<boolean>(false);

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

    store.close();
  };

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
    onUpdate: ({ editor }) => {
      store.setDraft(editor.getJSON());
    },
    content: store.draft,
  }) as Editor;

  return (
    <AnimatePresence>
      {store.isOpen && (
        <>
          <div className={styles.dialog}>
            <div className={styles.dialog_inner}>
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
                <button onClick={() => postDraftHandler(store.id, store.draft)}>
                  Publish
                </button>
              </div>
            </div>
          </div>
          <div className={styles.backdrop} onClick={store.close} />
        </>
      )}
    </AnimatePresence>
  );
};

export { RichTextModal };
