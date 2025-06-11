import { useEffect, useState } from "react";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";

import { resetPasswordFields } from "@/libs/constants/authConstants";
import { resetPasswordSchema } from "@/libs/schema/authSchema";
import Form from "@/components/ui/Form";
import { supabase } from "@/libs/supabaseClient";
import { toast } from "sonner";

type Data = {
  password: string;
  confirmPassword: string;
};
const ResetPassword = () => {
  const [countdown, setCountdown] = useState(5);
  const [message, setMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const pathName = window.location.pathname;

    if (pathName === "/reset-password" && hash.includes("access_token")) {
      // automatically sets the session
      supabase.auth.getSession().then(({ error }) => {
        if (error) {
          toast.error("Session error: " + error.message);
        }
      });
    }
  }, []);

  const handleSubmit = async (data: Data) => {
    const { confirmPassword } = data;

    const { error } = await supabase.auth.updateUser({
      password: confirmPassword,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password changed successfully!");

    setMessage("Redirecting in ");
    setIsRedirecting(true);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      navigate("/signin");
    }, 5000);
  };

  return (
    <div>
      <Form
        fields={resetPasswordFields}
        schema={resetPasswordSchema}
        onSubmit={handleSubmit}
        buttonLabel="Continue"
        disabled={isRedirecting}
      />
      <RedirectMessage countdown={countdown} message={message} />
    </div>
  );
};

export default ResetPassword;

type RedirectMessageProps = {
  message: string;
  countdown: number;
};
const RedirectMessage = ({ message, countdown }: RedirectMessageProps) => {
  return (
    <>
      {message && (
        <div
          className={clsx(
            "flex text-center items-center justify-center w-full mt-4 -mb-2 cursor-default",
            "max-sm:text-sm"
          )}
        >
          {message && (
            <p className="text-gray-400">
              {message}
              <span className="text-cyan-500">{countdown}</span>
            </p>
          )}
        </div>
      )}
    </>
  );
};
