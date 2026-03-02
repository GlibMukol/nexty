import { render } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from '@jest/globals';
import SideBar from "./sidebar";
// import { usePathname } from "next/navigation";


jest.mock('@neondatabase/auth/react', () => ({
    UserButton: () => <div data-testid="mock-user-button">User Button</div>,
    // Add any other hooks you might be using from them here:
    // useAuth: () => ({ isSignedIn: true, userId: 'test-123' }),
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
        render(<SideBar curentPath="/dashboard" />)
    })
})