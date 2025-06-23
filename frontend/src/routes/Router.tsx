import AuthLayout from "@/components/layouts/auth/AuthLayout";
import Homepage from "@/pages/Homepage";
import { Route, Routes } from "react-router-dom";
import AuthRedirectHandler from "./AuthRedirectHandler";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "./NotFound";
import LazyLoader from "@/libs/LazyLoader";
import {
  EmailAssistantPage,
  ForgotPassword,
  ResetPassword,
  Signin,
  Signup,
  VerifyEmail,
} from "./lazyRoutes";
import OAuthSuccess from "@/pages/OAuthSuccess";

const Router = () => {
  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Homepage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />

      {/* Callback */}
      <Route path="/auth/callback" element={<AuthRedirectHandler />} />
      <Route path="/oauth/success" element={<OAuthSuccess />} />

      {/* Auth */}
      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route
          path="/signup"
          element={
            <LazyLoader>
              <Signup />
            </LazyLoader>
          }
        />
        <Route
          path="/signin"
          element={
            <LazyLoader>
              <Signin />
            </LazyLoader>
          }
        />
        <Route
          path="/verify-email"
          element={
            <LazyLoader>
              <VerifyEmail />
            </LazyLoader>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <LazyLoader>
              <ForgotPassword />
            </LazyLoader>
          }
        />
        <Route
          path="/reset-password"
          element={
            <LazyLoader>
              <ResetPassword />
            </LazyLoader>
          }
        />
      </Route>

      {/* Email Assistant */}
      <Route
        path="/email-assistant"
        element={
          <LazyLoader>
            <EmailAssistantPage />
          </LazyLoader>
        }
      />
    </Routes>
  );
};

export default Router;
