import React from 'react';
import { TreePine } from 'lucide-react';
import { NODE_TYPES, getRootNodeTypes } from '../../utils/nodeTypes';

const EmptyState = ({ onAddRootNode }) => {
  const rootNodeTypes = getRootNodeTypes();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <TreePine size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Start Building Your Tree
          </h2>
          <p className="text-gray-500 mb-8">
            Create a hierarchical structure for your loan management system. 
            Begin by adding an Account or Loan node.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {rootNodeTypes.map(type => {
            const config = NODE_TYPES[type];
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => onAddRootNode(type)}
                className={`${config.color} ${config.textColor} px-6 py-3 rounded-lg hover:opacity-90 flex items-center justify-center transition-all transform hover:scale-105 shadow-lg min-w-[140px]`}
              >
                <Icon size={20} className="mr-2" />
                Add {type}
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-xs text-gray-400">
          <p>Click on nodes to manage children • Auto-layout enabled</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;