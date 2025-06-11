import { IoMailUnreadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import clsx from "clsx";

import { capitalizeFirstLetter, createUserObject } from "@/libs/utils";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/libs/supabaseClient";
import Button from "@/components/ui/Button";

const VerifyEmail = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex rounded-2xl bg-neutral-700/40 p-5">
        <IoMailUnreadOutline size={96} className="text-cyan-500" />
      </div>

      <p
        className={clsx(
          "text-gray-400 text-base text-center",
          "max-sm:text-sm"
        )}
      >
        Signup successful! Please check your email to verify your account.
      </p>

      <ButtonComponent />
    </div>
  );
};

export default VerifyEmail;

const ButtonComponent = () => {
  const navigate = useNavigate();

  const handleContinue = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Session not found. Please sign in again on this device.");
      navigate("/signin");
      return;
    }

    if (error) {
      toast.error(error.message);
      return;
    }

    const confirmedAt = user?.confirmed_at;
    const fullName = `${user?.user_metadata?.firstName} ${user?.user_metadata?.lastName}`;

    if (confirmedAt) {
      const newUser = createUserObject(user);
      useUserStore.getState().setUser(newUser);
      navigate("/email-assistant");
      toast.success(`Welcome ${capitalizeFirstLetter(fullName)}`);
    } else {
      toast.error("Email is not yet confirmed.");
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => window.open("https://mail.google.com/", "_blank")}
      >
        Open Email
      </Button>

      <Button variant="primary" onClick={handleContinue}>
        Continue
      </Button>
    </>
  );
};
