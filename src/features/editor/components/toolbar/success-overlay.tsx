import { CheckIcon } from "lucide-react";

export default function SuccessOverlay() {
  return (
    <div className="fixed inset-0 bg-emerald-50/80 backdrop-blur-lg z-50 flex items-center justify-center">
      <CheckIcon className="text-emerald-400 size-12" />
    </div>
  );
}
