import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { Check, Copy, Mail, Pencil, ShieldAlert, Sparkle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { FileThumbPreview, ImageThumbPreview } from "./upload/FileThumbnails";
import { useTextAreaHeightResize } from "@/hooks/useTextAreaHeightResize";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import AssistantLogo from "@/components/ui/logo/AssistantLogo";
import { useMessagesStore } from "@/store/useMessagesStore";
import { useUserStore } from "@/store/useUserStore";
import Button from "@/components/ui/Button";
import { v4 as uuidv4 } from "uuid";

const AssistantMessages = () => {
  const messages = useMessagesStore((state) => state.messages);
  const assistantLoading = useEmailAssistantStore(
    (state) => state.assistantLoading
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={clsx(
        "relative flex flex-col gap-10 w-full max-w-[800px] mx-auto",
        messages.length !== 0 ? " mt-16" : "",
        "max-lg:w-full"
      )}
    >
      {messages.map((msg, index) => (
        <MessageRow
          key={msg.id}
          msg={msg}
          isLast={index === messages.length - 1}
        />
      ))}
      {assistantLoading && (
        <span className="absolute bottom-5 left-11">
          <Sparkle className="sparkle-morph" />
        </span>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default AssistantMessages;

const MessageBubble = ({
  isUser,
  isLast,
  content,
  msgId,
  file,
}: {
  isUser: boolean;
  isLast: boolean;
  content: string;
  msgId: string;
  file?: File | null;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const editMessage = useMessagesStore((state) => state.editMessage);
  const addMessage = useMessagesStore((state) => state.addMessage);
  const messages = useMessagesStore((state) => state.messages);
  const sendEditMessageToBackend = useMessagesStore(
    (state) => state.sendEditMessageToBackend
  );
  const isImage = file?.type?.startsWith("image/");

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      const cursor = textAreaRef.current;
      cursor.focus();
      cursor.selectionStart = cursor.selectionEnd = cursor.value.length;
    }
  }, [isEditing]);

  const handleSend = async () => {
    if (!newContent.trim()) return;

    editMessage(msgId, newContent.trim());

    setIsEditing(false);

    console.log(newContent);

    const response = await sendEditMessageToBackend(
      msgId,
      newContent,
      messages
    );

    console.log(response);

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

  const handleCancel = () => {
    setIsEditing(false);
    setNewContent(content);
  };

  useTextAreaHeightResize(textAreaRef, newContent, isEditing);
  return (
    <div
      className={clsx(
        "max-w-[90%] flex flex-col justify-center gap-3",
        !isUser && "justify-center"
      )}
    >
      {isEditing ? (
        <>
          {file &&
            (isImage ? (
              <div className="flex justify-end">
                <ImageThumbPreview file={file} isChatArea />
              </div>
            ) : (
              <div className="flex justify-end">
                <FileThumbPreview file={file} isChatArea />
              </div>
            ))}
          <div className="relative max-sm:w-full">
            <textarea
              ref={textAreaRef}
              value={newContent}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!newContent.trim()) return;
                  handleSend();
                }
              }}
              onChange={(e) => setNewContent(e.target.value)}
              className={clsx(
                "bg-neutral-800 border border-neutral-600 rounded-2xl resize-none outline-none py-3 px-4 pb-16 overflow-hidden transition-colors duration-300 w-[500px]",
                "hover:border-neutral-500",
                "focus:border-neutral-500",
                "max-lg:w-[600px]",
                "max-sm:w-full"
              )}
            />
            <EditTextAreaActionButtons
              value={newContent}
              handleSend={handleSend}
              handleCancel={handleCancel}
            />
          </div>
        </>
      ) : (
        <>
          {file &&
            (isImage ? (
              <div className="flex justify-end">
                <ImageThumbPreview file={file} isChatArea />
              </div>
            ) : (
              <div className="flex justify-end">
                <FileThumbPreview file={file} isChatArea />
              </div>
            ))}

          {content && (
            <div
              className={clsx(
                " py-2 leading-7 rounded-xl break-words whitespace-pre-wrap",
                isUser ? "bg-neutral-700 text-white px-4" : "text-white px-2 ",
                !file
                  ? "rounded-xl mt-2"
                  : "rounded-b-2xl rounded-tl-2xl rounded-tr-sm -mt-1 px-5",
                file && content.length < 50 && "max-w-fit md:self-end",
                file && content.length < 20 && "max-sm:self-end"
              )}
            >
              {content}
            </div>
          )}
        </>
      )}
      <MessageActionButtons
        content={content}
        isLast={isLast}
        isUser={isUser}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />
    </div>
  );
};

const UserAvatar = ({ src }: { src: string }) => (
  <div className="flex-shrink-0 size-8 object-contain pointer-events-none">
    <img
      src={src}
      alt=""
      className="w-full h-full object-contain rounded-full"
    />
  </div>
);

const AssistantAvatar = () => (
  <div className="flex-shrink-0">
    <AssistantLogo isMessage />
  </div>
);

const MessageRow = ({
  msg,
  isLast,
}: {
  msg: { role: string; content: string; id: string; file?: File | null };
  isLast: boolean;
}) => {
  const isAssistant = msg.role === "assistant";
  const isUser = msg.role === "user";
  const user = useUserStore((state) => state.user);

  return (
    <div
      className={clsx(
        "flex gap-3 w-full group/actionButtons",
        isAssistant
          ? "justify-start flex-row"
          : "justify-start flex-row-reverse"
      )}
    >
      {isAssistant ? (
        <AssistantAvatar />
      ) : (
        user?.profilePic && <UserAvatar src={user.profilePic} />
      )}

      <MessageBubble
        isUser={isUser}
        isLast={isLast}
        content={msg.content}
        msgId={msg.id}
        file={msg.file}
      />
    </div>
  );
};

