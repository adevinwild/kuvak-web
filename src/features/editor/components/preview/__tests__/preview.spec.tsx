import { act, render, screen } from "@testing-library/react";
import ScreenshotPreview from "../index";
import { readFileSync } from "fs";

function localFileToBlob() {
  const placeholder = readFileSync(__dirname + "/placeholder.png");
  return new Blob([placeholder], { type: "image/png" });
}

const imageUploaded = localFileToBlob();

jest.mock("../../../stores/upload-store", () => {
  return {
    useUploadStore: () => ({
      imageUploaded,
      setImage: jest.fn(),
      reset: jest.fn(),
    }),
  };
});

function setupTests() {
  // Mocking the useUploadStore

  // Mock the `scrollIntoView` method
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
}

describe("ScreenshotPreview", () => {
  beforeAll(() => {
    setupTests();
  });

  it("ScreenshotPreview - should render without issues", () => {
    act(() => {
      const { asFragment } = render(<ScreenshotPreview />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("ScreenshotPreview - should render the container", () => {
    act(() => {
      render(<ScreenshotPreview />);
    });

    const container = screen.getByTestId("screenshot-preview");
    expect(container).toBeInTheDocument();
  });
});
