import React from "react";
import { X, User, Mail, Calendar, BarChart3, Target } from "lucide-react";
import type { User as UserType } from "../types";

interface ProfileModalProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !user) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (display: string) => {
    if (display.includes(" ")) {
      return display
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return display.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {getInitials(user.username || user.name)}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              @{user.username}
            </h3>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {user.postsAnalyzed.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Posts Analyzed</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">
                {user.accuracyRate}%
              </div>
              <div className="text-sm text-green-700">Accuracy Rate</div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Username</p>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Member Since
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(user.joinDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
