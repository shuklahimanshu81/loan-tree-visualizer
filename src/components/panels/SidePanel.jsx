import React, { useState } from 'react';
import { Plus, Trash2, X, Info } from 'lucide-react';
import { NODE_TYPES } from '../../utils/nodeTypes';

const SidePanel = ({ selectedNode, nodes, onAddChild, onDeleteNode, onClose }) => {
  const [newChildType, setNewChildType] = useState('');


  if (!selectedNode || !selectedNode.data) {
    return null;
  }

  const nodeConfig = NODE_TYPES[selectedNode.data.type];
  const allowedChildren = nodeConfig.allowedChildren;

  const handleAddChild = () => {
    if (newChildType && allowedChildren.includes(newChildType)) {
      onAddChild(selectedNode.id, newChildType);
      setNewChildType('');
    }
  };

  const getDescendantCount = (nodeId) => {
    const getChildren = (id) => {
      return nodes.filter(node => node.data.parentId === id);
    };

    const countDescendants = (id) => {
      const children = getChildren(id);
      let count = children.length;
      children.forEach(child => {
        count += countDescendants(child.id);
      });
      return count;
    };

    return countDescendants(nodeId);
  };

  const getDirectChildren = (nodeId) => {
    return nodes.filter(node => node.data.parentId === nodeId);
  };

  const descendantCount = getDescendantCount(selectedNode.id);
  const directChildren = getDirectChildren(selectedNode.id);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Node Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            {React.createElement(nodeConfig.icon, { 
              size: 28, 
              className: `mr-3 text-${nodeConfig.color.split('-')[1]}-500` 
            })}
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {selectedNode.data.type}
              </h3>
              <p className="text-gray-600 text-sm font-mono">
                ID: {selectedNode.data.label}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <span className="text-gray-500 block mb-1">Direct Children</span>
              <div className="font-semibold text-lg text-gray-800">
                {directChildren.length}
              </div>
            </div>
            <div className="bg-white rounded p-3">
              <span className="text-gray-500 block mb-1">Total Descendants</span>
              <div className="font-semibold text-lg text-gray-800">
                {descendantCount}
              </div>
            </div>
          </div>
        </div>

        {directChildren.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-gray-800">Direct Children</h4>
            <div className="space-y-2">
              {directChildren.map(child => {
                const childConfig = NODE_TYPES[child.data.type];
                const ChildIcon = childConfig.icon;
                return (
                  <div key={child.id} className="flex items-center p-2 bg-gray-50 rounded">
                    <ChildIcon size={16} className="mr-2 text-gray-600" />
                    <span className="text-sm font-medium">{child.data.type}</span>
                    <span className="text-xs text-gray-500 ml-auto font-mono">
                      {child.data.label.slice(0, 8)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {allowedChildren.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-800">Add Child Node</h3>
            <div className="space-y-3">
              <select
                value={newChildType}
                onChange={(e) => setNewChildType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select node type...</option>
                {allowedChildren.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                onClick={handleAddChild}
                disabled={!newChildType}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors font-medium"
              >
                <Plus size={18} className="mr-2" />
                Add {newChildType || 'Child'}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <button
            onClick={() => onDeleteNode(selectedNode.id)}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 flex items-center justify-center transition-colors font-medium"
          >
            <Trash2 size={18} className="mr-2" />
            Delete Node {descendantCount > 0 && `(& ${descendantCount} children)`}
          </button>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Info size={16} className="mr-2 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Node Rules</h4>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Can add: {allowedChildren.length > 0 ? allowedChildren.join(', ') : 'No children allowed'}</li>
            <li>• Can be root: {nodeConfig.canBeRoot ? 'Yes' : 'No'}</li>
            <li>• Description: {nodeConfig.description}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;