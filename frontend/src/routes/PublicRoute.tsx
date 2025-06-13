import { AnimatedLogo } from "@/components/ui/logo/AnimatedLogo";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const { loading } = useEmailAssistantStore();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <AnimatedLogo home={false} />
      </div>
    );

  return user ? <Navigate to="/email-assistant" replace /> : children;
};

export default PublicRoute;
