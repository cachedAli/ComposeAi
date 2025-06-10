import { TbMailShare } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Button from "@/components/ui/Button";

const EmailSent = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex rounded-2xl bg-neutral-700/40 p-5 ">
        <TbMailShare size={96} className="text-cyan-500" />
      </div>

      <p
        className={clsx(
          "text-gray-400 text-base text-center",
          "max-sm:text-sm"
        )}
      >
        We've sent a password reset link to your email.
      </p>

      <ButtonComponent />
    </div>
  );
};

export default EmailSent;

const ButtonComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => window.open("https://mail.google.com/", "_blank")}
      >
        Open Email
      </Button>

      <Button
        variant="primary"
        className="-mt-1"
        onClick={() => navigate("/signin")}
      >
        Back to login
      </Button>
    </>
  );
};
