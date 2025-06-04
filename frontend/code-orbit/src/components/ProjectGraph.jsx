import React, { useRef, useEffect, useState } from 'react';
import { useRepository } from '../contexts/RepositoryContext';
import ForceGraph2D from 'react-force-graph-2d';
import { useTheme } from '../contexts/ThemeContext';

const ProjectGraph = () => {
  const { graphData, selectNode, selectedNode } = useRepository();
  const { theme } = useTheme();
  const graphRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    
    // Initial size update
    if (containerRef.current) {
      setTimeout(updateDimensions, 100);
    }
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    if (graphRef.current) {
      // Ensure the graph zooms to fit all nodes
      setTimeout(() => {
        graphRef.current.zoomToFit(400, 40);
      }, 500);
    }
  }, [graphData]);
  
  if (!graphData) return null;
  
  return (
    <div ref={containerRef} className="w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-9rem)]">
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel="label"
        nodeColor={node => node.id === selectedNode?.id ? '#f59e0b' : node.color}
        nodeRelSize={6}
        linkColor={() => theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
        linkWidth={1.5}
        backgroundColor={theme === 'dark' ? '#1f2937' : '#f9fafb'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const isSelected = selectedNode?.id === node.id;
          
          // Node circle
          ctx.beginPath();
          ctx.fillStyle = isSelected ? '#f59e0b' : node.color;
          ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI, false);
          ctx.fill();
          
          if (isSelected) {
            // Highlight outline for selected node
            ctx.beginPath();
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2 / globalScale;
            ctx.arc(node.x, node.y, node.size + 2 / globalScale, 0, 2 * Math.PI, false);
            ctx.stroke();
          }
          
          // Text background for better readability
          const bckgDimensions = [textWidth + 8, fontSize + 4].map(n => n / globalScale);
          ctx.fillStyle = theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(249, 250, 251, 0.8)';
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2, 
            node.y + node.size + 2, 
            bckgDimensions[0], 
            bckgDimensions[1]
          );
          
          // Text label
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = theme === 'dark' ? '#f9fafb' : '#1f2937';
          ctx.fillText(label, node.x, node.y + node.size + 2 + bckgDimensions[1] / 2);
        }}
        onNodeClick={node => selectNode(node)}
        cooldownTicks={100}
        cooldownTime={2000}
      />
    </div>
  );
};

export default ProjectGraph;