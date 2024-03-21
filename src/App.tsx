import { blocks } from "@/assets/blocks/flow.blocks.json";
import { render } from "@/components";
import { ReactFlowProvider } from "reactflow";
import "./App.css";

function App() {
  return (
    <ReactFlowProvider>
      <>{blocks.map(render)}</>
    </ReactFlowProvider>
  );
}

export default App;
