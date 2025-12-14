import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";
import { RefreshCw, Filter, Database, Globe, StickyNote } from "lucide-react";

// 1. Transform Node
export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Transform"
    icon={RefreshCw}
    handles={[
      { type: "target", position: Position.Left, id: "in" },
      { type: "source", position: Position.Right, id: "out" },
    ]}
  >
    <span>Convert format</span>
  </BaseNode>
);

// 2. Filter Node
export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Filter"
    icon={Filter}
    handles={[
      { type: "target", position: Position.Left, id: "in" },
      { type: "source", position: Position.Right, id: "pass" },
      { type: "source", position: Position.Bottom, id: "fail" },
    ]}
  >
    <label>Condition:</label>
    <input type="text" placeholder="contains..." />
  </BaseNode>
);

// 3. Database Node
export const DatabaseNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Database"
    icon={Database}
    handles={[{ type: "target", position: Position.Left, id: "query" }]}
  >
    <p>PostgreSQL</p>
  </BaseNode>
);

// 4. API Node
export const APINode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="API Call"
    icon={Globe}
    handles={[
      { type: "target", position: Position.Left, id: "trigger" },
      { type: "source", position: Position.Right, id: "response" },
    ]}
  >
    <input type="text" placeholder="https://api..." />
  </BaseNode>
);

// 5. Note Node 
export const NoteNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Note"
    icon={StickyNote}
    handles={[{ type: "target", position: Position.Left, id: "note-target" }]}
  >
    <textarea placeholder="Add comments here..." />
  </BaseNode>
);
