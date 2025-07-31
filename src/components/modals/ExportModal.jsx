import React from 'react';
import { X, Copy, Download } from 'lucide-react';

const ExportModal = ({ nodes, edges, onClose }) => {
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
      position: node.position,
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  };

  const jsonString = JSON.stringify(treeStructure, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-tree-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Tree Structure Export
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              JSON representation of your loan tree hierarchy
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Nodes: {nodes.length}</span>
              <span>Edges: {edges.length}</span>
              <span>Size: {(jsonString.length / 1024).toFixed(1)} KB</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 flex items-center text-sm transition-colors"
              >
                <Copy size={16} className="mr-2" />
                Copy
              </button>
              <button
                onClick={downloadJson}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 flex items-center text-sm transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download
              </button>
            </div>
          </div>

          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border">
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;