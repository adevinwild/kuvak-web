import { useEffect } from 'react'
import { useSettingsStore } from '../../stores/settings-store'
import { useUploadStore } from '../../stores/upload-store'
import useImageSize from './use-image-size'

export default function useResetScaleOnUpload() {
  const { imageUploaded } = useUploadStore()
  const { setScale } = useSettingsStore()

  const { size } = useImageSize(imageUploaded)

  useEffect(
    function resetImageScale() {
      if (!imageUploaded || !size) return

      const computedScale = Math.min(
        window.innerWidth / size.width,
        window.innerHeight / size.height,
      )

      if (computedScale > 4) {
        return setScale(4)
      }

      setScale(computedScale)
    },
    [imageUploaded, setScale, size],
  )
}
