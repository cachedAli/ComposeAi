import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

const EmailAssistantPage = () => {
  const user = useUserStore((state) => state.user);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <div className="flex">
      <img
        src={user?.profilePic}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />
      {user?.firstName}
      {user?.lastName}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default EmailAssistantPage;
