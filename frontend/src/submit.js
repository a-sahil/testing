import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      alert(
        `Pipeline Analysis:\n` +
          `Number of Nodes: ${data.num_nodes}\n` +
          `Number of Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag}`
      );
    } catch (error) {
      console.error(error);
      alert("Error submitting pipeline. Ensure backend is running.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.02)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          padding: "12px 32px",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "15px",
          letterSpacing: "0.02em",
          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
          transition: "all 0.2s ease",
          minWidth: "120px",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 6px 16px rgba(99, 102, 241, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.4)";
        }}
      >
        Submit
      </button>
    </div>
  );
};
