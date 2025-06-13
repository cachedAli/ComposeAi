import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";

import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";
import { capitalizeFirstLetter } from "@/libs/utils";
import Button from "@/components/ui/Button";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const page = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ");

  return (
    <div className="flex items-center justify-center p-6 flex-col gap-3">
      {location.pathname !== "/reset-password" && (
        <div className="w-full ">
          <Button
            className={clsx(
              "w-24 h-10 text-sm absolute top-14 left-4 p-2",
              "max-sm:w-20 max-sm:text-xs"
            )}
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} /> Home
          </Button>
        </div>
      )}
      <AnimatedLogo home={false} />

      <h2 className="text-2xl font-semibold mb-2">
        {capitalizeFirstLetter(page!)}
      </h2>

      <div
        className={clsx(
          "bg-neutral-800 p-10 w-[450px] h-full rounded-2xl",
          "max-[500px]:w-full"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
