import { lazy } from "react";


// Homepage
export const Features = lazy(() => import("@/components/layouts/homepage/Features"));
export const HowItWorks = lazy(() => import("@/components/layouts/homepage/HowItWorks"));
export const CtaSection = lazy(() => import("@/components/layouts/homepage/CtaSection"));

// Auth pages
export const Signup = lazy(() => import("@/pages/Signup"));
export const Signin = lazy(() => import("@/pages/Signin"));
export const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
export const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
export const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));

export const EmailAssistantPage = lazy(() => import("@/pages/EmailAssistantPage"));