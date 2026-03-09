import { render } from "@testing-library/react";
import { it, describe, expect, jest, beforeAll, beforeEach } from "@jest/globals";
import '@testing-library/jest-dom/jest-globals';
import { faker } from "@faker-js/faker";




jest.mock('@/lib/helper/getUser', () => ({
    getUser: jest.fn<any>().mockResolvedValue({ id: "userId" })
}))


// type Product = {
//     createdAt: Date;
//     price: Decimal;
//     quantity: number;
// }


// const createRandomProduct = (): Product[] => {
//     const product = () => ({
//         createdAt: faker.date.past(),
//         price: Decimal(faker.commerce.price(1, 1000, 2)),
//         quantity: faker.datatype.number({ min: 0, max: 500 })
//     }) as Product;
//     return Array.from({ length: 10 }, () => product());
// };

const fakeProduct = [
    { createdAt: "2025-10-23T13:02:54.032Z", price: 97, quantity: 447 },
    { createdAt: "2026-02-11T08:52:58.902Z", price: 111, quantity: 222 },
    { createdAt: "2025-07-05T07:02:22.931Z", price: 145, quantity: 450 },
    { createdAt: "2025-11-02T23:54:55.684Z", price: 485, quantity: 185 },
    { createdAt: "2025-04-18T12:30:29.003Z", price: 224, quantity: 477 },
    { createdAt: "2025-10-21T05:46:24.843Z", price: 598, quantity: 445 },
    { createdAt: "2026-01-31T03:03:22.029Z", price: 793, quantity: 294 },
    { createdAt: "2025-08-13T10:24:10.032Z", price: 414, quantity: 57 },
    { createdAt: "2025-06-30T21:14:38.780Z", price: 434, quantity: 307 },
    { createdAt: "2025-07-01T15:27:27.276Z", price: 240, quantity: 122 }
]

jest.mock("@/lib/prisma", () => ({
    prisma: {
        product: {
            count: jest.fn<() => Promise<number>>().mockResolvedValue(fakeProduct.length),
            findMany: jest.fn<() => Promise<typeof fakeProduct>>().mockResolvedValue(fakeProduct)
        }
    }
}))










describe("Dashboard page", () => {
    const { default: DashboardPage } = require("../page");
    beforeEach(async () => faker.seed(42))
    it("should be match with snapshot", async () => {

        const ResolvedDashboardPage = await DashboardPage();
        const { container } = render(ResolvedDashboardPage);
        expect(container).toMatchSnapshot();
    })
})