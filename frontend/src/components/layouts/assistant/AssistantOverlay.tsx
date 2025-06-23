import { useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { sendEmailFields } from "@/libs/constants/assistantConstants";
import { sendEmailSchema } from "@/libs/schema/assistantSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import GmailCard from "@/components/ui/GmailCard";
import { supabase } from "@/libs/supabaseClient";
import { useMessagesStore } from "@/store/useMessagesStore";
import { toast } from "sonner";

const AssistantOverlay = () => {
  const {
    setSendEmail,
    setLogout,
    isLogout,
    isSendEmail,
    showConnectGmail,
    setShowConnectGmail,
    html,
    sendEmailLoading,
    sendingEmailId,
  } = useEmailAssistantStore();
  const { logout, logoutLoading } = useAuthStore();
  const user = useUserStore((state) => state.user);
  const sendEmail = useMessagesStore((state) => state.sendEmail);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSetup = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const hasConnected = user?.user_metadata?.hasConnectedGmail;

      if (user?.app_metadata?.provider === "google" && !hasConnected) {
        setShowConnectGmail(true);
      } else {
        setShowConnectGmail(false);
      }
    };

    checkSetup();
  }, []);

  const extractSubjectAndBody = (text: string) => {
    const [subjectLine, ...bodyLines] = text.trim().split("\n");
    const subject = subjectLine.replace("Subject:", "").trim();
    const body = bodyLines.join("\n").trim();
    return { subject, body };
  };

  function plainTextToHtml(text: string) {
    return text
      .trim()
      .split("\n")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");
  }

  const handleSendEmail = async (data: { emailTo: string }) => {
    const { emailTo } = data;

    const isEmail = html.includes("Subject:");
    if (!isEmail) return toast.error("Email must include a Subject line");

    const { subject, body } = extractSubjectAndBody(html);
    const formattedBody = `<div style="font-family: sans-serif; font-size: 14px;">${plainTextToHtml(
      body
    )}</div>`;

    const response = await sendEmail({
      emailTo,
      subject: subject,
      html: formattedBody,
      msgId: sendingEmailId,
    });

    if (response?.data?.success) {
      setSendEmail(false);
    }
    return;
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
          loading={logoutLoading}
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
          loading={sendEmailLoading}
        />
      )}

      {user?.provider === "google" && showConnectGmail && <GmailCard />}
    </AnimatePresence>
  );
};

export default AssistantOverlay;
