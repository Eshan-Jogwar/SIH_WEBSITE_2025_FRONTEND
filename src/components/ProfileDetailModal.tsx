import React from "react";
import { Post } from "../types";
import {
  X,
  ExternalLink,
  Brain,
  Users,
  Shield,
  TrendingUp,
} from "lucide-react";
import { SpreadVisualization } from "./SpreadVisualization";

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Post Analysis
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Post Content */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                {post.userInitials}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 leading-relaxed">{post.content}</p>
                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{post.url}</span>
                  </a>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      post.detection === "ai-generated"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {post.detection === "ai-generated"
                      ? "AI-generated"
                      : "Human"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detection Results */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Detection Results</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Detector (RoBERTa)</span>
                    <span className="text-2xl font-bold">
                      {post.detectionDetails.roberta}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This post is {post.detectionDetails.roberta}% likely
                    AI-generated
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Detector (T5)</span>
                    <span className="text-2xl font-bold">
                      {post.detectionDetails.t5}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    High confidence of model origin
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Attribution (style)</span>
                    <span className="text-2xl font-bold">
                      {post.detectionDetails.attribution}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {post.detectionDetails.styleMatch}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Attribution Model</h3>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {post.detection === "ai-generated"
                      ? post.detectionDetails.model
                      : "Human"}
                  </div>
                  <p className="text-gray-600">Detected Model</p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">GNN</div>
                  <div className="text-sm text-gray-600">
                    Cluster: {post.spreadAnalysis.clusterId}
                  </div>
                  <div className="text-sm text-gray-600">
                    {post.spreadAnalysis.suspiciousConnections} suspicious
                  </div>
                  <div className="text-sm text-gray-600">
                    connected accounts
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spread Analysis */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Spread Analysis (GNN)</h3>
            </div>

            <SpreadVisualization postId={post.id} />
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {post.spreadAnalysis.totalNodes}
              </div>
              <div className="text-sm text-blue-700">Total Nodes</div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 text-center">
              <Shield className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-900">
                {post.spreadAnalysis.suspiciousConnections}
              </div>
              <div className="text-sm text-red-700">Suspicious Links</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Brain className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">
                {post.confidence}%
              </div>
              <div className="text-sm text-green-700">Confidence</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">
                {post.spreadAnalysis.clusterId}
              </div>
              <div className="text-sm text-purple-700">Cluster ID</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
