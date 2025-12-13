// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, label, children, handles = [], style = {} }) => {
  return (
    <div className="custom-node" style={{ ...style }}>
      <div className="node-header">
        <span>{label}</span>
      </div>
      <div className="node-content">
        {children}
      </div>

      {/* Render Handles Dynamically */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style || {}}
          className="custom-handle"
        />
      ))}
    </div>
  );
};