import ScreenshotPreview from '../../components/preview'
import Toolbar from '../../components/toolbar'

export default function EditorOverview() {
  return (
    <div className="relative flex-col grow items-stretch flex gap-4 justify-center w-full max-w-7xl  rounded-3xl">
      <Toolbar />
      <ScreenshotPreview />
    </div>
  )
}
