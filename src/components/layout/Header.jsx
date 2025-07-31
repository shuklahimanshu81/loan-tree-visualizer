import React from 'react';
import { Download, FileText, TreePine } from 'lucide-react';
import { NODE_TYPES, getRootNodeTypes } from '../../utils/nodeTypes';

const Header = ({ nodes, onAddRootNode, onExport, onToggleExport }) => {
  const rootNodeTypes = getRootNodeTypes();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TreePine className="mr-3 text-green-600" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Loan Management Tree
            </h1>
            <p className="text-gray-600 text-sm">
              Visualize hierarchical loan relationships
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {nodes.length === 0 ? (
            <div className="flex space-x-2">
              {rootNodeTypes.map(type => {
                const config = NODE_TYPES[type];
                const Icon = config.icon;
                return (
                  <button
                    key={type}
                    onClick={() => onAddRootNode(type)}
                    className={`${config.color} ${config.textColor} px-4 py-2 rounded-lg hover:opacity-90 flex items-center transition-opacity font-medium`}
                  >
                    <Icon size={18} className="mr-2" />
                    Add {type}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500 mr-2">
                {nodes.length} node{nodes.length !== 1 ? 's' : ''}
              </div>
              <button
                onClick={onToggleExport}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center transition-colors"
              >
                <FileText size={18} className="mr-2" />
                View JSON
              </button>
              <button
                onClick={onExport}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center transition-colors"
              >
                <Download size={18} className="mr-2" />
                Export
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;