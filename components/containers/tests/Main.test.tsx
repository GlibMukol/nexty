import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import MainContainer from "../Main";

describe("Main Container", () => {
    it("renders header/description and mobile nav trigger", () => {
        render(
            <MainContainer
                description="description"
                header="header"
            ><></></MainContainer>);

        expect(screen.getByRole("button", { name: /open navigation/i })).toBeInTheDocument();
        expect(screen.getAllByText("header").length).toBeGreaterThan(0);
        expect(screen.getAllByText("description").length).toBeGreaterThan(0);
    });
});