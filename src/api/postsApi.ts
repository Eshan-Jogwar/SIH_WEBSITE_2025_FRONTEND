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

// Attempt to get reCAPTCHA v3 token; returns "test" if not configured
async function getRecaptchaToken(action: string): Promise<string> {
  const siteKey = (import.meta as any).env?.VITE_RECAPTCHA_SITE_KEY;
  // Wait for grecaptcha to load
  const waitForGrecaptcha = () =>
    new Promise<void>((resolve) => {
      if (typeof window !== "undefined" && (window as any).grecaptcha)
        return resolve();
      const interval = setInterval(() => {
        if ((window as any).grecaptcha) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, 3000);
    });

  await waitForGrecaptcha();

  if (typeof window !== "undefined" && (window as any).grecaptcha && siteKey) {
    try {
      const grecaptcha = (window as any).grecaptcha;
      await grecaptcha.ready?.();
      const token = await grecaptcha.execute(siteKey, { action });
      if (typeof token === "string" && token.length > 0) return token;
    } catch {}
  }
  // Fallback token for local testing; backend may allow this when configured
  return "test";
}

// Dummy user data
const dummyUser: User = {
  id: "1",
  name: "John Doe",
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
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> => {
    try {
      const recaptcha_token = await getRecaptchaToken("login");
      const payload = {
        username: credentials.email,
        password: credentials.password,
        recaptcha_token,
      };
      const response = await api.post("/login", payload);
      const { access, refresh } = response.data as {
        access: string;
        refresh: string;
      };
      // Persist tokens and set header
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAuthHeader(access);

      // Backend has no profile endpoint yet; return dummy user for UI continuity
      return {
        user: dummyUser,
        token: access,
      };
    } catch (error) {
      console.error("Error logging in:", error);
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
  }): Promise<{ message: string }> => {
    try {
      const recaptcha_token = await getRecaptchaToken("signup");
      const payload = { ...data, recaptcha_token };
      const response = await api.post("/signup", payload);
      return response.data as { message: string };
    } catch (error: any) {
      // Surface backend error if available
      const message = error?.response?.data?.error || "Failed to signup";
      throw new Error(message);
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
