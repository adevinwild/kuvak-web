import { RefObject, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { useUploadStore } from "../../stores/upload-store";
import { useSettingsStore } from "../../stores/settings-store";

export default function useExportNode(ref: RefObject<HTMLDivElement> | null) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const resetImageUploaded = useUploadStore((state) => state.reset);
  const { reset } = useSettingsStore();

  const onExport = async () => {
    if (!ref?.current) return;
    try {
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // UI purposes
      const dataUrl = await htmlToImage.toPng(ref.current);
      const link = document.createElement("a");
      link.download = `kuvak-${new Date().toISOString()}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("success");
    } catch (error: unknown) {
      console.error("oops, something went wrong!", error);
      setStatus("error");
    }
  };

  useEffect(
    function resetStatusOnEnd() {
      if (status === "loading") return;

      const timer = setTimeout(() => {
        setStatus("idle");
        resetImageUploaded();
        reset();
      }, 2500);
      return () => clearTimeout(timer);
    },
    [status]
  );

  return {
    onExport,
    status,
  };
}
