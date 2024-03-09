import { screen, render } from "@testing-library/react";
import Toolbar from "../index";

describe("Toolbar", () => {
  it("Toolbar - should render without issues", () => {
    const { asFragment } = render(<Toolbar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Toolbar - should render the Theme option", () => {
    render(<Toolbar />);

    const themeOptions = screen.getByTestId("theme-options");
    expect(themeOptions).toBeInTheDocument();
  });

  it("Toolbar - should render the Scale option", () => {
    render(<Toolbar />);

    const scaleOption = screen.getByTestId("scale-option");
    expect(scaleOption).toBeInTheDocument();
  });

  it("Toolbar - should render the Padding option", () => {
    render(<Toolbar />);

    const paddingOption = screen.getByTestId("padding-option");
    expect(paddingOption).toBeInTheDocument();
  });

  it("Toolbar - should render the Roundness option", () => {
    render(<Toolbar />);

    const roundnessOption = screen.getByTestId("roundness-option");
    expect(roundnessOption).toBeInTheDocument();
  });

  it("Toolbar - should render the Export button", () => {
    render(<Toolbar />);

    const exportButton = screen.getByTestId("export-button");
    expect(exportButton).toBeInTheDocument();
  });
});
