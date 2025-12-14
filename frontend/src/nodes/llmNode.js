import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";
import { Brain } from "lucide-react";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: "system",
      style: { top: "40%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: "prompt",
      style: { top: "60%" },
    },
    { type: "source", position: Position.Right, id: "response" },
  ];

  return (
    <BaseNode id={id} data={data} label="LLM" handles={handles} icon={Brain}>
      <div className="field-group">
        <label>Model:</label>
        <select defaultValue="gpt-4">
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="claude">Claude</option>
        </select>
      </div>
      <div className="field-group">
        <label>Temperature:</label>
        <input type="number" min="0" max="2" step="0.1" defaultValue="0.7" />
      </div>
    </BaseNode>
  );
};
