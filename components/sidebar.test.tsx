import { render } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from '@jest/globals';
import SideBar from "./sidebar";
import { UserButton } from "@neondatabase/auth/react";
// import { usePathname } from "next/navigation";

jest.mock('@neondatabase/auth/react', () => ({
    // 2. Return a dummy component for the named export 'UserButton'
    UserButton: () => <div data-testid="mock-user-button">Mocked UserButton</div>,
}));
const mockUsePathName = jest.fn();

jest.mock('next/navigation', () => ({
    usePathname() {
        return mockUsePathName()
    }
}));
afterEach(() => {
    jest.clearAllMocks();
});
// const hrefs = n

describe("SideBar component", () => {
    it("render and compare withh snapshot", () => {
        mockUsePathName.mockReturnValueOnce("/dashboard");
        console.log('SideBar :>> ', SideBar);
        render(<SideBar curentPath="/dashboard" />)
    })
})