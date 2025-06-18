import clsx from "clsx";
import { File as FileIcon, FileText, X } from "lucide-react";

import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { cn } from "@/libs/utils";

type ThumbPreviewProps = {
  file: File | null;
  isChatArea?: boolean;
};
const CancelButton = ({ className }: { className?: string }) => {
  const setFile = useEmailAssistantStore((state) => state.setFile);

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
    if (file.type === "application/pdf")
      return <FileText size={20} className="max-sm:size-4" />;

    return <FileIcon size={20} />;
  };
  return (
    <div
      className={clsx(
        "relative bg-neutral-800 border border-neutral-500 p-2 rounded-xl w-80",
        "max-sm:w-56"
      )}
    >
      {/* Cancel Button */}
      {!isChatArea && <CancelButton />}

      {/* File */}
      <div key={file?.name} className="flex items-center gap-2">
        {/* Icon */}
        <span
          className={clsx(
            "bg-gradient-to-b from-cyan-500 to-indigo-500 size-9 rounded-lg flex items-center justify-center",
            "max-sm:size-6"
          )}
        >
          {getFileIcon(file as File)}
        </span>

        {/* Name and Type */}
        <div className="flex flex-col justify-center">
          <h2
            className={clsx(
              "text-sm font-semibold truncate max-w-80",
              "max-sm:max-w-44"
            )}
          >
            {file?.name}
          </h2>
          <h2 className="text-sm">
            {file?.name?.split(".").pop()?.toUpperCase()}
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
  if (!file) return null;

  const isUploadedFile = file instanceof File;

  const imageUrl = isUploadedFile
    ? URL.createObjectURL(file)
    : (file as any)?.url;

  return (
    <div
      key={file.name}
      className={clsx(
        "relative bg-neutral-700 rounded-xl p-1.5 flex items-center justify-center",
        isChatArea ? "size-56 max-sm:size-48" : "size-14"
      )}
    >
      {!isChatArea && <CancelButton className="size-4 top-0.5 right-0.5" />}
      <img
        src={imageUrl}
        alt={file.name}
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </div>
  );
};
