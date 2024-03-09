import { useUploadStore } from './features/editor/stores/upload-store'
import EditorOverview from './features/editor/templates/overview'
import EditorUpload from './features/editor/templates/upload'

export default function App() {
  const { imageUploaded } = useUploadStore()

  return (
    <main className="flex min-h-dvh w-dvw flex-col gap-y-10 pb-10 pt-4 items-center justify-between">
      <div className="text-center space-y-2">
        <h1 className="text-6xl font-logo dark:text-white">
          <span className="text-emerald-400">K</span>UVAK
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          A tiny screenshot maker
        </p>
        <a
          href="https://github.com/adevinwild"
          className="text-xs shadow-border text-emerald-500"
        >
          by adevinwild
        </a>
      </div>
      {imageUploaded ? <EditorOverview /> : <EditorUpload />}
    </main>
  )
}
