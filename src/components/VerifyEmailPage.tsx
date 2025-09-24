import React, { useEffect, useState } from "react";
import { postsApi } from "../api/postsApi";

export const VerifyEmailPage: React.FC<{ path: string }> = ({ path }) => {
  // State to manage the message displayed to the user
  const [message, setMessage] = useState(
    "Verifying your email, please wait..."
  );

  useEffect(() => {
    // An async function to perform the verification
    const verifyAccount = async () => {
      // 1. Check if the required props were provided
      if (!path) {
        setMessage("Verification link is invalid or incomplete.");
        return;
      }

      try {
        // 2. Call your API with the provided credentials
        await postsApi.verifyEmail(path);

        // 3. Handle a successful verification
        setMessage("✅ Email verified successfully! Redirecting to login...");

        // After 3 seconds, manually redirect the browser to the login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } catch (error) {
        // 4. Handle an API error
        console.error("Verification failed:", error);
        setMessage(
          "❌ Verification failed. The link may be expired or invalid."
        );
      }
    };

    // Run the verification logic when the component mounts or props change
    verifyAccount();
  }, [path]); // The effect depends on the uid and token props

  // The UI that the user sees
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Account Verification
        </h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
