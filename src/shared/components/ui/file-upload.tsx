import { cn } from '../../../lib/utils'
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  BaseHTMLAttributes,
} from 'react'

const defaultText = (
  <div className="text-sm flex flex-col group items-center">
    <span className="text-gray-600">Drop or paste your image here, or</span>
    <span className="text-emerald-600 hover:underline">
      browse your computer
    </span>
  </div>
)

type FileUploadProps = {
  onUpload?: (_files: File[]) => void
  accept: string[]
  error?: string
  className?: string
  multiple?: boolean
  text?: React.ReactElement | string
} & BaseHTMLAttributes<HTMLDivElement>

export default function FileUpload({
  onUpload,
  accept,
  error,
  className,
  text = defaultText,
  multiple = false,
  ...props
}: FileUploadProps) {
  const [isUploadError, setUploadError] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (!fileList) return

    onUpload?.(Array.from(fileList))
  }

  const onFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    setUploadError(false)
    const files: File[] = []

    if (!e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        if (accept.indexOf(e.dataTransfer.files[i].type) > -1) {
          files.push(e.dataTransfer.files[i])
        }
      }
      return
    }

    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === 'file') {
        const file = e.dataTransfer.items[i].getAsFile()
        if (file && accept.indexOf(file.type) > -1) {
          files.push(file)
        }
      }
    }

    if (!files.length) {
      setUploadError(true)
      return
    }

    onUpload?.(files)
  }

  return (
    <div
      onClick={() => inputRef?.current?.click()}
      onDrop={onFileDrop}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        'flex select-none cursor-pointer items-center justify-center w-full',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center">{text}</div>

      {isUploadError && (
        <small className="text-rose-600">
          {error || 'Invalid file type. Please upload a valid file type.'}
        </small>
      )}

      <input
        ref={inputRef}
        accept={accept.join(', ')}
        multiple={multiple}
        type="file"
        onChange={onFileUpload}
        className="hidden"
      />
    </div>
  )
}
