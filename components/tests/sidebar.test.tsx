import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, afterEach, jest } from '@jest/globals';
import { TNavigation } from "../sidebar";

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
    usePathname: () => mockUsePathname()
}));

describe("SideBar component", () => {
    const { default: SideBar, navigation } = require("../sidebar");
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        mockUsePathname.mockClear();
    })

    it("render and compare with snapshot", () => {
        const { container } = render(<SideBar curentPath="/dashboard" />);
        expect(container).toMatchSnapshot();
    });

    it.each(navigation.map((i: TNavigation) => [i.href, i.name]))("should show active item in list according page %s", (href, item) => {

        mockUsePathname.mockImplementationOnce(() => href);
        render(<SideBar curentPath={href} />);
        const result = screen.getByTestId(`${item}`);
        expect(mockUsePathname).toHaveBeenCalled();
        expect(result.classList.contains("bg-gray-600")).toBe(true);
    });
});
