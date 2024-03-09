export default function useDetectDevice(): "mac" | "windows" | "other" {
  if (typeof navigator === "undefined") return "other";

  const platform = window.navigator.platform ?? window.navigator.userAgent;

  const device = platform.toLowerCase().includes("mac")
    ? "mac"
    : platform.includes("Windows")
    ? "windows"
    : "other";

  return device;
}
