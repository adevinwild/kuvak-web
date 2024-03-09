import { renderHook } from "@testing-library/react";

import { useSettingsStore } from "../../../stores/settings-store";
import { useUploadStore } from "../../../stores/upload-store";

import useImageSize from "../use-image-size";
import useResetScaleOnUpload from "../use-reset-scale-on-upload";

jest.mock("../../../stores/settings-store");
jest.mock("../../../stores/upload-store");
jest.mock("../use-image-size");

describe("useResetScaleOnUpload", () => {
  it("useResetScaleOnUpload - should call setScale with computed scale when image is uploaded and size is available", () => {
    const mockSetScale = jest.fn();
    const mockImage = new File([""], "test.png", { type: "image/png" });

    const mockedUseSettingsStore = useSettingsStore as unknown as jest.Mock<
      ReturnType<typeof useSettingsStore>
    >;
    const mockedUseUploadStore = useUploadStore as unknown as jest.Mock<
      ReturnType<typeof useUploadStore>
    >;
    const mockedUseImageSize = useImageSize as jest.Mock<
      ReturnType<typeof useImageSize>
    >;

    mockedUseImageSize.mockReturnValue({
      size: { width: 100, height: 100 },
      error: null,
    });
    mockedUseUploadStore.mockReturnValue({ imageUploaded: mockImage });
    mockedUseSettingsStore.mockReturnValue({ setScale: mockSetScale });

    renderHook(() => useResetScaleOnUpload());

    expect(mockSetScale).toHaveBeenCalledWith(4);
  });

  it("useResetScaleOnUpload - should not call setScale when image is not uploaded", () => {
    const mockSetScale = jest.fn();

    const mockedUseSettingsStore = useSettingsStore as unknown as jest.Mock<
      ReturnType<typeof useSettingsStore>
    >;
    const mockedUseUploadStore = useUploadStore as unknown as jest.Mock<
      ReturnType<typeof useUploadStore>
    >;
    const mockedUseImageSize = useImageSize as jest.Mock<
      ReturnType<typeof useImageSize>
    >;

    mockedUseImageSize.mockReturnValue({ size: null, error: null });
    mockedUseUploadStore.mockReturnValue({ imageUploaded: null });
    mockedUseSettingsStore.mockReturnValue({ setScale: mockSetScale });

    renderHook(() => useResetScaleOnUpload());

    expect(mockSetScale).not.toHaveBeenCalled();
  });

  it("useResetScaleOnUpload - should not call setScale when size is not available", () => {
    const mockSetScale = jest.fn();
    const mockImage = new File([""], "test.png", { type: "image/png" });

    const mockedUseSettingsStore = useSettingsStore as unknown as jest.Mock<
      ReturnType<typeof useSettingsStore>
    >;
    const mockedUseUploadStore = useUploadStore as unknown as jest.Mock<
      ReturnType<typeof useUploadStore>
    >;
    const mockedUseImageSize = useImageSize as jest.Mock<
      ReturnType<typeof useImageSize>
    >;

    mockedUseImageSize.mockReturnValue({ size: null, error: null });
    mockedUseUploadStore.mockReturnValue({ imageUploaded: mockImage });
    mockedUseSettingsStore.mockReturnValue({ setScale: mockSetScale });

    renderHook(() => useResetScaleOnUpload());

    expect(mockSetScale).not.toHaveBeenCalled();
  });
});
