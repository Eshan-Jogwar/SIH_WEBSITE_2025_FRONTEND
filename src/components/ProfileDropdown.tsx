import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useUser } from "../context/UserContext";

interface ProfileDropdownProps {
  onLogout: () => void;
  onViewProfile: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  onLogout,
  onViewProfile,
}) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (display: string) => {
    // Prefer initials from spaces in name; fallback to first two letters of username-like strings
    if (display.includes(" ")) {
      return display
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return display.slice(0, 2).toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {getInitials(user.username || user.name)}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.username}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              @{user.username}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={() => {
              onViewProfile();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
