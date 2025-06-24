import { Link, useLocation } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import { preloadSignup } from "@/routes/preloadRoutes";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "./Button";
import Loader from "./Loader";

const AuthButtons = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const isSignin = location.pathname === "/signin";
  const { signInWithGoogle, signInWithGitHub, githubLoading, googleLoading } =
    useAuthStore();
    
  const handleSigninWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSigninWithGitHub = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center mt-6 mb-4">
        <hr className="border-t flex-grow border-gray-500" />
        <span className="mx-2 text-gray-200 text-xs">OR</span>
        <hr className="border-t flex-grow border-gray-500" />
      </div>

      {/* Google */}
      <Button
        disabled={googleLoading}
        onClick={handleSigninWithGoogle}
        className="max-[500px]:text-xs"
      >
        {googleLoading ? (
          <Loader color="primary" />
        ) : (
          <>
            <FcGoogle size={20} /> Continue with Google
          </>
        )}
      </Button>

      {/* Github */}
      <Button
        disabled={githubLoading}
        onClick={handleSigninWithGitHub}
        className="max-[500px]:text-xs"
      >
        {githubLoading ? (
          <Loader color="primary" />
        ) : (
          <>
            {" "}
            <IoLogoGithub size={20} /> Continue with GitHub
          </>
        )}
      </Button>

      {isSignup ? (
        <div className="text-center text-sm text-gray-400 mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </div>
      ) : (
        isSignin && (
          <div className="text-center text-sm text-gray-400 mt-2">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              onMouseEnter={() => preloadSignup()}
              className="text-cyan-400 hover:underline"
            >
              Sign up
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default AuthButtons;
