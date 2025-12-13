import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  
  // Refs for the actual input and the hidden measurement element
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  // 1. Logic to resize both Width and Height
  useEffect(() => {
    if (textareaRef.current && measureRef.current) {
      // a. Reset dimensions momentarily to get accurate scrollHeight later
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.width = 'auto';

      // b. Calculate new width based on the hidden div
      // We start with a min-width of 200px and cap it at 600px
      const contentWidth = measureRef.current.offsetWidth + 20; // +20 for padding/borders
      const newWidth = Math.max(200, Math.min(contentWidth, 600));
      
      textareaRef.current.style.width = `${newWidth}px`;

      // c. Calculate new height (now that width is set, text might wrap)
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // 2. Logic to parse variables (same as before)
  useEffect(() => {
    const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(variableRegex)].map(match => match[1]);
    const uniqueVars = [...new Set(matches)];
    
    const newHandles = uniqueVars.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: varName,
      style: { top: `${(index + 1) * 20 + 30}px` }
    }));

    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });
    setHandles(newHandles);
  }, [currText]);

  return (
    <BaseNode id={id} data={data} label="Text" handles={handles}>
      {/* 
        Hidden Div for measuring text width. 
        MUST match the textarea font/padding styles exactly.
      */}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 0,
          whiteSpace: 'pre', // Force text to stay on one line for width measurement
          font: '12px "Inter", sans-serif',
          padding: '6px',
          border: '1px solid',
        }}
      >
        {currText}
      </div>

      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        style={{
          overflow: 'hidden',
          resize: 'none',
          boxSizing: 'border-box',
          font: '12px "Inter", sans-serif', // Ensure font matches measureRef
          padding: '6px',
          minWidth: '200px'
        }}
      />
    </BaseNode>
  );
};