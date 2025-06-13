import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";
import { supabase } from "@/libs/supabaseClient";
import { capitalizeFirstLetter, createUserObject } from "@/libs/utils";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthRedirectHandler = () => {
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

      const fullName = meta.full_name || `${meta?.firstName} ${meta?.lastName}`;

      const newUser = createUserObject(user);

      useUserStore.getState().setUser(newUser);

      toast.success(`Welcome ${capitalizeFirstLetter(fullName)}`);

      console.log(user);
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
