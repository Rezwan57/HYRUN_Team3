import { render, screen } from "@testing-library/react";
import AllproductsPage, { metadata } from "../src/app/(main)/products/page"; 
import DynamicPages from "../src/components/ProductsPage/page";

// Mock dependencies
jest.mock("../src/components/ProductsPage/page", () => {
  return function MockDynamicPages() {
    return <div data-testid="dynamic-pages">Dynamic Pages Content</div>;
  };
});

describe("AllproductsPage", () => {
  it("should have correct metadata", () => {
    expect(metadata).toEqual({
      title: "HYRUN - Products",
    });
  });

  it("should render the DynamicPages component", () => {
    render(<AllproductsPage />);
    expect(screen.getByTestId("dynamic-pages")).toBeInTheDocument();
    expect(screen.getByText("Dynamic Pages Content")).toBeInTheDocument();
  });
});