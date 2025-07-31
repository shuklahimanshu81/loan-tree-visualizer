# Loan Management Tree Visualizer

A React-based hierarchical tree visualizer for loan management systems with interactive node management and auto-layout capabilities.

## 🚀 Live Demo

- **GitHub Repository**: [Add your GitHub repo URL here]
- **Deployed Link**: [Add your deployment URL here]

## 📋 Features

- **Hierarchical Node Management**: Create and manage Account, Loan, and Collateral relationships
- **Interactive Side Panel**: Click nodes to view details and manage children
- **Manual Layout**: Nodes are positioned in a clear hierarchical structure
- **JSON Export**: Export tree structure with metadata
- **Real-time Updates**: Interface updates immediately when nodes are added/removed
- **Responsive Design**: Works across different screen sizes
- **Debug Panel**: Real-time visibility into nodes and edges count

## 🏗️ Data Model

### Tree Structure Shape

```json
{
  "metadata": {
    "totalNodes": 5,
    "totalEdges": 4,
    "exportedAt": "2025-01-31T10:30:00.000Z"
  },
  "nodes": [
    {
      "id": "abc12345",
      "type": "Account",
      "parentId": null
    },
    {
      "id": "def67890",
      "type": "Loan",
      "parentId": "abc12345"
    }
  ],
  "edges": [
    {
      "id": "edge-12345",
      "source": "abc12345",
      "target": "def67890"
    }
  ]
}
```

### Node Types Definition

| Node Type | Description | Allowed Children | Can Be Root | Color | Icon |
|-----------|-------------|------------------|-------------|-------|------|
| **Account** | Customer account container | Loan, Collateral | ✅ Yes | Blue | Building |
| **Loan** | Loan issued to account | Collateral | ✅ Yes | Green | Credit Card |
| **Collateral** | Asset pledged against loan | None | ❌ No | Purple | Shield |

### Business Rules

- **Root Nodes**: Only Account and Loan can be root nodes (first level)
- **Account Children**: Can have Loan and Collateral children
- **Loan Children**: Can only have Collateral children
- **Collateral**: Cannot have any children (leaf nodes)
- **Cascade Deletion**: Deleting a node removes all its descendants

## 🎨 Node Rendering

Each node type is rendered as a custom React component with:

- **Unique Visual Identity**: Color-coded background with corresponding icons
- **Interactive Elements**: Hover effects and click handlers for side panel
- **Type Information**: Node type prominently displayed
- **ID Display**: Shortened unique identifier (first 8 characters)
- **Consistent Styling**: Rounded corners, shadows, and smooth transitions

### Node Components Structure

```
CustomNode.jsx
├── Visual Container (colored background)
├── Icon (Lucide React icons)
├── Type Label (Account/Loan/Collateral)
└── ID Display (shortened nanoid)
```

## 🎯 UX Design Decisions

### Side Panel Layout
- **Fixed Right Position**: Consistent location for node management
- **Node Details Section**: Shows type, ID, and hierarchy statistics
- **Children Management**: Lists direct children with their types
- **Add Child Interface**: Dropdown selection with validation
- **Action Buttons**: Clear delete functionality with cascade warning
- **Information Panel**: Shows node rules and relationship constraints

### Add/Delete Flow
1. **Adding Root Nodes**: 
   - Header buttons available when tree is empty
   - Only Account and Loan can be added as root nodes
   - Positioned automatically in the viewport

2. **Adding Child Nodes**:
   - Click any node to open side panel
   - Select valid child type from dropdown
   - New nodes positioned below parent with horizontal spacing
   - Relationships validated according to business rules

3. **Deleting Nodes**:
   - Cascade deletion removes all descendants
   - Warning shows number of children that will be deleted
   - Immediate action with visual feedback

### Layout Management
- **Manual Positioning**: Predictable node placement for clarity
- **Hierarchical Structure**: Parent-child relationships clearly visible
- **Horizontal Spacing**: Multiple children spread horizontally
- **Vertical Levels**: Each generation positioned at increasing Y coordinates

## 🛠️ Technology Stack

