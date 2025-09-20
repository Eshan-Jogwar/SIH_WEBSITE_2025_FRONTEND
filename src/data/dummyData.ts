import type { Post } from "../types";

export const dummyPosts: Post[] = [
  {
    id: "1",
    userId: "AK",
    userInitials: "AK",
    content:
      "New benchmarks show early-stage detectors overfitting to synthetic data — stronger baselines needed.",
    url: "https://link-placeholder.com/post001",
    timestamp: "2025-01-15T10:30:00Z",
    detection: "ai-generated",
    confidence: 80,
    detectionDetails: {
      roberta: 80,
      t5: 72,
      attribution: 86,
      model: "GPT-4",
      styleMatch: "GPT-4 style patterns",
    },
    spreadAnalysis: {
      clusterId: "200",
      suspiciousConnections: 15,
      totalNodes: 42,
    },
  },
  {
    id: "2",
    userId: "PR",
    userInitials: "PR",
    content:
      "Field trials show a 12% yield bump — still validating across regions.",
    url: "https://link-placeholder.com/post002",
    timestamp: "2025-01-15T09:15:00Z",
    detection: "human",
    confidence: 92,
    detectionDetails: {
      roberta: 8,
      t5: 12,
      attribution: 5,
      model: "Human",
      styleMatch: "Natural writing patterns",
    },
    spreadAnalysis: {
      clusterId: "150",
      suspiciousConnections: 3,
      totalNodes: 18,
    },
  },
  {
    id: "3",
    userId: "DL",
    userInitials: "DL",
    content:
      "Compact GNN for propagation modelling reduces params by 45% while maintaining accuracy.",
    url: "https://link-placeholder.com/post003",
    timestamp: "2025-01-15T08:45:00Z",
    detection: "ai-generated",
    confidence: 75,
    detectionDetails: {
      roberta: 75,
      t5: 68,
      attribution: 82,
      model: "Claude-3",
      styleMatch: "Technical writing patterns",
    },
    spreadAnalysis: {
      clusterId: "300",
      suspiciousConnections: 28,
      totalNodes: 67,
    },
  },
  {
    id: "4",
    userId: "MS",
    userInitials: "MS",
    content: "Reminder: register for the trustworthy ML workshop this Friday.",
    url: "https://link-placeholder.com/post004",
    timestamp: "2025-01-15T07:20:00Z",
    detection: "human",
    confidence: 95,
    detectionDetails: {
      roberta: 5,
      t5: 8,
      attribution: 3,
      model: "Human",
      styleMatch: "Personal communication style",
    },
    spreadAnalysis: {
      clusterId: "50",
      suspiciousConnections: 1,
      totalNodes: 8,
    },
  },
  {
    id: "5",
    userId: "S",
    userInitials: "S",
    content:
      "Alert: chain reorg detected on testnet — replay protection engaged.",
    url: "https://link-placeholder.com/post005",
    timestamp: "2025-01-15T06:10:00Z",
    detection: "ai-generated",
    confidence: 88,
    detectionDetails: {
      roberta: 88,
      t5: 84,
      attribution: 91,
      model: "GPT-3.5",
      styleMatch: "Technical alert patterns",
    },
    spreadAnalysis: {
      clusterId: "400",
      suspiciousConnections: 45,
      totalNodes: 89,
    },
  },
];

export const generateGraphData = (postId: string) => {
  const post = dummyPosts.find((p) => p.id === postId);
  if (!post) return { nodes: [], edges: [] };

  const nodeCount = post.spreadAnalysis.totalNodes;
  const suspiciousCount = post.spreadAnalysis.suspiciousConnections;

  const nodes = [];
  const edges = [];

  // Create central node (original post)
  nodes.push({
    id: "central",
    type: "default",
    position: { x: 400, y: 300 },
    data: {
      label: `Original Post (${post.userInitials})`,
      isOriginal: true,
    },
  });

  // Create surrounding nodes
  for (let i = 0; i < Math.min(nodeCount, 20); i++) {
    const angle = (i / Math.min(nodeCount, 20)) * 2 * Math.PI;
    const radius = 150 + Math.random() * 100;
    const x = 400 + Math.cos(angle) * radius;
    const y = 300 + Math.sin(angle) * radius;

    const isSuspicious = i < suspiciousCount / 3;

    nodes.push({
      id: `node-${i}`,
      type: "default",
      position: { x, y },
      data: {
        label: `User ${i + 1}`,
        isSuspicious,
      },
    });

    // Create edge to central node
    edges.push({
      id: `edge-central-${i}`,
      source: "central",
      target: `node-${i}`,
      type: "default",
    });

    // Create some interconnections
    if (i > 0 && Math.random() > 0.7) {
      const targetIndex = Math.floor(Math.random() * i);
      edges.push({
        id: `edge-${i}-${targetIndex}`,
        source: `node-${i}`,
        target: `node-${targetIndex}`,
        type: "default",
      });
    }
  }

  return { nodes, edges };
};
