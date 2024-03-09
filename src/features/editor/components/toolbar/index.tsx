import { Button } from '../../../../shared/components/ui/button'
import { CommandIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'
import { useExportStore } from '../../stores/export-store'
import ErrorOverlay from './error-overlay'
import ImagePropertiesOptions from './image-properties'
import LoadingOverlay from './loading-overlay'
import SuccessOverlay from './success-overlay'
import ThemeOptions from './theme-options'
import useDetectDevice from './use-detect-device'
import useExportNode from './use-export-node'

export default function Toolbar() {
  const { containerToExportRef } = useExportStore()
  const { onExport, status } = useExportNode(containerToExportRef)

  const device = useDetectDevice()
  const hotkeys = device === 'mac' ? 'meta+e' : 'ctrl+e'
  useHotkeys(hotkeys, () => {
    if (status === 'success' || status === 'loading') return
    onExport()
  })

  return (
    <>
      {status === 'loading' && createPortal(<LoadingOverlay />, document.body)}
      {status === 'error' && createPortal(<ErrorOverlay />, document.body)}
      {status === 'success' && createPortal(<SuccessOverlay />, document.body)}

      <div
        data-testid="toolbar"
        id="toolbar"
        className="z-10  rounded-lg ring-1 ring-gray-200 h-24 p-4 gap-4 flex items-center justify-between right-0 top-0 bg-white dark:bg-gray-900"
      >
        <ThemeOptions />
        <ImagePropertiesOptions />
        <div className="w-px h-10 bg-gray-200" />
        <Button
          size="sm"
          className="bg-emerald-400 hover:bg-emerald-500"
          onClick={onExport}
          data-testid="export-button"
          id="export-button"
        >
          <span>Export</span>
          <div className="flex items-center ml-2 tracking-tighter">
            {device === 'mac' ? (
              <CommandIcon className="size-4" />
            ) : (
              <span>CTRL</span>
            )}
            <span>+ E</span>
          </div>
        </Button>
      </div>
    </>
  )
}
