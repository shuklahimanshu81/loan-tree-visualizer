import React from 'react';
import { NODE_TYPES } from '../../utils/nodeTypes';

const CustomNode = ({ data, id }) => {
  const nodeConfig = NODE_TYPES[data.type];
  const Icon = nodeConfig.icon;

  const handleClick = (e) => {
    e.stopPropagation();
    if (data.onNodeClick) {
      data.onNodeClick(id);
    }
  };

  return (
    <div
      className={`${nodeConfig.color} ${nodeConfig.textColor} rounded-lg shadow-lg min-w-[140px] cursor-pointer hover:shadow-xl transition-all duration-200 border-2 border-white hover:scale-105`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center p-4">
        <Icon size={22} className="mr-3 flex-shrink-0" />
        <div className="text-center">
          <div className="font-semibold text-sm mb-1">{data.type}</div>
          <div className="text-xs opacity-90 font-mono">
            {data.label.slice(0, 8)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;