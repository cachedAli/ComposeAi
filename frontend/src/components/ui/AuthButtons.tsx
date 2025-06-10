import { Link, useLocation } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import Button from "./Button";

const AuthButtons = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const isSignin = location.pathname === "/signin";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center mt-6 mb-4">
        <hr className="border-t flex-grow border-gray-500" />
        <span className="mx-2 text-gray-200 text-xs">OR</span>
        <hr className="border-t flex-grow border-gray-500" />
      </div>

      {/* Google */}
      <Button className="max-[500px]:text-xs">
        <FcGoogle size={20} /> Continue with Google
      </Button>

      {/* Github */}
      <Button className="max-[500px]:text-xs">
        <IoLogoGithub size={20} /> Continue with GitHub
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
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default AuthButtons;
