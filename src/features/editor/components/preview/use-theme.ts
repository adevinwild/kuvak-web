import { useSettingsStore } from "../../stores/settings-store";

export default function useTheme() {
  const { theme } = useSettingsStore();

  const themeStyle: Record<
    typeof theme,
    {
      container: string;
      imageContainer: string;
      image: string;
    }
  > = {
    light: {
      container:
        "bg-gradient-to-b from-white to-gray-100 from-90% ring-gray-200",
      imageContainer: "bg-white ring-gray-200 shadow-xl",
      image: "bg-white",
    },
    dark: {
      container:
        "bg-gradient-to-br from-gray-800 via-black/85 to-black ring-gray-800",
      imageContainer: "bg-black/20 ring-gray-600 shadow-xl shadow-black",
      image: "bg-black",
    },
    sunset: {
      container:
        "bg-gradient-to-b from-amber-100 to-orange-300/70 ring-orange-200",
      imageContainer: "bg-white/20 backdrop-blur-sm ring-orange-50",
      image: "bg-white",
    },
    mushroom: {
      container: "bg-gradient-to-b from-sky-100 to-green-300/70 ring-green-200",
      imageContainer: "bg-white/20 ring-white/30 shadow-xl shadow-green-400/20",
      image: "bg-rose-400",
    },
    apollo: {
      container:
        "bg-gradient-to-b from-violet-500 to-violet-400 ring-violet-200/50",
      imageContainer:
        "bg-violet-200/50 ring-violet-400 shadow-xl shadow-violet-200/10",
      image: "bg-emerald-400",
    },
  };

  return themeStyle[theme];
}
