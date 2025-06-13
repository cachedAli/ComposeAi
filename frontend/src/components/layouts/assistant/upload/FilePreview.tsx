import { useEmailAssistantStore } from "@/store/useEmailAssistantStore";
import { FileThumbPreview, ImageThumbPreview } from "./FileThumbnails";

const FilePreview = () => {
  const { file } = useEmailAssistantStore();

  return (
    <div className="absolute top-3 left-3 ">
      {file && !file.type.startsWith("image/") ? (
        <FileThumbPreview file={file} />
      ) : (
        <ImageThumbPreview file={file} />
      )}
    </div>
  );
};

export default FilePreview;
