import { render, screen } from "@testing-library/react";
import { describe, it, expect } from '@jest/globals';
import { Pagination } from "../pagination";

describe("Pagination Component", () => {
    const defaultProps = {
        current: 1,
        total: 5,
        baseUrl: "/inventory",
        searchParams: { query: "test" }
    };

    it("renders correctly and matches snapshot", () => {
        const { container } = render(<Pagination {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });

    it("returns null if total pages is 1 or less", () => {
        const { container } = render(<Pagination {...defaultProps} total={1} />);
        expect(container.firstChild).toBeNull();
    });

    it("disables the 'Previous' button when on the first page", () => {
        render(<Pagination {...defaultProps} current={1} />);
        const prevButton = screen.getByText(/Prevous/i);
        expect(prevButton.className).toContain("text-gray-400");
        expect(prevButton.getAttribute("area-disabled")).toBe("true");
    });

    it("disables the 'Next' button when on the last page", () => {
        render(<Pagination {...defaultProps} current={5} total={5} />);
        const nextButton = screen.getByText(/Next/i);
        expect(nextButton.className).toContain("text-gray-400");
        expect(nextButton.getAttribute("area-disabled")).toBe("true");
    });

    it("highlights the current page", () => {
        render(<Pagination {...defaultProps} current={3} />);
        const currentPage = screen.getByText("3");
        expect(currentPage.className).toContain("bg-blue-400");
    });

    it("renders ellipsis when there are many pages", () => {
        render(<Pagination {...defaultProps} current={5} total={10} />);
        const ellipsis = screen.getAllByText("...");
        expect(ellipsis.length).toBeGreaterThan(0);
    });

    it("generates correct links with search parameters", () => {
        render(<Pagination {...defaultProps} current={2} />);
        const pageLink = screen.getByText("1");
        expect(pageLink.getAttribute("href")).toContain("query=test");
        expect(pageLink.getAttribute("href")).toContain("page=1");
    });
});
