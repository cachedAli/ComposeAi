import { useRef, useState, type Ref, type RefObject } from "react";
import clsx from "clsx";

import { ArrowUp, Info, LucideWandSparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useTextAreaHeightResize } from "@/hooks/useTextAreaHeightResize";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { quickActions } from "@/libs/constants/assistantConstants";
import AssistantLogo from "@/components/ui/logo/AssistantLogo";
import { capitalizeFirstLetter } from "@/libs/utils";
import { FileUploader } from "./upload/FileUploader";
import { useUserStore } from "@/store/useUserStore";
import FilePreview from "./upload/FilePreview";
import Button from "@/components/ui/Button";
import { useCloseOnClick } from "@/hooks/useCloseOnClick";
import { v4 as uuidv4 } from "uuid";

const AssistantChat = () => {
  const messages = useEmailAssistantStore((state) => state.messages);

  return (
    <div
      className={clsx(
        "w-full flex flex-col items-center gap-8 transition-all duration-300"
      )}
    >
      {messages.length === 0 && <ChatTopContent />}

      <ChatTextArea />
    </div>
  );
};

export default AssistantChat;

const ChatTopContent = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className="flex gap-3 items-center justify-center">
        {/* Ai Logo */}
        <AssistantLogo />

        {/* User name */}
        <h2 className="text-5xl font-medium">
          {user
            ? `Hi, ${capitalizeFirstLetter(
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
              )}`
            : "Hi there!"}
        </h2>
      </div>

      <p>How can I help you today?</p>
    </div>
  );
};

const ChatTextArea = () => {
  const [value, setValue] = useState("");
  const { file, addMessage, setFile, sendToBackend, messages } =
    useEmailAssistantStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useTextAreaHeightResize(textAreaRef, value);

  const handleSend = async () => {
    if (!value.trim()) return;

    const userMsg = {
      id: uuidv4(),
      role: "user" as "user",
      content: value.trim(),
      file,
    };

    // 1. Show user message immediately
    addMessage(userMsg);

    // Clear input
    setValue("");
    setFile(null);

    // 2. Call backend
    const response = await sendToBackend(userMsg, messages);

    if (response?.data?.success) {
      addMessage({
        id: uuidv4(),
        role: "assistant",
        content: response.data.geminiText,
      });
    } else {
      addMessage({
        id: uuidv4(),
        role: "assistant",
        content: "❌ Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="relative max-[840px]:w-full">
      <FilePreview />

      <TextArea
        file={file}
        setValue={setValue}
        textAreaRef={textAreaRef}
        value={value}
        handleSend={handleSend}
      />
      <ActionButtons value={value} handleSend={handleSend} />
    </div>
  );
};

const ActionButtons = ({
  value,
  handleSend,
}: {
  value: string;
  handleSend: () => void;
}) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  useCloseOnClick(quickActionsRef, showQuickActions, setShowQuickActions);

  return (
    <div className="absolute right-3 bottom-4 flex items-center justify-between w-full">
      <div className="flex items-center relative">
        <FileUploader />

        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowQuickActions((prev) => !prev);
          }}
          className={clsx(
            "bg-neutral-800 flex items-center justify-center border border-neutral-500 text-white size-9 rounded-full p-0",
            "hover:border-transparent"
          )}
        >
          <LucideWandSparkles size={16} />
        </Button>
        <AnimatePresence>
          {showQuickActions && (
            <QuickActionsDropUp
              setShowQuickActions={setShowQuickActions}
              quickActionsRef={quickActionsRef}
            />
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleSend}
        className={clsx(
          "size-9 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center cursor-pointer brightness-110 transition-all duration-300 ",
          " hover:opacity-85",
          value.length === 0 && "pointer-events-none opacity-50"
        )}
        disabled={value.length === 0}
      >
        <ArrowUp className="font-bold" size={20} />
      </button>
    </div>
  );
};

const QuickActionsDropUp = ({
  setShowQuickActions,
  quickActionsRef,
}: {
  setShowQuickActions: (value: boolean) => void;
  quickActionsRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <motion.div
      ref={quickActionsRef}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={clsx(
        "w-44 h-auto absolute bottom-11 right-1 shadow-2xl rounded-lg bg-neutral-700 border border-neutral-600 py-2 z-50",
        "max-lg:left-20"
      )}
    >
      {/* Info Icon + Tooltip */}
      <div className="flex items-center justify-between px-3 mb-2">
        <h2 className="text-xs text-white font-semibold">Quick Actions</h2>
        <div className="relative group">
          <Info size={14} className="text-white cursor-default" />
          <div className="absolute bottom-full mb-1 right-0 w-48 bg-black text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            These actions apply to your <strong>last sent message</strong>.
          </div>
        </div>
      </div>

      {/* Actions */}
      <ul className="flex flex-col gap-1">
        {quickActions.map((action) => (
          <li
            key={action.label}
            onClick={() => {
              action.onClick?.();
              setShowQuickActions(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white rounded-md hover:bg-neutral-600 cursor-pointer transition"
          >
            <action.icon size={16} color={action.color} />
            {action.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

type textAreaProps = {
  textAreaRef: Ref<HTMLTextAreaElement>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  handleSend: () => void;
};

const TextArea = ({
  textAreaRef,
  value,
  setValue,
  file,
  handleSend,
}: textAreaProps) => {
  return (
    <textarea
      ref={textAreaRef}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={2}
      className={clsx(
        " bg-neutral-800 w-[800px] max-w-[800px] border border-neutral-600 resize-none rounded-2xl outline-none  py-3 px-4 pb-16 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-colors duration-300 overflow-hidden",
        "hover:border-neutral-500",
        "focus:border-neutral-500",
        "max-[840px]:w-full",
        file ? "pt-20" : ""
      )}
      style={{
        minHeight: file ? "190px" : "80px",
      }}
      placeholder="Describe your email and I’ll help you write it"
    />
  );
};
