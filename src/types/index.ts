export interface Post {
  id: string;
  userId: string;
  userInitials: string;
  content: string;
  url: string;
  timestamp: string;
  detection: "ai-generated" | "human";
  confidence: number;
  detectionDetails: {
    roberta: number;
    t5: number;
    attribution: number;
    model: string;
    styleMatch: string;
  };
  spreadAnalysis: {
    clusterId: string;
    suspiciousConnections: number;
    totalNodes: number;
  };
}

export interface GraphNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    isOriginal?: boolean;
    isSuspicious?: boolean;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: string;
  postsAnalyzed: number;
  accuracyRate: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
  recaptcha_token?: string;
}
