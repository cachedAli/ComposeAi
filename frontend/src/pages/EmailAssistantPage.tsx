import { useEffect } from "react";

import { useUserStore } from "@/store/useUserStore";
import AssistantChat from "../components/layouts/assistant/AssistantChat";
import Header from "../components/layouts/Header";
import AssistantMessages from "../components/layouts/assistant/AssistantMessages";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import clsx from "clsx";
import AssistantOverlay from "../components/layouts/assistant/AssistantOverlay";

const EmailAssistantPage = () => {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const messages = useEmailAssistantStore((state) => state.messages);

  const noMessages = messages.length === 0;

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  return (
    <div
      className={clsx(
        "flex flex-col items-center  h-screen px-6 py-4 font-outfit",
        noMessages ? "justify-center" : "justify-between",
        "max-sm:px-4"
      )}
    >
      <Header isAssistant />
      {!noMessages && (
        <div
          className={clsx(
            "flex-1 w-full overflow-y-auto overflow-x-hidden px-4 py-2 space-y-4 scroll-smooth no-scrollbar-sm"
          )}
        >
          <AssistantMessages />
        </div>
      )}
      <AssistantChat />
      <AssistantOverlay />
    </div>
  );
};

export default EmailAssistantPage;
