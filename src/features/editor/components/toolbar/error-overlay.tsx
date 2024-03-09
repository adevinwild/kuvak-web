import { XIcon } from "lucide-react";

export default function ErrorOverlay() {
  return (
    <div
      id="error-overlay"
      role="status"
      className="fixed inset-0 bg-rose-50/80 backdrop-blur-lg  z-50 flex flex-col gap-y-2 items-center justify-center"
    >
      <XIcon className="size-12 text-rose-500" />
      <p className="text-rose-600 text-sm max-w-xs text-center">
        An error occurred while exporting the image, please try again.
      </p>
    </div>
  );
}
