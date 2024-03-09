import { renderHook, waitFor } from "@testing-library/react";
import useFileAspectRatio from "../use-aspect-ratio";

describe("useFileAspectRatio", () => {
  it("useFileAspectRatio - returns error when something went wrong", async () => {
    const textFile = new File([""], "test.txt", { type: "text/plain" });

    const { result } = renderHook(() => useFileAspectRatio(textFile));

    expect(result.current.aspectRatio).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.aspectRatio).toBeNull();
      expect(result.current.error).not.toBeNull();
    });
  });
});
