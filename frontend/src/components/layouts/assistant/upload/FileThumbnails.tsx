import clsx from "clsx";
import { File, FileArchive, FileText, X } from "lucide-react";

import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { cn } from "@/libs/utils";

type ThumbPreviewProps = {
  file: File | null;
  isChatArea?: boolean;
};
const CancelButton = ({ className }: { className?: string }) => {
  const { setFile } = useEmailAssistantStore();

  const handleRemoveFile = () => {
    setFile(null);
  };
  return (
    <div
      onClick={handleRemoveFile}
      className={cn(
        "absolute flex items-center justify-center rounded-full -right-1 -top-1 size-5 bg-white text-neutral-800 cursor-pointer transition-opacity duration-300",
        "hover:opacity-80",
        className
      )}
    >
      <X size={15} />
    </div>
  );
};

export const FileThumbPreview = ({ file, isChatArea }: ThumbPreviewProps) => {
  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") return <FileText size={20} />;
    if (file.type === "application/msword") return <FileText size={20} />;
    if (file.type === "application/x-zip-compressed")
      return <FileArchive size={20} />;
    return <File size={20} />;
  };
  return (
    <div className="relative bg-neutral-800 border border-neutral-500 p-2 rounded-xl w-80">
      {/* Cancel Button */}
      {!isChatArea && <CancelButton />}

      {/* File */}
      <div key={file?.name} className="flex items-center gap-2">
        {/* Icon */}
        <span className="bg-gradient-to-b from-cyan-500 to-indigo-500 size-9 rounded-lg flex items-center justify-center">
          {getFileIcon(file as File)}
        </span>

        {/* Name and Type */}
        <div className="flex flex-col justify-center">
          <h2 className="text-sm font-semibold truncate max-w-80">
            {file?.name}
          </h2>
          <h2 className="text-sm">
            {file?.name.split(".").pop()?.toUpperCase()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export const ImageThumbPreview = ({
  file,
  isChatArea = false,
}: ThumbPreviewProps) => {
  return (
    file && (
      <div
        key={file?.name}
        className={clsx(
          "relative bg-neutral-700 rounded-xl p-1.5 flex items-center justify-center",
          isChatArea ? "size-56" : "size-14"
        )}
      >
        {!isChatArea && <CancelButton className="size-4 top-0.5 right-0.5" />}
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    )
  );
};
