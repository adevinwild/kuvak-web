import { cn } from "../../../../lib/utils";
import { CSSProperties, useCallback } from "react";
import { useExportStore } from "../../stores/export-store";
import { useSettingsStore } from "../../stores/settings-store";
import { useUploadStore } from "../../stores/upload-store";
import useFileAspectRatio from "./use-aspect-ratio";
import useResetScaleOnUpload from "./use-reset-scale-on-upload";
import useTheme from "./use-theme";

export default function ScreenshotPreview() {
  const { setContainerToExportRef } = useExportStore();

  const containerRef = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return null;

      const isInView = node.getBoundingClientRect().top < window.innerHeight;
      if (isInView) {
        node.scrollIntoView({ behavior: "smooth" });
      }

      setContainerToExportRef({ current: node });
      return node;
    },
    [setContainerToExportRef]
  );

  const { imageUploaded } = useUploadStore();
  const { scale, roundness, padding } = useSettingsStore();

  const { aspectRatio } = useFileAspectRatio(imageUploaded);

  const theme = useTheme();

  const imageStyle: CSSProperties = {
    objectFit: "cover",
    borderRadius: `${roundness}px`,
    aspectRatio: aspectRatio ? aspectRatio : "unset",
  };

  const containerStyle: CSSProperties = {
    borderRadius: `${roundness + padding}px`,
    padding: `${padding}px`,
    transform: "scale(" + scale + ")",
  };

  useResetScaleOnUpload();

  if (!imageUploaded) {
    return null;
  }

  const imageUrl = URL.createObjectURL(imageUploaded);

  return (
    <div
      ref={containerRef}
      className={cn(
        "rounded-lg grow select-none ring-1 flex items-center justify-center overflow-hidden w-full scale-100 aspect-video bg-white",
        theme.container
      )}
      data-testid="screenshot-preview"
    >
      <div
        className={cn(
          "w-max h-max overflow-hidden bg-white ring-1",
          theme.imageContainer
        )}
        style={containerStyle}
        data-testid="screenshot-preview-image-container"
      >
        <img
          src={imageUrl}
          alt="Uploaded image"
          role="img"
          className={cn(
            "rounded-lg select-none pointer-events-none shrink-0",
            theme.image
          )}
          data-testid="screenshot-preview-image"
          style={imageStyle}
        />
      </div>
    </div>
  );
}
