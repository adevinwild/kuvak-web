import { renderHook } from "@testing-library/react";
import useFileAspectRatio from "../use-aspect-ratio";
import useImageSize from "../use-image-size";

jest.mock("../use-image-size");

describe("useFileAspectRatio", () => {
  it("useFileAspectRatio - returns correct aspect ratio when image is loaded", async () => {
    const mockedUseImageSize = useImageSize as jest.Mock;
    mockedUseImageSize.mockReturnValue({
      size: { width: 1920, height: 1080 },
      error: null,
    });

    const mockImage = new File(["test"], "test.png", { type: "image/png" });

    const { result } = renderHook(() => useFileAspectRatio(mockImage));

    expect(result.current.aspectRatio).toBe("16/9");
    expect(result.current.error).toBeNull();
  });
});
