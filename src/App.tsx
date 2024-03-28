import { ReactFlowProvider } from '@xyflow/react';
import "./App.css";
import { Flow } from "./components/flow/Flow";
import { RichTextModal } from "./components/rich-text/Modal";
import { MainLayout } from "./layouts/MainLayout";

import { edges, nodes } from '@/assets/blocks/flow-1.json';
import { Sidebar } from './components/sidebar/Sidebar';




function App() {
  // const Blocks = useMemo(() => blocks.map(render), [render, blocks]);
  return (
    <ReactFlowProvider>
      <MainLayout
        headerNode={<></>}
        mainOverlay={<></>}
        sidebarNode={<Sidebar />}
        footerNode={<></>}
        mainNodes={<Flow nodes={nodes} edges={edges} id={'a070efaa-bdb0-4efd-90ca-d2bb3ac88963'} />}
      />
      <RichTextModal />
    </ReactFlowProvider>
  );
}

export default App;
