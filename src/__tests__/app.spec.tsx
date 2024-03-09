import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { useUploadStore } from '../features/editor/stores/upload-store'
import App from '../App'

jest.mock('../features/editor/stores/upload-store')

function setupTests() {
  // Mocking the useUploadStore

  // Mock the `scrollIntoView` method
  const scrollIntoViewMock = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
}

describe('App', () => {
  beforeAll(() => {
    setupTests()
  })

  it('renders EditorUpload when imageUploaded is null', () => {
    const mockedUseUploadStore = useUploadStore as jest.MockedFunction<
      typeof useUploadStore
    >
    mockedUseUploadStore.mockReturnValue({ imageUploaded: null })

    render(<App />)

    expect(screen.getByText(/A tiny screenshot maker/i)).toBeInTheDocument()
    expect(screen.getByText(/by adevinwild/i)).toBeInTheDocument()
    expect(screen.getByTestId('file-upload')).toBeInTheDocument()
  })

  it('renders EditorOverview when imageUploaded is not null', () => {
    const mockImage = new File([''], 'test.png', { type: 'image/png' })
    const mockedUseUploadStore = useUploadStore as jest.MockedFunction<
      typeof useUploadStore
    >
    mockedUseUploadStore.mockReturnValue({ imageUploaded: mockImage })

    render(<App />)

    expect(screen.getByText(/A tiny screenshot maker/i)).toBeInTheDocument()
    expect(screen.getByText(/by adevinwild/i)).toBeInTheDocument()
    expect(screen.getByTestId('screenshot-preview')).toBeInTheDocument()
    expect(screen.getByTestId('toolbar')).toBeInTheDocument()
  })
})
