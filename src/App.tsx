import { blocks } from "@/assets/blocks/flow.blocks.json";
import { render } from "@/components";
import { ReactFlowProvider } from "reactflow";
import "./App.css";

function App() {
  return <ReactFlowProvider> <div>{blocks.map(render)}</div></ReactFlowProvider>;
}

export default App;
