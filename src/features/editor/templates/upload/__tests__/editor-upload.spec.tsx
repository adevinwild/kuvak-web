import { render, screen, fireEvent } from "@testing-library/react";
import { useUploadStore } from "../../../stores/upload-store";
import EditorUpload from "../index";
import userEvent from "@testing-library/user-event";

jest.mock("../../../stores/upload-store");

describe("EditorUpload", () => {
  it("EditorUpload - calls setImage with uploaded file", () => {
    const mockSetImage = jest.fn();
    const mockedUseUploadStore = useUploadStore as jest.MockedFunction<
      typeof useUploadStore
    >;
    mockedUseUploadStore.mockReturnValue({ setImage: mockSetImage });

    render(<EditorUpload />);
    const fileUpload = screen
      .getByTestId("file-upload")
      .querySelector("input")!;
    const file = new File([""], "test.png", { type: "image/png" });

    fireEvent.change(fileUpload, { target: { files: [file] } });

    expect(mockSetImage).toHaveBeenCalledWith(file);
  });

  it("EditorUpload - calls setImage with pasted image file", () => {
    const mockSetImage = jest.fn();
    const mockedUseUploadStore = useUploadStore as jest.MockedFunction<
      typeof useUploadStore
    >;
    mockedUseUploadStore.mockReturnValue({ setImage: mockSetImage });

    render(<EditorUpload />);

    const user = userEvent.setup();

    const file = new File([""], "test.png", { type: "image/png" });
    const files: Partial<FileList> = [file];

    user.paste({
      files: files,
    } as DataTransfer);

    expect(mockSetImage).toHaveBeenCalledWith(file);
  });
});
