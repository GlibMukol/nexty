import { render } from "@testing-library/react";
import { it, describe, expect, jest } from "@jest/globals";
import Loading from "../loading";

describe("dashboard loading snapshot check", () => {
    it("should be same snapshot", () => {
        const { container } = render(<Loading />);
        expect(container).toMatchSnapshot();
    })
});