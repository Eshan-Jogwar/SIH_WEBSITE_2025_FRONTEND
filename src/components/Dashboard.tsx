import React, { useState, useEffect } from "react";
import type { Post, User } from "../types";
import { PostCard } from "./PostCard";
import { ProfileDropdown } from "./ProfileDropdown";
import { ProfileModal } from "./ProfileModal";
import { postsApi } from "../api/postsApi";
import { Shield, ExternalLink } from "lucide-react";
import { PostDetailModal } from "./PostDetailModel";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [testUrl, setTestUrl] = useState("");
  const [isTestingUrl, setIsTestingUrl] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsApi.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleTestUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrl.trim()) return;

    setIsTestingUrl(true);
    try {
      await postsApi.testUrl(testUrl);
      setTestUrl("");
    } catch (error) {
      console.error("Failed to test URL:", error);
    } finally {
      setIsTestingUrl(false);
    }
  };

  const aiGeneratedCount = posts.filter(
    (p) => p.detection === "ai-generated"
  ).length;
  const humanCount = posts.filter((p) => p.detection === "human").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  AI Detection Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Social feed analysis and attribution
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-800">Live</span>
              </div>
              <span className="text-sm text-gray-500">Placeholder data</span>

              <ProfileDropdown
                user={user}
                onLogout={onLogout}
                onViewProfile={() => setIsProfileModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Social Feed
              </h2>
              <p className="text-gray-600">
                Minimal, chronological snippets — badges mark AI signals
              </p>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onClick={handlePostClick} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* URL Testing */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Test URL
                </h3>

                <form onSubmit={handleTestUrl} className="space-y-4">
                  <div>
                    <input
                      type="url"
                      value={testUrl}
                      onChange={(e) => setTestUrl(e.target.value)}
                      placeholder="Test For Some URL post"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isTestingUrl || !testUrl.trim()}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                  >
                    {isTestingUrl ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Testing...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Secured on Blockchain
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  All analysis results are cryptographically verified and stored
                  on the blockchain for transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PostDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Profile Modal */}
      <ProfileModal
        user={user}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
