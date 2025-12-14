import {
  ArrowDownToLine,
  Brain,
  ArrowUpFromLine,
  Type,
  RefreshCw,
  Filter,
  Database,
  Globe,
  StickyNote,
} from "lucide-react";

const iconMap = {
  customInput: ArrowDownToLine,
  llm: Brain,
  customOutput: ArrowUpFromLine,
  text: Type,
  transform: RefreshCw,
  filter: Filter,
  database: Database,
  api: Globe,
  note: StickyNote,
};

export const DraggableNode = ({ type, label }) => {
  const Icon = iconMap[type];

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "90px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        flexDirection: "column",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        gap: "4px",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        e.target.style.borderColor = "rgba(99, 102, 241, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
      draggable
    >
      {Icon && <Icon size={18} color="#ffffff" />}
      <span
        style={{
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
    </div>
  );
};
