import { blocks } from "@/assets/blocks/flow.blocks.json";
import { useMemo } from "react";
import "./App.css";
import { render } from "./components";
import { RichTextModal } from "./components/rich-text/Modal";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  const Blocks = useMemo(() => blocks.map(render), [render, blocks]);
  return (
    <>
      <MainLayout
        headerNode={<></>}
        mainOverlay={<></>}
        sidebarNode={<></>}
        footerNode={<></>}
        mainNodes={<>{Blocks}</>}
      />
      <RichTextModal />
    </>
  );
}

export default App;
