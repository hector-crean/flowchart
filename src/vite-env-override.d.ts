import { Renderable } from "./components";
declare module '*.blocks.json' {
    const blocks: Array<Renderable>;

    export default blocks
}

