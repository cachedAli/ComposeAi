import Button from "@/components/ui/Button";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const FileUploader = () => {
  const setFile = useEmailAssistantStore((state) => state.setFile);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 10) {
          toast.error("File size exceeds 10 MB limit.");
          return;
        }
        setFile(file);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "text/plain": [],
    },
  });

  return (
    <div {...getRootProps()} className="px-6">
      <Button
        className={clsx(
          "bg-neutral-800 flex items-center justify-center border border-neutral-500 text-white size-9 rounded-full p-0",
          "hover:border-transparent"
        )}
      >
        <input {...getInputProps()} />
        <Plus size={20} />
      </Button>
    </div>
  );
};
