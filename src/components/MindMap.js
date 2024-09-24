import React, { useEffect, useState } from 'react';
import jsMind from 'jsmind';
import 'jsmind/style/jsmind.css'; // Import jsMind CSS

const MindMap = ({ inputText }) => {
  const [mindMapData, setMindMapData] = useState(null);

  // Function to parse the Cohere-generated text into mind map data format
  const parseTextToMindMap = (text) => {
    const lines = text.trim().split('\n');
    const root = {
      id: 'root',
      isroot: true,
      topic: 'Learning Path',
      children: [],
    };

    let currentParent = root;

    lines.forEach((line, i) => {
      line = line.trim();

      // Identify steps as main topics (e.g., Step 1: Front-End Basics)
      if (line.startsWith("Step")) {
        const stepNode = {
          id: `step_${i}`,
          topic: line,
          children: [],
        };
        root.children.push(stepNode);
        currentParent = stepNode; // Set the current step as the parent for subtopics
      }
      // Identify subtopics indented by "-" (e.g., - Learn about HTML)
      else if (line.startsWith("-")) {
        const subtopicNode = {
          id: `subtopic_${i}`,
          topic: line.replace("-", "").trim(), // Clean up the hyphen for display
          children: [],
        };
        currentParent.children.push(subtopicNode); // Add subtopics to the current step
      }
    });

    return root;
  };

  // Update mind map data whenever inputText changes
  useEffect(() => {
    if (inputText) {
      const parsedData = parseTextToMindMap(inputText);
      const mindMapFormat = {
        meta: {
          name: 'Learning Path Mind Map',
          author: 'Cohere AI + jsMind',
          version: '0.2',
        },
        format: 'node_tree',
        data: parsedData,
      };
      setMindMapData(mindMapFormat);
    }
  }, [inputText]);

  // Render the mind map
  useEffect(() => {
    if (mindMapData) {
      const options = {
        container: 'jsmind_container',
        editable: false, // Prevent editing for now
        theme: 'primary', // Choose a theme for styling
      };

      const mind = jsMind.show(options, mindMapData); // Display the mind map

      // Clean up when the component unmounts
      return () => {
        mind.destroy();
      };
    }
  }, [mindMapData]);

  return (
    <div>
      <h1>Mind Map</h1>
      <div
        id="jsmind_container"
        style={{ width: '100vh', height: '500px', border: '1px solid #ccc' }}
      ></div>
    </div>
  );
};

export default MindMap;
