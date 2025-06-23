import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { capitalizeFirstLetter, createUserObject } from "@/libs/utils";
import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/libs/supabaseClient";

const AuthRedirectHandler = () => {
  const { setGoogleLoading, setGithubLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/signin");
        return;
      }

      const user = data?.user;
      const meta = user?.user_metadata || {};
      const provider = user?.app_metadata?.provider;

      if (
        provider === "google" &&
        user?.user_metadata?.hasConnectedGmail === undefined
      ) {
        await supabase.auth.updateUser({
          data: {
            hasConnectedGmail: false,
          },
        });
      }

      

      const fullName = meta.full_name || `${meta?.firstName} ${meta?.lastName}`;

      const newUser = createUserObject(user);

      useUserStore.getState().setUser(newUser);

      setGoogleLoading(false);
      setGithubLoading(false);

      toast.success(`Welcome ${capitalizeFirstLetter(fullName)}`);

      navigate("/email-assistant");
    };
    getUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
      <AnimatedLogo home={false} />
    </div>
  );
};

export default AuthRedirectHandler;
