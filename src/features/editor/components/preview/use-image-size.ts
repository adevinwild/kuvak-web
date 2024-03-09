import { useEffect, useState } from 'react'

type BufferResult = ArrayBuffer | string | null
export default function useImageSize(file: File | null) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  )
  const [bufferResult, setBufferResult] = useState<BufferResult>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!file) return

    const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
        // Check if file is a valid image
        if (!file.type.match('image')) {
          return reject('NOT_IMAGE')
        }

        const reader = new FileReader()

        reader.addEventListener('load', (e) => {
          resolve(e.target?.result ?? null)
        })

        reader.addEventListener('error', (e) => {
          if (e instanceof Error) {
            return reject(e.message)
          }
        })

        const fileAsBlob = new Blob([file])
        reader.readAsDataURL(fileAsBlob)
      })
    }

    readFile(file)
      .then((result) => {
        setBufferResult(result)
      })
      .catch((err) => {
        setError(err)
      })
  }, [file])

  useEffect(() => {
    if (!bufferResult) return
    const getImageSize = (buffer: ArrayBuffer | string) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = buffer as string
        img.addEventListener('load', () => {
          resolve({ width: img.width, height: img.height })
        })
        img.addEventListener('error', (e) => {
          reject(e)
        })
      })
    }

    getImageSize(bufferResult)
      .then((result) => {
        setSize(result as { width: number; height: number })
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [bufferResult])

  return {
    size,
    error,
  }
}
