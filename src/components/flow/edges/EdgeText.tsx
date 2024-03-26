import type { EdgeTextProps, Rect } from "@xyflow/react";
import cc from "classcat";
import { memo, useCallback, useState } from "react";

function EdgeTextComponent({
  x,
  y,
  label,
  labelStyle = {},
  labelShowBg = true,
  labelBgStyle = {},
  labelBgPadding = [2, 4],
  labelBgBorderRadius = 2,
  children,
  className,
  ...rest
}: EdgeTextProps) {
  const [edgeTextBbox, setEdgeTextBbox] = useState<Rect>({
    x: 1,
    y: 0,
    width: 0,
    height: 0,
  });
  const edgeTextClasses = cc(["xy-flow__edge-textwrapper", className]);

  const onEdgeTextRefChange = useCallback((edgeRef: SVGTextElement) => {
    if (edgeRef === null) return;

    const textBbox = edgeRef.getBBox();

    setEdgeTextBbox({
      x: textBbox.x,
      y: textBbox.y,
      width: textBbox.width,
      height: textBbox.height,
    });
  }, []);

  if (typeof label === "undefined" || !label) {
    return null;
  }

  return (
    <g
      transform={`translate(${x - edgeTextBbox.width / 2} ${
        y - edgeTextBbox.height / 2
      })`}
      className={edgeTextClasses}
      visibility={edgeTextBbox.width ? "visible" : "hidden"}
      {...rest}
    >
      {labelShowBg && (
        <rect
          width={edgeTextBbox.width + 2 * labelBgPadding[0]}
          x={-labelBgPadding[0]}
          y={-labelBgPadding[1]}
          height={edgeTextBbox.height + 2 * labelBgPadding[1]}
          className="xy-flow__edge-textbg"
          style={labelBgStyle}
          rx={labelBgBorderRadius}
          ry={labelBgBorderRadius}
        />
      )}
      <text
        className="xy-flow__edge-text"
        y={edgeTextBbox.height / 2}
        dy="0.3em"
        ref={onEdgeTextRefChange}
        style={labelStyle}
      >
        {label}
      </text>
      {children}
    </g>
  );
}

EdgeTextComponent.displayName = "EdgeText";

export const EdgeText = memo(EdgeTextComponent);