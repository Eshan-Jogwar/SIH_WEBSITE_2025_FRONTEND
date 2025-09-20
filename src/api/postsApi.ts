import axios from "axios";
import type { Post, User, LoginCredentials } from "../types";

import { dummyPosts } from "../data/dummyData";

// Dummy user data
const dummyUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "2024-01-15",
  postsAnalyzed: 1247,
  accuracyRate: 94.2,
};

// Base API configuration
const api = axios.create({
  baseURL: process.env.VITE_REACT_APP_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production:
      // const response = await api.post('/auth/login', credentials);
      // return response.data;

      // Simple dummy validation
      if (credentials.email && credentials.password) {
        return {
          user: dummyUser,
          token: "dummy-jwt-token-12345",
        };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login");
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
