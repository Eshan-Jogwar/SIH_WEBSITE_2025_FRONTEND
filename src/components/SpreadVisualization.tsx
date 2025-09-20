import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { generateGraphData } from "../data/dummyData";
interface SpreadVisualizationProps {
  postId: string;
}

const nodeStyle = {
  default: {
    background: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#374151",
  },
  original: {
    background: "#dbeafe",
    border: "2px solid #3b82f6",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#1e40af",
    fontWeight: "bold",
  },
  suspicious: {
    background: "#fee2e2",
    border: "2px solid #ef4444",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#dc2626",
  },
};

export const SpreadVisualization: React.FC<SpreadVisualizationProps> = ({
  postId,
}) => {
  const graphData = useMemo(() => generateGraphData(postId), [postId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    graphData.nodes.map((node: Node) => ({
      ...node,
      style: node.data.isOriginal
        ? nodeStyle.original
        : node.data.isSuspicious
        ? nodeStyle.suspicious
        : nodeStyle.default,
    }))
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(graphData.edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-96 border border-gray-200 rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#f1f5f9" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) =>
            node.data.isOriginal
              ? "#3b82f6"
              : node.data.isSuspicious
              ? "#ef4444"
              : "#64748b"
          }
          className="bg-white border border-gray-200"
        />
      </ReactFlow>

      <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Original Post</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Suspicious Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Normal Activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
