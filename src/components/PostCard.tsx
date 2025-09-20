import React from "react";
import { Post } from "../types";
import { Clock, ExternalLink } from "lucide-react";

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(post)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-semibold">
          {post.userInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {formatTimestamp(post.timestamp)}
              </span>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                post.detection === "ai-generated"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {post.detection === "ai-generated" ? "AI-generated" : "Human"}
            </span>
          </div>

          <p className="text-gray-900 text-sm leading-relaxed mb-3">
            {post.content}
          </p>

          <div className="flex items-center justify-between">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-xs hover:text-blue-800 flex items-center space-x-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              <span>{post.url}</span>
            </a>

            <span className="text-xs text-gray-500">
              {post.confidence}% confidence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
