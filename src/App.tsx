import React from "react";
import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { User } from "./types";
import { postsApi } from "./api/postsApi";
import { UserProvider } from "./context/UserContext";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (in a real app, check for stored token)
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const userData = await postsApi.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    // token will be set by postsApi.login; keep a marker for legacy
    localStorage.setItem("authToken", "present");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showSignup) {
      return <SignupPage onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <UserProvider user={user} setUser={setUser}>
      <div className="App">
        <Dashboard onLogout={handleLogout} />
      </div>
    </UserProvider>
  );
}

export default App;
