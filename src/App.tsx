import "./App.css";
import { FlowWrapper } from "./components/flow/Flow";
import { edges, nodes } from './initialElements';
function App() {
  return (
    <FlowWrapper id="flow-1" nodes={nodes} edges={edges} />
  );
}

export default App;
