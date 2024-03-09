
export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-emerald-50/80 backdrop-blur-lg z-50 flex items-center justify-center">
      <span className="border border-transparent border-t-emerald-400 rounded-full size-12 aspect-square animate-spin" />
    </div>
  );
}
