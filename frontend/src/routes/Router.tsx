import AuthLayout from "@/components/layouts/auth/AuthLayout";
import ForgotPassword from "@/pages/ForgotPassword";
import Homepage from "@/pages/Homepage";
import ResetPassword from "@/pages/ResetPassword";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Homepage />} />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default Router;
