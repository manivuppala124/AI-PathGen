import React, { useEffect, useState } from 'react';
import jsMind from 'jsmind';
import 'jsmind/style/jsmind.css'; // Import jsMind CSS

const MindMap = ({ inputText }) => {
  const [mindMapData, setMindMapData] = useState(null);

  useEffect(() => {
    if (inputText) {
      const parsedData = parseTextToMindMap(inputText.trim());
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

  // Function to parse the Cohere-generated text into mind map data format
  const parseTextToMindMap = (text) => {
    const topics = text.split(','); // Adjust this split logic based on your expected input
    const root = {
      id: 'root',
      isroot: true,
      topic: 'Learning Path',
      children: [],
    };

    topics.forEach((topic, i) => {
      const topicNode = {
        id: `topic_${i}`,
        topic: topic.trim(),
        children: [],
      };
      root.children.push(topicNode);
    });

    return root;
  };

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
      <h2>Mind Map</h2>
      <div
        id="jsmind_container"
        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
      ></div>
    </div>
  );
};

export default MindMap;
