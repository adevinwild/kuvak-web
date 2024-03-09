import FileUpload from "../../../../shared/components/ui/file-upload";
import { useEffect } from "react";
import { useUploadStore } from "../../stores/upload-store";

export default function EditorUpload() {
  const { setImage } = useUploadStore();

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setImage(file);
  };

  useEffect(
    function listenForImagePaste() {
      window.document.addEventListener("paste", (e: ClipboardEvent) => {
        if (!e.clipboardData?.files.length) return;

        const file = e.clipboardData.files[0];
        if (!file) return;
        if (file.type !== "image/png" && file.type !== "image/jpg") return;

        setImage(file);
      });
    },
    [setImage]
  );

  return (
    <div className="grow items-stretch hover:ring-emerald-400 transition-shadow flex justify-center w-full max-w-7xl overflow-hidden rounded-3xl ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900">
      <FileUpload
        data-testid="file-upload"
        accept={["image/jpg", "image/png"]}
        onUpload={handleFileUpload}
      />
    </div>
  );
}