const MessageActionButtons = ({
  content,
  isUser,
  isLast,
  setIsEditing,
  isEditing,
}: {
  content: string;
  isLast: boolean;
  isUser: boolean;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
}) => {
  const [copied, setCopied] = useState(false);
  const setSendEmail = useEmailAssistantStore((state) => state.setSendEmail);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied!", {
        duration: 2000,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = () => {
    if (!user) {
      return toast(
        <div className="flex items-center gap-2 ml-2">
          <span>Sign-in required to access this feature</span>
        </div>,
        {
          icon: <ShieldAlert className="text-red-500" />,
          action: (
            <Button
              onClick={() => navigate("/signin")}
              className="w-32 text-sm h-9 ml-auto"
            >
              Sign in
            </Button>
          ),
        }
      );
    }

    setSendEmail(true);
  };
  return (
    <div
      className={clsx(
        "flex items-center w-full",
        isLast && "mb-10",
        isUser ? "gap-4 justify-end" : "gap-6 ml-4"
      )}
    >
      {!isUser ? (
        <AssistantActionButtons
          copied={copied}
          handleCopy={() => handleCopy(content)}
          handleSendEmail={handleSendEmail}
        />
      ) : (
        <>
          {!isEditing && (
            <UserActionButtons
              copied={copied}
              handleCopy={() => handleCopy(content)}
              setIsEditing={setIsEditing}
            />
          )}
        </>
      )}
    </div>
  );
};

const Tooltip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span
      className={clsx(
        "absolute text-white whitespace-nowrap top-8 -right-9 text-xs bg-[#0d0d0d] border border-neutral-600 py-1 px-2 rounded-lg pointer-events-none opacity-0 transition-all duration-300",
        "group-hover/tooltip:opacity-100",
        className
      )}
    >
      {text}
    </span>
  );
};

type UserActionButtonsProps = {
  handleCopy: () => void;
  copied: boolean;
  setIsEditing?: (val: boolean) => void;
};
const UserActionButtons = ({
  handleCopy,
  copied,
  setIsEditing,
}: UserActionButtonsProps) => {
  return (
    <>
      {/* // User Copy Button */}
      <button
        disabled={copied}
        onClick={handleCopy}
        className={clsx(
          "opacity-0 flex items-center gap-2 text-sm group/tooltip relative",
          "transition-colors duration-300 cursor-pointer",
          "hover:text-cyan-400",
          "max-lg:opacity-100",
          "group-hover/actionButtons:opacity-100 group-hover/actionButtons:transition-opacity group-hover/actionButtons:duration-300"
        )}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        <Tooltip text="Copy" className="!-right-4" />
      </button>

      {/* User Edit Button */}
      <button
        onClick={() => setIsEditing?.(true)}
        className={clsx(
          "opacity-0 flex items-center gap-2 text-sm group/tooltip relative",
          "transition-colors duration-300 cursor-pointer",
          "hover:text-cyan-400",
          "max-lg:opacity-100",
          "group-hover/actionButtons:opacity-100 group-hover/actionButtons:transition-opacity group-hover/actionButtons:duration-300"
        )}
      >
        <Pencil size={18} />
        <Tooltip text="Edit message" />
      </button>
    </>
  );
};

type AssistantActionButtonsProps = {
  handleCopy: () => void;
  copied: boolean;
  handleSendEmail: () => void;
};
const AssistantActionButtons = ({
  handleCopy,
  copied,
  handleSendEmail,
}: AssistantActionButtonsProps) => {
  return (
    <>
      {/* Assistant Copy Button */}
      <button
        disabled={copied}
        onClick={handleCopy}
        className={clsx(
          "flex items-center gap-2 text-sm",
          "transition-all duration-300 cursor-pointer",
          "hover:text-cyan-400"
        )}
      >
        {copied ? <Check size={20} /> : <Copy size={20} />} Copy
      </button>

      {/* Assistant Send Email Button */}
      <button
        onClick={handleSendEmail}
        className={clsx(
          "flex items-center gap-2 text-sm ",
          "transition-all duration-300 cursor-pointer",
          "hover:text-cyan-400"
        )}
      >
        <Mail size={20} /> Use as Email
      </button>
    </>
  );
};

type EditTextAreaActionButtonsProps = {
  value: string;
  handleSend: () => void;
  handleCancel: () => void;
};
const EditTextAreaActionButtons = ({
  value,
  handleSend,
  handleCancel,
}: EditTextAreaActionButtonsProps) => {
  return (
    <div className="absolute right-3 bottom-4 flex items-center justify-start gap-3 flex-row-reverse w-full">
      <Button
        variant="secondary"
        onClick={handleSend}
        className={clsx(
          "w-16 to-indigo-500 from-cyan-500 h-9 rounded-full text-sm font-light p-0 flex items-center justify-center cursor-pointer transition-all duration-300 ",
          " hover:opacity-85",
          value?.length === 0 && "pointer-events-none opacity-50"
        )}
        disabled={value?.length === 0}
      >
        Send
      </Button>

      <Button
        onClick={handleCancel}
        className={clsx(
          "w-16 to-indigo-500 from-cyan-500 h-9 rounded-full text-sm font-light p-0 flex items-center justify-center cursor-pointer transition-all duration-300 "
        )}
      >
        Cancel
      </Button>
    </div>
  );
};
