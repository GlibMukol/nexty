import { render } from "@testing-library/react";
import { describe, it, expect, jest } from '@jest/globals';
import ProductsChart from "../products-chart";

jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

describe("ProductsChart Component", () => {
    const mockData = [
        { week: "01/01", products: 10 },
        { week: "01/08", products: 20 },
        { week: "01/15", products: 15 },
    ];

    it("renders a chart", () => {
        const { container } = render(<ProductsChart data={mockData} />);
        expect(container.querySelector("svg")).toBeTruthy();
    });

    it("renders the chart container with correct dimensions", () => {
        const { container } = render(<ProductsChart data={mockData} />);
        const chartDiv = container.querySelector('.h-48.w-full');
        expect(chartDiv).toBeTruthy();
    });
});
