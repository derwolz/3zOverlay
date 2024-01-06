import React, { useCallback, useState, useEffect} from 'react';
import { update } from '../EventUtils/EventUtils';

const Resizable = ({ children, showAnchor=true, startSize, saveCallback }) => {
  const [size, setSize] = useState(startSize);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseMove = useCallback((e) => {

    const newWidth = size.width + e.movementX;
    const newHeight = size.height + e.movementY;
    setSize({ width: newWidth, height: newHeight });
    saveCallback({width:newWidth, height:newHeight});
  }, [isResizing, size]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    update();
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);
  return (
    <div
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
      <div 
        style={{ position: 'absolute', bottom: -4, right: 0, cursor:'crosshair', display:showAnchor?'block':'none' }} 
        onMouseDown={handleMouseDown} 
      >
<svg width="30" height="30" viewBox="0 0 20 20">
<path d="M34 0 L0 34" stroke="#bbb" strokeWidth="10"/>



  
</svg>

      </div>
    </div>
  );
};

export default Resizable;