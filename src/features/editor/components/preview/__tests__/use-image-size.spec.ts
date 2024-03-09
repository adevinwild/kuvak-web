import { renderHook, waitFor } from '@testing-library/react'
import useImageSize from '../use-image-size'

const mockImage = new File(['mock'], 'mock-image.png', { type: 'image/png' })

describe('useImageSize', () => {
  it('useImageSize - should return size and error correctly', async () => {
    // Render the hook with the provided file
    window.Image.prototype.addEventListener = jest.fn((event, cb) => {
      if (event === 'load') {
        cb()
      }
    })

    const { result } = renderHook(() => useImageSize(mockImage))

    // Initial state should be null
    expect(result.current.size).toBeNull()
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      // Expect the size to be set based on the mock image dimensions
      expect(result.current.size).toEqual({ width: 0, height: 0 })

      // Ensure no error is set
      expect(result.current.error).toBeNull()
    })
  })

  it('useImageSize - should handle error when reading invalid file', async () => {
    const invalidFileMock = new File([''], 'invalid-image.txt', {
      type: 'text/plain',
    })

    // Render the hook with the invalid file
    const { result } = renderHook(() => useImageSize(invalidFileMock))

    // Initial state should be null
    expect(result.current.size).toBeNull()
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      // Expect an error to be set
      expect(result.current.size).toBeNull()
      expect(result.current.error).toBeTruthy()
    })
  })

  it('useImageSize - should handle null file', () => {
    // Render the hook with null file
    const { result } = renderHook(() => useImageSize(null))

    // Expect the initial state with null size and error
    expect(result.current.size).toBeNull()
    expect(result.current.error).toBeNull()
  })
})
