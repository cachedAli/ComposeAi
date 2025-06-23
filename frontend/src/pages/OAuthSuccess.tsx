import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const saveToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email");
      const refresh_token = params.get("refresh_token");
      const access_token = localStorage.getItem("supabase_token");

      if (!email || !refresh_token || !access_token) {
        toast.error("Missing data to complete connection");
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/api/oauth/save-token",
          { email, refresh_token },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        toast.success("Gmail connected!");
        navigate("/email-assistant");
      } catch (err) {
        console.error(err);
        toast.error("Failed to save token");
      }
    };

    saveToken();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <AnimatedLogo home={false} />
    </div>
  );
};

export default OAuthSuccess;
