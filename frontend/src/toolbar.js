import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "16px 20px",
        background: "rgba(255, 255, 255, 0.02)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="database" label="Database" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="note" label="Note" />
      </div>
    </div>
  );
};
