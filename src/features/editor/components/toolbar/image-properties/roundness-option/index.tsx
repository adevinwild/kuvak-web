import { Slider } from '../../../../../../shared/components/ui/slider'
import { useSettingsStore } from '../../../../stores/settings-store'

export default function RoundnessOption() {
  const { roundness, setRoundness } = useSettingsStore()
  return (
    <div id="roundness-option" className="grid gap-1.5 w-full">
      <span className="text-sm font-medium text-gray-800">Roundness</span>
      <div className="h-6 flex items-center justify-center">
        <Slider
          data-testid="roundness-option"
          value={[roundness]}
          onValueChange={(v) => setRoundness(v[0])}
          min={0}
          max={100}
          step={4}
          className="min-w-20"
        />
      </div>
      <small role="status" className="text-xs text-gray-500 font-light">
        {roundness}px
      </small>
    </div>
  )
}
