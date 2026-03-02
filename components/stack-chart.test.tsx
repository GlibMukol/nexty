import { render } from "@testing-library/react";
import { describe, it, expect, jest } from '@jest/globals';
import StackChart from "./stack-chart";



jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));


describe("Stack chart componet", () => {
    const mockData = [
        { name: "In Stack", value: 70, fill: "#0088FE" },
        { name: "Low Stack", value: 20, fill: "#00C49F" },
        { name: "Out Of Stack", value: 10, fill: "#FFBB28" },
    ];

    it("renders correctly and matches snapshot", () => {
        const { container } = render(<StackChart data={mockData} />);
        expect(container).toMatchSnapshot();
    });

    it("renders the chart container with correct classes", () => {
        const { container } = render(<StackChart data={mockData} />);
        const chartDiv = container.querySelector('.w-68.h-68.flex-2.min-h-0');
        expect(chartDiv).toBeTruthy();
    });

});