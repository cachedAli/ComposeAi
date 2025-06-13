import Button from "@/components/ui/Button";
import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const FileUploader = () => {
  const { setFile } = useEmailAssistantStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
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