- **React 18**: Component-based UI framework
- **React Flow**: Flow diagram library with custom nodes
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Modern icon library for node type indicators
- **Nanoid**: Unique ID generation for nodes
- **Vite**: Fast build tool and development server

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Local Development

```bash
# Clone the repository
git clone [your-repo-url]
cd loan-tree-visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
loan-tree-visualizer/
├── public/
├── src/
│   ├── components/
│   │   ├── nodes/
│   │   │   └── CustomNode.jsx
│   │   ├── panels/
│   │   │   └── SidePanel.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── EmptyState.jsx
│   │   └── modals/
│   │       └── ExportModal.jsx
│   ├── utils/
│   │   ├── nodeTypes.js
│   │   └── layoutUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔧 Configuration

### Customizing Node Types

Edit `src/utils/nodeTypes.js` to modify:
- Node colors and icons
- Parent-child relationship rules
- Root node permissions
- Node descriptions

```javascript
export const NODE_TYPES = {
  Account: {
    color: 'bg-blue-500',
    textColor: 'text-white',
    icon: Building,
    allowedChildren: ['Loan', 'Collateral'],
    canBeRoot: true,
    description: 'Customer account container'
  },
  // ... other types
};
```

### Layout Customization

Modify positioning logic in `App.jsx`:
- Horizontal spacing between sibling nodes
- Vertical spacing between levels
- Initial root node position

## 📱 Usage Instructions

### Getting Started
1. **Launch Application**: Open in browser after running `npm run dev`
2. **Add Root Node**: Click "Add Account" or "Add Loan" buttons
3. **Explore Structure**: Click any node to open the side panel

### Building Your Tree
1. **Select Parent Node**: Click on an existing node
2. **Choose Child Type**: Select from valid options in dropdown
3. **Add Child**: Click "Add [Type]" button
4. **Repeat**: Continue building your hierarchy

### Managing Nodes
- **View Details**: Side panel shows node information and children
- **Delete Nodes**: Remove nodes with cascade deletion warning
- **Export Data**: Download JSON representation of your tree

### Debug Features
- **Debug Panel**: Top-left corner shows real-time statistics
- **Console Logging**: Check browser console for detailed state information
- **Node Selection**: Manual selection tools for testing

## ⚠️ Current Limitations

### Functional Limitations
1. **No Drag & Drop**: Nodes are positioned automatically
2. **No Persistence**: Tree state resets on page refresh
3. **No Undo/Redo**: Actions are immediate and irreversible
4. **Single Selection**: Only one node can be selected at a time
5. **No Import**: Export-only functionality
6. **Manual Layout**: No automatic tree arrangement algorithms

### Technical Constraints
1. **Client-Side Only**: No backend integration or data persistence
2. **Fixed Node Types**: Cannot add custom node types at runtime
3. **Memory Storage**: All data stored in browser memory
4. **No Collaboration**: Single-user application

## 🚀 Future Enhancements

### Planned Features
- **Import Functionality**: Load tree structures from JSON files
- **Undo/Redo System**: Action history with rollback capability
- **Multi-Select Operations**: Select and operate on multiple nodes
- **Auto-Layout Algorithms**: Automatic tree arrangement options
- **Node Templates**: Predefined node configurations
- **Export Formats**: PDF, PNG, SVG export options

### Technical Improvements
- **Backend Integration**: API for data persistence
- **Real-time Collaboration**: Multi-user editing capabilities
- **Performance Optimization**: Virtual rendering for large trees
- **Mobile Responsiveness**: Touch-friendly interface
- **Accessibility**: Screen reader support and keyboard navigation

## 🧪 Development Notes

### Debug Features
- **Debug Panel**: Located in top-left corner showing live statistics
- **Console Logging**: Extensive logging for development and troubleshooting
- **State Inspection**: Buttons to log current application state

### Known Issues
- **Edge Rendering**: Visual connections between nodes may not always be visible
- **State Management**: Complex parent-child relationships require careful handling
- **Layout Calculations**: Manual positioning may need adjustment for large trees

## 📝 License

MIT License - feel free to use this project for your own applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
