import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlowProvider,
} from 'reactflow';
import { nanoid } from 'nanoid';

import CustomNode from './components/nodes/CustomNode';
import Header from './components/layout/Header';
import EmptyState from './components/layout/EmptyState';
import SidePanel from './components/panels/SidePanel';
import ExportModal from './components/modals/ExportModal';
import { useTreeLayout } from './hooks/useTreeLayout';
import { createEdgeStyle } from './utils/layoutUtils';

import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};

const LoanTreeVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showExport, setShowExport] = useState(false);

  useTreeLayout(nodes, edges, setNodes, setEdges);

  const onNodeClick = useCallback((nodeId) => {
    setSelectedNode(prev => {
      return { id: nodeId };
    });
  }, []);

  useEffect(() => {
    if (selectedNode && selectedNode.id && !selectedNode.data && nodes.length > 0) {
      const actualNode = nodes.find(n => n.id === selectedNode.id);
      if (actualNode) {
        setSelectedNode(actualNode);
      } else {
        console.log('Could not find node with ID:', selectedNode.id);
      }
    }
  }, [nodes, selectedNode]);

  const addRootNode = useCallback((type) => {
    const id = nanoid(8);
    const newNode = {
      id,
      type: 'custom',
      position: { x: 0, y: 0 },
      data: {
        type,
        label: id,
        onNodeClick: (nodeId) => {
          onNodeClick(nodeId);
        },
        parentId: null,
      },
    };
    setNodes(prev => [...prev, newNode]);
  }, [onNodeClick, setNodes]);

  const addChildNode = useCallback((parentId, type) => {
    const id = nanoid(8);
    const newNode = {
      id,
      type: 'custom',
      position: { x: 0, y: 0 },
      data: {
        type,
        label: id,
        onNodeClick: (nodeId) => {
          onNodeClick(nodeId);
        },
        parentId,
      },
    };

    const newEdge = {
      id: `${parentId}-${id}`,
      source: parentId,
      target: id,
      type: 'smoothstep',
      style: createEdgeStyle(),
    };

    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, newEdge]);
  }, [onNodeClick, setNodes, setEdges]);

  const deleteNode = useCallback((nodeId) => {
    const getDescendants = (id) => {
      const children = nodes.filter(node => node.data.parentId === id);
      let descendants = [...children];
      children.forEach(child => {
        descendants = [...descendants, ...getDescendants(child.id)];
      });
      return descendants;
    };

    const descendants = getDescendants(nodeId);
    const allNodesToDelete = [nodeId, ...descendants.map(n => n.id)];

    setNodes(prev => prev.filter(node => !allNodesToDelete.includes(node.id)));
    setEdges(prev => prev.filter(edge => 
      !allNodesToDelete.includes(edge.source) && !allNodesToDelete.includes(edge.target)
    ));
    setSelectedNode(null);
  }, [nodes, setNodes, setEdges]);

  const exportTree = useCallback(() => {
    const treeStructure = {
      metadata: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        exportedAt: new Date().toISOString(),
      },
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.data.type,
        parentId: node.data.parentId,
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })),
    };
    
    const blob = new Blob([JSON.stringify(treeStructure, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-tree-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        nodes={nodes}
        onAddRootNode={addRootNode}
        onExport={exportTree}
        onToggleExport={() => setShowExport(!showExport)}
      />

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-left"
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          selectNodesOnDrag={false}
        >
          <Background color="#f3f4f6" />
          <Controls className="bg-white shadow-lg border border-gray-200" />
        </ReactFlow>

        {nodes.length === 0 && <EmptyState onAddRootNode={addRootNode} />}

        {showExport && (
          <ExportModal
            nodes={nodes}
            edges={edges}
            onClose={() => setShowExport(false)}
          />
        )}

        <SidePanel
          selectedNode={selectedNode}
          nodes={nodes}
          onAddChild={addChildNode}
          onDeleteNode={deleteNode}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ReactFlowProvider>
      <LoanTreeVisualizer />
    </ReactFlowProvider>
  );
};

export default App;