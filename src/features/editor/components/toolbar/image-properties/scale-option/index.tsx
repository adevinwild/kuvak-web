import { Slider } from '../../../../../../shared/components/ui/slider'
import { useSettingsStore } from '../../../../stores/settings-store'

export default function ScaleOption() {
  const { scale, setScale } = useSettingsStore()
  return (
    <div id="scale-option" className="grid gap-1.5 w-full">
      <span className="text-sm font-medium text-gray-800">Scale</span>
      <div className="h-6 flex items-center justify-center">
        <Slider
          data-testid="scale-option"
          value={[scale]}
          onValueChange={(v) => setScale(v[0])}
          min={0.2}
          max={4}
          step={0.1}
          className="min-w-20"
        />
      </div>
      <small role="status" className="text-xs text-gray-500 font-light">
        x{scale.toFixed(1)}
      </small>
    </div>
  )
}
