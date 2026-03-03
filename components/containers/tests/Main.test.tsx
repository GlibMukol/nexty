import { render } from "@testing-library/react";
import { describe, it, expect } from '@jest/globals';
import MainContainer from "../Main";

describe("Main Container", () => {
    it("render Main coneteiner and  compare with snapshot", () => {
        const { container } = render(
            <MainContainer
                description="description"
                header="header"
            ><></></MainContainer>);
        expect(container).toMatchSnapshot();
    });
});