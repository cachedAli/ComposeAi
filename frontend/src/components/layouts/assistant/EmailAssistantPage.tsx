import { useEffect } from "react";

import { useUserStore } from "@/store/useUserStore";
import AssistantChat from "./AssistantChat";
import Header from "../Header";
import AssistantMessages from "./AssistantMessages";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import clsx from "clsx";
import AssistantOverlay from "./AssistantOverlay";

const EmailAssistantPage = () => {
  const { fetchUser } = useUserStore();
  const { messages } = useEmailAssistantStore();

  const noMessages = messages.length === 0;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-between h-screen px-6 py-4 font-outfit",
        noMessages ? "pb-40" : ""
      )}
    >
      <Header isAssistant />
      <div className="flex-1 w-full overflow-y-auto px-4 py-2 space-y-4 scroll-smooth">
        <AssistantMessages />
      </div>
      <AssistantChat />
      <AssistantOverlay />
    </div>
  );
};

export default EmailAssistantPage;
