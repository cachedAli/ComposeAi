import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { sendEmailFields } from "@/libs/constants/assistantConstants";
import { sendEmailSchema } from "@/libs/schema/assistantSchema";
import { useAuthStore } from "@/store/useAuthStore";

const AssistantOverlay = () => {
  const { setSendEmail, setLogout, isLogout, isSendEmail } =
    useEmailAssistantStore();
  const { logout } = useAuthStore();

  const navigate = useNavigate();

  const handleSendEmail = (data: { emailFrom: string; emailTo: string }) => {
    console.log(data);
    setSendEmail(false);
  };

  const handleLogout = async () => {
    await logout();
    setLogout(false);
    navigate("/signin");
  };

  return (
    <AnimatePresence>
      {isLogout && (
        <ConfirmationModal
          confirmText="Logout"
          title="Confirm Logout"
          description="Are you sure you want to log out?"
          onClick={handleLogout}
          backButtonOnClick={() => setLogout(false)}
        />
      )}
      {isSendEmail && (
        <ConfirmationModal
          confirmText="SendEmail"
          title="Send Email"
          description="Please confirm the email address before sending."
          fields={sendEmailFields}
          schema={sendEmailSchema}
          onSubmit={handleSendEmail}
          backButtonOnClick={() => setSendEmail(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default AssistantOverlay;
