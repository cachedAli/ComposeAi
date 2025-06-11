import AuthLayout from "@/components/layouts/auth/AuthLayout";
import ForgotPassword from "@/pages/ForgotPassword";
import Homepage from "@/pages/Homepage";
import ResetPassword from "@/pages/ResetPassword";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";
import AuthRedirectHandler from "./AuthRedirectHandler";
import EmailAssistantPage from "@/components/layouts/assistant/EmailAssistantPage";
import VerifyEmail from "@/pages/VerifyEmail";

const Router = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Homepage />} />

      <Route path="/auth/callback" element={<AuthRedirectHandler />} />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Email Assistant */}
      <Route path="/email-assistant" element={<EmailAssistantPage />} />
    </Routes>
  );
};

export default Router;
