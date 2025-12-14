// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { ArrowUpFromLine } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <BaseNode id={id} data={data} label="Output" handles={handles} icon={ArrowUpFromLine}>
      <div className="field-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
        />
      </div>
      <div className="field-group">
        <label>Type:</label>
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
