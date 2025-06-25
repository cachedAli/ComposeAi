import clsx from "clsx";
import { Sparkles } from "lucide-react";

const AssistantLogo = ({ isMessage = false }: { isMessage?: boolean }) => {
  return (
    <div
      className={clsx(
        "bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center",
        isMessage ? "size-8" : "size-10 max-sm:size-8"
      )}
    >
      <Sparkles
        className={clsx("text-white", !isMessage && "max-sm:size-[18px]")}
        size={isMessage ? 18 : 20}
      />
    </div>
  );
};

export default AssistantLogo;
