// frontend/src/nodes/demoNodes.js (Create this file or add to separate files)
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

// 1. Transform Node
export const TransformNode = ({ id, data }) => (
  <BaseNode 
    id={id} label="Transform" 
    handles={[
      { type: 'target', position: Position.Left, id: 'in' },
      { type: 'source', position: Position.Right, id: 'out' }
    ]}
  >
    <span>Convert format</span>
  </BaseNode>
);

// 2. Filter Node
export const FilterNode = ({ id, data }) => (
  <BaseNode 
    id={id} label="Filter" 
    handles={[
      { type: 'target', position: Position.Left, id: 'in' },
      { type: 'source', position: Position.Right, id: 'pass' },
      { type: 'source', position: Position.Bottom, id: 'fail' }
    ]}
  >
    <label>Condition:</label>
    <input type="text" placeholder="contains..." />
  </BaseNode>
);

// 3. Database Node
export const DatabaseNode = ({ id, data }) => (
  <BaseNode 
    id={id} label="Database" 
    handles={[{ type: 'target', position: Position.Left, id: 'query' }]}
  >
    <p>PostgreSQL</p>
  </BaseNode>
);

// 4. API Node
export const APINode = ({ id, data }) => (
  <BaseNode 
    id={id} label="API Call" 
    handles={[
      { type: 'target', position: Position.Left, id: 'trigger' },
      { type: 'source', position: Position.Right, id: 'response' }
    ]}
  >
    <input type="text" placeholder="https://api..." />
  </BaseNode>
);

// 5. Note Node (No handles)
export const NoteNode = ({ id, data }) => (
  <BaseNode id={id} label="Note" handles={[ { type: 'target', position: Position.Left, id: 'note-target' }]} style={{ background: '#fff3cd', borderColor: '#ffeeba' }}>
    <textarea placeholder="Add comments here..." />
  </BaseNode>
);