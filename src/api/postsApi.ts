import axios from "axios";
import type { Post, User, LoginCredentials } from "../types";

import { dummyPosts } from "../data/dummyData";

// Axios instance with base URL from env or default
const api = axios.create({
  baseURL:
    (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: false,
});

// Manage Authorization header
function setAuthHeader(token?: string) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Initialize header from localStorage if present
try {
  const savedAccess = localStorage.getItem("accessToken");
  if (savedAccess) setAuthHeader(savedAccess);
} catch {}

// No-op reCAPTCHA for simplified flow
async function getRecaptchaToken(_: string): Promise<string> {
  return "";
}

// Dummy user data
const dummyUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  joinDate: "2024-01-15",
  postsAnalyzed: 1247,
  accuracyRate: 94.2,
};

// API Functions (currently returning dummy data)
export const postsApi = {
  // Fetch all posts
  getAllPosts: async (): Promise<Post[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In production, this would be:
      // const response = await api.get('/posts');
      // return response.data;

      return dummyPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  },

  // Fetch single post by ID
  getPostById: async (id: string): Promise<Post | null> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      // In production:
      // const response = await api.get(`/posts/${id}`);
      // return response.data;

      return dummyPosts.find((post) => post.id === id) || null;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw new Error("Failed to fetch post");
    }
  },

  // Analyze post for AI detection
  analyzePost: async (postId: string): Promise<any> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production:
      // const response = await api.post('/analyze', { postId });
      // return response.data;

      const post = dummyPosts.find((p) => p.id === postId);
      return post?.detectionDetails || null;
    } catch (error) {
      console.error("Error analyzing post:", error);
      throw new Error("Failed to analyze post");
    }
  },

  // Get spread analysis
  getSpreadAnalysis: async (postId: string): Promise<any> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In production:
      // const response = await api.get(`/posts/${postId}/spread`);
      // return response.data;

      const post = dummyPosts.find((p) => p.id === postId);
      return post?.spreadAnalysis || null;
    } catch (error) {
      console.error("Error fetching spread analysis:", error);
      throw new Error("Failed to fetch spread analysis");
    }
  },

  // Authentication functions
  login: async (
    credentials: LoginCredentials & { recaptcha_token: string }
  ): Promise<{ user: User; token: string }> => {
    try {
      // The credentials object now directly matches the backend payload
      const response = await api.post("/login", credentials);

      const { access, refresh } = response.data as {
        access: string;
        refresh: string;
      };

      // Persist tokens and set header for future API calls
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAuthHeader(access);

      // In a real app, you would fetch the user profile from a /users/me endpoint.
      // For now, returning a dummy user is fine for UI continuity.
      if (response.data.access != null) {
        dummyUser.name = credentials.username;
      }
      return {
        user: dummyUser, // Replace with a real user fetch when the endpoint is ready
        token: access,
      };
    } catch (error) {
      console.error("Error logging in:", error);
      // Reset tokens on failure
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthHeader("");
      throw new Error("Failed to login");
    }
  },

  signup: async (data: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password1: string;
    password2: string;
    recaptcha_token: string;
  }): Promise<{ message: string }> => {
    try {
      const response = await api.post("/signup", data);
      return response.data as { message: string };
    } catch (error: any) {
      // Attempt to parse and throw a more specific error from the backend
      const errorData = error.response?.data;
      if (errorData) {
        // Handle cases where backend sends structured errors (e.g., {"username": ["already exists"]})
        if (typeof errorData === "object") {
          const messages = Object.entries(errorData)
            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
            .join("; ");
          throw new Error(
            messages || "Signup failed. Please check your input."
          );
        }
        // Handle simple error messages
        throw new Error(
          errorData.error ||
            errorData.detail ||
            "An unknown error occurred during signup."
        );
      }
      throw new Error("Failed to connect to the server.");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.get("/logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthHeader(undefined);
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      // In production:
      // const response = await api.get('/auth/me');
      // return response.data;

      return dummyUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  },

  // Test URL for AI detection
  testUrl: async (url: string): Promise<void> => {
    try {
      console.log("Sending URL to backend for analysis:", url);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In production:
      // const response = await api.post('/analyze/url', { url });
      // return response.data;

      console.log("URL analysis request sent successfully");
    } catch (error) {
      console.error("Error testing URL:", error);
      throw new Error("Failed to test URL");
    }
  },
};

// Expose utility for UI components
export const authUtils = { getRecaptchaToken };
