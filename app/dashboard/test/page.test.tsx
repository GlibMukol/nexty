import { render, screen } from "@testing-library/react";
import {
    it,
    describe,
    expect,
    jest,
    beforeAll,
    beforeEach,
    afterEach,
} from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { faker } from "@faker-js/faker";

jest.mock("@/lib/helper/getUser", () => ({
    getUser: jest.fn<any>().mockResolvedValue({ id: "userId" }),
}));



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
    { createdAt: "2025-07-01T15:27:27.276Z", price: 240, quantity: 122 },
];

jest.mock("@/lib/prisma", () => ({
    prisma: {
        product: {
            count: jest
                .fn<() => Promise<number>>()
                .mockResolvedValue(fakeProduct.length),
            findMany: jest
                .fn<() => Promise<typeof fakeProduct>>()
                .mockResolvedValue(fakeProduct),
        },
    },
}));

describe("Dashboard page", () => {
    const { default: DashboardPage } = require("../page");
    beforeEach(async () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2026-03-09T12:00:00.000Z"));
        faker.seed(42);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it("should render key sections and mobile navigation trigger", async () => {
        const ResolvedDashboardPage = await DashboardPage();
        render(ResolvedDashboardPage);

        expect(
            screen.getByRole("button", { name: /open navigation/i }),
        ).toBeInTheDocument();

        expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
        expect(screen.getByText("Key Metrix")).toBeInTheDocument();
        expect(screen.getByText("New products per week")).toBeInTheDocument();
        expect(screen.getByText("Stock Levels")).toBeInTheDocument();
        expect(screen.getByText("Efficency")).toBeInTheDocument();
    });
});

describe("getChartData", () => {
    const { getChartData } = require("../page") as {
        getChartData: (
            totalProduct: number,
            allProducts: any[],
        ) => Promise<{
            chartStackData: { name: string; value: number; fill: string }[];
            weeklyProductsData: { week: string; products: number }[];
        }>;
    };

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2026-03-09T12:00:00.000Z"));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should compute stack percentages and out-of-stack count", async () => {
        const products = [
            { quantity: 6, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 10, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 1, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 5, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 2, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 0, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 99, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 7, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 8, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 100, createdAt: "2026-03-09T00:00:00.000Z" },
        ];

        const { chartStackData } = await getChartData(10, products);
        const byName = (name: string) =>
            chartStackData.find((x) => x.name === name);

        expect(byName("In Stack")?.value).toBe(60);
        expect(byName("Low Stack")?.value).toBe(30);
        expect(byName("Out Of Stack")?.value).toBe(1);
    });

    it("should return 0 percentages when totalProduct is 0", async () => {
        const products = [
            { quantity: 6, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 1, createdAt: "2026-03-09T00:00:00.000Z" },
            { quantity: 0, createdAt: "2026-03-09T00:00:00.000Z" },
        ];

        const { chartStackData } = await getChartData(0, products);
        const byName = (name: string) =>
            chartStackData.find((x) => x.name === name);

        expect(byName("In Stack")?.value).toBe(0);
        expect(byName("Low Stack")?.value).toBe(0);
        expect(byName("Out Of Stack")?.value).toBe(1);
    });

    it("should create 12 weekly buckets and include boundary dates", async () => {
        const now = new Date();
        const getBucket = (i: number) => {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - i * 7);
            weekStart.setHours(0, 0, 0, 0);

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);

            return { weekStart, weekEnd };
        };

        const { weekStart: nowStart, weekEnd: nowEnd } = getBucket(0);
        const { weekStart: prevStart, weekEnd: prevEnd } = getBucket(1);

        const products = [
            { quantity: 1, createdAt: nowStart },
            { quantity: 1, createdAt: nowEnd },
            { quantity: 1, createdAt: prevStart },
            { quantity: 1, createdAt: prevEnd },
            { quantity: 1, createdAt: "2020-01-01T00:00:00.000Z" },
        ];

        const { weeklyProductsData } = await getChartData(5, products);

        expect(weeklyProductsData).toHaveLength(12);

        const last = weeklyProductsData[weeklyProductsData.length - 1];
        const secondLast = weeklyProductsData[weeklyProductsData.length - 2]; 

        expect(last.products).toBe(2);
        expect(secondLast.products).toBe(2);
    });
});
