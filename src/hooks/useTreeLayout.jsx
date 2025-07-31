import { useEffect } from 'react';
import { getLayoutedElements } from '../utils/layoutUtils';

export const useTreeLayout = (nodes, edges, setNodes, setEdges) => {
  useEffect(() => {
    if (nodes.length > 0) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
      
      setNodes(prevNodes => {
        const updatedNodes = layoutedNodes.map(layoutedNode => {
          const existingNode = prevNodes.find(n => n.id === layoutedNode.id);
          return existingNode ? {
            ...existingNode,
            position: layoutedNode.position,
            targetPosition: layoutedNode.targetPosition,
            sourcePosition: layoutedNode.sourcePosition
          } : layoutedNode;
        });
        return updatedNodes;
      });
      
      if (layoutedEdges.length !== edges.length) {
        setEdges(layoutedEdges);
      }
    }
  }, [nodes.length, edges.length]);
};