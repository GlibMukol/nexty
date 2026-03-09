import { render } from "@testing-library/react";
import { it, describe, expect, jest } from "@jest/globals";
import Loading from "../loading";

describe("dashboard loading", () => {
    it("should render loading shell", () => {
        const { container } = render(<Loading />);
        expect(container.querySelector(".animate-pulse")).toBeTruthy();
        expect(container.querySelector('aside[aria-hidden="true"]')).toBeTruthy();
    });
});