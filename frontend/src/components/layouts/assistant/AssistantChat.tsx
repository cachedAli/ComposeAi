import { useRef, useState, type Ref } from "react";
import clsx from "clsx";

import { ArrowUp, LucideWandSparkles } from "lucide-react";

import { useTextAreaHeightResize } from "@/hooks/useTextAreaHeightResize";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import AssistantLogo from "@/components/ui/logo/AssistantLogo";
import { capitalizeFirstLetter } from "@/libs/utils";
import { FileUploader } from "./upload/FileUploader";
import { useUserStore } from "@/store/useUserStore";
import FilePreview from "./upload/FilePreview";
import Button from "@/components/ui/Button";
import { quickActions } from "@/libs/constants/assistantConstants";

const AssistantChat = () => {
  const { messages } = useEmailAssistantStore();

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
  const { user } = useUserStore();

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
  const { file, addMessage, setFile } = useEmailAssistantStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useTextAreaHeightResize(textAreaRef, value);

  const handleSend = () => {
    if (!value.trim()) return;

    addMessage({ role: "user", content: value.trim(), file });

    setFile(null);
    setValue("");

    // Later you’ll replace this with API call
    setTimeout(() => {
      addMessage({
        role: "assistant",
        content: "Thanks for your message! (This is a dummy reply.)",
      });
    }, 1000);
  };

  return (
    <div className="relative">
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
  return (
    <div className="absolute right-3 bottom-4 flex items-center justify-between w-full">
      <div className="flex items-center relative">
        <FileUploader />

        <Button
          className={clsx(
            "bg-neutral-800 flex items-center justify-center border border-neutral-500 text-white size-9 rounded-full p-0",
            "hover:border-transparent"
          )}
        >
          <LucideWandSparkles size={16} />
        </Button>
        <QuickActionsDropUp />
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

const QuickActionsDropUp = () => {
  return (
    <div className="w-44 absolute bottom-11 right-1 shadow-2xl rounded-lg bg-neutral-700 border border-neutral-600">
      <h3 className="text-xs font-semibold text-center py-2 text-white border-b border-neutral-600">
        Quick Actions
      </h3>
      <ul className="p-1 space-y-1">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <li
              key={action.label}
              onClick={action.onClick}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white rounded-md hover:bg-neutral-600 cursor-pointer transition"
            >
              <Icon size={16} />
              {action.label}
            </li>
          );
        })}
      </ul>
    </div>
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
        " bg-neutral-800 w-[800px] border border-neutral-600 resize-none rounded-2xl outline-none  py-3 px-4 pb-16 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-colors duration-300 overflow-hidden",
        "hover:border-neutral-500",
        "focus:border-neutral-500",
        file ? "pt-20" : ""
      )}
      style={{
        minHeight: file ? "190px" : "80px",
      }}
      placeholder="Describe your email and I’ll help you write it"
    />
  );
};
