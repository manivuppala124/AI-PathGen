import React, { useEffect, useRef } from 'react';
import jsMind from 'jsmind'; // Make sure this import is correct

const MindMap = ({ mindMapData }) => {
  const mindMapRef = useRef(null);
  const mind = useRef(null); // Use ref to hold the instance

  useEffect(() => {
    if (mindMapRef.current) {
      // Initialize the mind map
      const options = {
        container: mindMapRef.current,
        editable: true,
        theme: 'default',
      };

      // Create a new instance of jsMind
      mind.current = new jsMind(options);
      mind.current.show(mindMapData); // Pass the mind map data

      // Cleanup function to destroy the mind instance
      return () => {
        if (mind.current) {
          mind.current.destroy(); // Correctly call the destroy method
        }
      };
    }
  }, [mindMapData]);

  return <div ref={mindMapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MindMap;
