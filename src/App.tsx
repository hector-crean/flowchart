import { blocks } from "@/assets/blocks/flow.blocks.json";
import { render } from "@/components";
import "./App.css";

function App() {
  return <div>{blocks.map(render)}</div>;
}

export default App;
