import {
  ThemeEnum,
  useSettingsStore,
} from '../../../../../features/editor/stores/settings-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../shared/components/ui/select'

export default function ThemeOptions() {
  const { theme, setTheme } = useSettingsStore()
  return (
    <div className="grid gap-1.5 w-full">
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-24" data-testid="theme-options">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ThemeEnum.Sunset} data-testid={ThemeEnum.Sunset}>
            Sunset
          </SelectItem>
          <SelectItem
            value={ThemeEnum.Mushroom}
            data-testid={ThemeEnum.Mushroom}
          >
            Mushroom
          </SelectItem>
          <SelectItem value={ThemeEnum.Apollo} data-testid={ThemeEnum.Apollo}>
            Apollo
          </SelectItem>
          <SelectItem
            value="divider"
            className="h-px p-0 my-2 w-full bg-gray-200"
          />
          <SelectItem value={ThemeEnum.Light} data-testid={ThemeEnum.Light}>
            Light
          </SelectItem>
          <SelectItem value={ThemeEnum.Dark} data-testid={ThemeEnum.Dark}>
            Dark
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
