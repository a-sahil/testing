import { useState, useEffect, useRef } from "react";
import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";
import { Type } from "lucide-react";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);

  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && measureRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.width = "auto";

      const contentWidth = measureRef.current.offsetWidth + 20;
      const newWidth = Math.max(200, Math.min(contentWidth, 600));

      textareaRef.current.style.width = `${newWidth}px`;

      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  useEffect(() => {
    const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(variableRegex)].map(
      (match) => match[1]
    );
    const uniqueVars = [...new Set(matches)];

    const newHandles = uniqueVars.map((varName, index) => ({
      type: "target",
      position: Position.Left,
      id: varName,
      style: { top: `${(index + 1) * 20 + 30}px` },
    }));

    newHandles.push({ type: "source", position: Position.Right, id: "output" });
    setHandles(newHandles);
  }, [currText]);

  return (
    <BaseNode id={id} data={data} label="Text" handles={handles} icon={Type}>
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          whiteSpace: "pre",
          font: '12px "Inter", sans-serif',
          padding: "6px",
          border: "1px solid",
        }}
      >
        {currText}
      </div>

      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        style={{
          overflow: "hidden",
          resize: "none",
          boxSizing: "border-box",
          font: '12px "Inter", sans-serif',
          padding: "6px",
          minWidth: "200px",
        }}
      />
    </BaseNode>
  );
};
