import { blocks } from "@/assets/blocks/flow.blocks.json";
import { useMemo } from "react";
import "./App.css";
import { render } from "./components";
import { RichTextModal } from "./components/rich-text/Modal";

function App() {
  const Blocks = useMemo(() => blocks.map(render), [render, blocks]);
  return (
    <>
      {Blocks}
      <RichTextModal />
    </>
  );
}

export default App;
