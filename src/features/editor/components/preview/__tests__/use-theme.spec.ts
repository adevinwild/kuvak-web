import { renderHook } from '@testing-library/react'
import { useSettingsStore } from '../../../stores/settings-store'
import useTheme from '../use-theme'

jest.mock('../../../stores/settings-store')

describe('useTheme', () => {
  it('useTheme - should return light theme style when theme is light', () => {
    const mockedUseSettingsStore = useSettingsStore as jest.MockedFunction<
      typeof useSettingsStore
    >
    mockedUseSettingsStore.mockReturnValue({ theme: 'light' })

    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual({
      container:
        'bg-gradient-to-b from-white to-gray-100 from-90% ring-gray-200',
      imageContainer: 'bg-white ring-gray-200 shadow-xl',
      image: 'bg-white',
    })
  })

  it('useTheme - should return dark theme style when theme is dark', () => {
    const mockedUseSettingsStore = useSettingsStore as jest.MockedFunction<
      typeof useSettingsStore
    >
    mockedUseSettingsStore.mockReturnValue({ theme: 'dark' })

    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual({
      container:
        'bg-gradient-to-br from-gray-800 via-black/85 to-black ring-gray-800',
      imageContainer: 'bg-black/20 ring-gray-600 shadow-xl shadow-black',
      image: 'bg-black',
    })
  })

  it('useTheme - should return sunset theme style when theme is sunset', () => {
    const mockedUseSettingsStore = useSettingsStore as jest.MockedFunction<
      typeof useSettingsStore
    >
    mockedUseSettingsStore.mockReturnValue({ theme: 'sunset' })

    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual({
      container:
        'bg-gradient-to-b from-amber-100 to-orange-300/70 ring-orange-200',
      imageContainer: 'bg-white/20 backdrop-blur-sm ring-orange-50',
      image: 'bg-white',
    })
  })

  it('useTheme - should return mushroom theme style when theme is mushroom', () => {
    const mockedUseSettingsStore = useSettingsStore as jest.MockedFunction<
      typeof useSettingsStore
    >
    mockedUseSettingsStore.mockReturnValue({ theme: 'mushroom' })

    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual({
      container: 'bg-gradient-to-b from-sky-100 to-green-300/70 ring-green-200',
      imageContainer: 'bg-white/20 ring-white/30 shadow-xl shadow-green-400/20',
      image: 'bg-rose-400',
    })
  })

  it('useTheme - should return apollo theme style when theme is apollo', () => {
    const mockedUseSettingsStore = useSettingsStore as jest.MockedFunction<
      typeof useSettingsStore
    >
    mockedUseSettingsStore.mockReturnValue({ theme: 'apollo' })

    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual({
      container:
        'bg-gradient-to-b from-violet-500 to-violet-400 ring-violet-200/50',
      imageContainer:
        'bg-violet-200/50 ring-violet-400 shadow-xl shadow-violet-200/10',
      image: 'bg-emerald-400',
    })
  })
})
