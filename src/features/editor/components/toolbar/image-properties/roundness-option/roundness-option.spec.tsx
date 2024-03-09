import { render, screen } from "@testing-library/react";
import RoundnessOption from "./";
import userEvent from "@testing-library/user-event";

function setupTests() {
  class MockPointerEvent extends Event {
    button: number;
    ctrlKey: boolean;
    pointerType: string;

    constructor(type: string, props: PointerEventInit) {
      super(type, props);
      this.button = props.button || 0;
      this.ctrlKey = props.ctrlKey || false;
      this.pointerType = props.pointerType || "mouse";
    }
  }

  window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.HTMLElement.prototype.releasePointerCapture = jest.fn();
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();
  window.HTMLElement.prototype.setPointerCapture = jest.fn();
}

describe("RoundnessOption", () => {
  beforeAll(() => {
    setupTests();
  });

  test("RoundnessOption - it render correctly", async () => {
    render(<RoundnessOption />);
    const slider = screen.getByRole("slider");

    expect(slider).toBeInTheDocument();
  });

  test("RoundnessOption - it should have the default value of 8", () => {
    render(<RoundnessOption />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-valuenow", "8");
  });

  test("RoundnessOption - it should update the roundness value", async () => {
    render(<RoundnessOption />);
    const slider = screen.getByRole("slider");
    const status = screen.getByRole("status");

    await userEvent.click(slider);
    await userEvent.keyboard("{arrowright}");

    expect(slider).toHaveAttribute("aria-valuenow", "12");
    expect(status).toHaveTextContent("12px");
  });

  test('RoundnessOption - it should have a min value of "0"', () => {
    render(<RoundnessOption />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-valuemin", "0");
  });

  test('RoundnessOption - it should have a max value of "100"', () => {
    render(<RoundnessOption />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });
});
