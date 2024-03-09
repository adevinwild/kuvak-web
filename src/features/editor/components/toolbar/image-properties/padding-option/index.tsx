import { Slider } from "../../../../../../shared/components/ui/slider";
import { useSettingsStore } from "../../../../stores/settings-store";

export default function PaddingOption() {
  const { padding, setPadding } = useSettingsStore();
  return (
    <div className="grid gap-1.5 w-full">
      <span className="text-sm font-medium text-gray-800">Padding</span>
      <div className="h-6 flex items-center justify-center">
        <Slider
          data-testid="padding-option"
          value={[padding]}
          onValueChange={(v) => setPadding(v[0])}
          min={0}
          max={96}
          step={4}
          className="min-w-20"
        />
      </div>
      <small role="status" className="text-xs text-gray-500 font-light">
        {padding}px
      </small>
    </div>
  );
}
