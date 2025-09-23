import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { LoginPage } from "./LoginPage";
import { User } from "../types";

// A container to provide the reCAPTCHA context
export const AuthContainer = () => {
  const handleLogin = (user: User) => {
    console.log("Logged in user:", user);
    // Handle successful login (e.g., redirect to dashboard)
  };

  return (
    // ⚠️ Replace with your actual v3 site key
    <GoogleReCaptchaProvider reCaptchaKey="6LfbuNIrAAAAAJ57PMe53LMChP1PYvjnwSYqFTgL">
      <LoginPage onLogin={handleLogin} />
    </GoogleReCaptchaProvider>
  );
};
