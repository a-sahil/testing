// frontend/src/submit.js
import { useStore } from './store'; // Assuming you are using the store provided in the repo

export const SubmitButton = () => {
  // Get nodes and edges from the Zustand store
  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges
  }));

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button 
        type="submit" 
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Submit
      </button>
    </div>
  );
};