import { render, screen } from "@testing-library/react";
import { it, describe, expect, jest, beforeAll, beforeEach } from "@jest/globals";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/jest-globals';


jest.mock("../../../lib/helper/getUser", () => ({
    getUser: jest.fn()
}));

jest.mock("../../../lib/actions/product", () => ({
    addInventory: jest.fn(),
    deleteInventory: jest.fn()
}))



describe("Add product page", () => {
    const { default: AddProduct } = require("../page")
    beforeEach(async () => jest.clearAllMocks());
    it("should be mutch with snapshot", async () => {
        const ResolvedAddProduct = await AddProduct()
        const { container } = render(ResolvedAddProduct);
        expect(container).toMatchSnapshot();
    });
    it("should have input name is requred", async () => {
        const ResolvedAddProduct = await AddProduct();
        const { container } = render(ResolvedAddProduct);
        const input = container.querySelector("#name") as HTMLInputElement;
        expect(input).toHaveAttribute("required");

    })
    it("should have input name is requred", async () => {
        const user = userEvent.setup();
        const text = "text";
        const ResolvedAddProduct = await AddProduct();
        const { container } = render(ResolvedAddProduct);
        const input = container.querySelector("#name") as HTMLInputElement;
        if (input) {
            await user.type(input, text);
            expect((input as HTMLInputElement)?.value).toBe(text)
        }
        else
            throw new Error("input with with id name not found");
    });
    describe("Quantity input", () => {

        let ResolvedAddProduct;
        let input: HTMLInputElement;
        beforeEach(async () => {
            ResolvedAddProduct = await AddProduct();
            const { container } = render(ResolvedAddProduct);
            const cmpnt = container.querySelector("#quantity");
            if (cmpnt) {
                input = cmpnt as HTMLInputElement
            } else {
                throw new Error("Quantity input not found")
            }
        });

        it("should be required", () => {
            expect(input).toHaveAttribute("required")
        });
        it("should have min attr", () => {
            expect(input).toHaveAttribute("min")
        });
        it("should have type number", () => {
            expect(input).toHaveAttribute("type", "number")
        });
    })

    describe("Price input", () => {

        let ResolvedAddProduct;
        let input: HTMLInputElement;
        beforeEach(async () => {
            ResolvedAddProduct = await AddProduct();
            const { container } = render(ResolvedAddProduct);
            const cmpnt = container.querySelector("#price");
            if (cmpnt) {
                input = cmpnt as HTMLInputElement
            } else {
                throw new Error("Price input not found")
            }
        });
        it("should be required", () => {
            expect(input).toHaveAttribute("required")
        });
        it("should have min attr", () => {
            expect(input).toHaveAttribute("min")
        });
        it("should have step = 0.01", () => {
            expect(input).toHaveAttribute("step", "0.01")
        });
        it("should have type number", () => {
            expect(input).toHaveAttribute("type", "number")
        });
    });

    describe("SCU input", () => {
        let ResolvedAddProduct;
        let input: HTMLInputElement;
        beforeEach(async () => {
            ResolvedAddProduct = await AddProduct();
            const { container } = render(ResolvedAddProduct);
            const cmpnt = container.querySelector("#scu");
            if (cmpnt) {
                input = cmpnt as HTMLInputElement
            } else {
                throw new Error("Scu input not found")
            }
        });
        const user = userEvent.setup();
        it("should have type text", () => {
            expect(input).toHaveAttribute("type", "text");
        })
    });
    describe("LOw stack input", () => {
        let ResolvedAddProduct;
        let input: HTMLInputElement;
        beforeAll(async () => {
            ResolvedAddProduct = await AddProduct();
            const { container } = render(ResolvedAddProduct);
            const cmpnt = container.querySelector("#lowStackAt");
            if (cmpnt) {
                input = cmpnt as HTMLInputElement
            } else {
                throw new Error("Scu input not found")
            }
        });

        it("should have type number", () => {
            expect(input).toHaveAttribute("type", "number");
        });
        it("should have type min = 0", () => {
            expect(input).toHaveAttribute("min", "0");
        });
    });

    describe("Submit button", () => {
        it("should call addInventory action", async () => {
            const { addInventory } = require("../../../lib/actions/product");
            // console.log('addInventory :>> ', addInventory);
            const user = userEvent.setup();
            const ResolvedAddProduct = await AddProduct()
            const { container } = render(ResolvedAddProduct);
            const button = container.querySelector('button[type="submit"]') as HTMLButtonElement;
            const product = container.querySelector("#name") as HTMLInputElement;
            const quantity = container.querySelector("#quantity") as HTMLInputElement;
            const price = container.querySelector("#price") as HTMLInputElement;
            await user.type(product, "prooduct");
            await user.type(quantity, "123");
            await user.type(price, "12");
            await user.click(button);


            expect(addInventory).toHaveBeenCalledTimes(1)


        })
    })

});