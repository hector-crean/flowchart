/*React Component whose props can be serialised / deserialised*/

import { ReactNode } from "react";

import { v4 } from "uuid";
import { Flow, FlowProps } from "./flow/Flow";
import { RichText, RichTextProps } from "./rich-text/RichText";

type UuidV4 = `${string}-${string}-${string}-${string}-${string}`;
type Identifiable = { id: UuidV4 };

type RenderableNodeProps<T, P> = { type: T; props: P };

type FlowNode = RenderableNodeProps<"Flow", FlowProps>;

type RichTextNode = RenderableNodeProps<"RichText", RichTextProps>;

type RenderableNode = FlowNode | RichTextNode;

type Renderable = RenderableNode & Identifiable;

const render = ({ type, props, id }: Renderable): ReactNode => {
  const uuid = v4() as UuidV4;

  switch (type) {
    case "Flow":
      return <Flow {...props} />;
    case "RichText":
      return <RichText {...props} />;
    default:
      return null;
  }
};

export { render };
export type { Identifiable, Renderable, RenderableNodeProps, UuidV4 };

/// utility functions
