// frontend/src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // 1. Logic to resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // 2. Logic to parse variables and create handles
  useEffect(() => {
    // Regex to find things like {{ variableName }}
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(regex)].map(match => match[1]);
    
    // Create unique handles for variables
    const uniqueVars = [...new Set(matches)];
    
    const dynamicHandles = uniqueVars.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: varName,
      style: { top: `${(index + 1) * 20 + 30}px` } // Simple manual spacing or let ReactFlow handle it
    }));

    // Add the default output handle
    dynamicHandles.push({ type: 'source', position: Position.Right, id: 'output' });

    setHandles(dynamicHandles);
  }, [currText]);

  const handleChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode id={id} data={data} label="Text" handles={handles}>
      <label>Text:</label>
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleChange}
        style={{ 
          width: '100%', 
          minHeight: '40px', 
          overflow: 'hidden',
          resize: 'none' 
        }}
      />
    </BaseNode>
  );
};