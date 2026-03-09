import MainContainer from "@/components/containers/Main";
import ProductsChart from "@/components/products-chart";
import SideBar from "@/components/sidebar";
import StackChart from "@/components/stack-chart";
import { getUser } from "@/lib/helper/getUser";
import { prisma } from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

async function getChartData(totalProduct: any, allProducts: any) {
    const inStackCount = allProducts.filter(
        (p: any) => Number(p.quantity) > 5,
    ).length;
    const lowStackCount = allProducts.filter(
        (p: any) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1,
    ).length;
    const outOfStack = allProducts.filter(
        (p: any) => Number(p.quantity) === 0,
    ).length;

    const inStackPercent =
        totalProduct > 0 ? Math.round((inStackCount / totalProduct) * 100) : 0;
    const lowStackPercent =
        totalProduct > 0 ? Math.round((lowStackCount / totalProduct) * 100) : 0;

    const chartStackData = [
        {
            name: "In Stack",
            value: inStackPercent,
            fill: "#0088FE",
        },
        {
            name: "Low Stack",
            value: lowStackPercent,
            fill: "#00C49F",
        },
        {
            name: "Out Of Stack",
            value: outOfStack,
            fill: "#FFBB28",
        },
    ];

    const weeklyProductsData = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

        const weekProducts = allProducts.filter((product: any) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        });

        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length || 0,
        });
    }
    return { chartStackData, weeklyProductsData };
}

function KeyMetrics({
    totalProduct,
    totalValue,
    lowStock,
}: {
    totalProduct: number;
    totalValue: number;
    lowStock: number;
}) {
    const metrics = [
        { label: "Total products", value: totalProduct, sign: "+" },

        { label: "Total value", value: totalValue.toFixed(0), sign: "+$" },

        { label: "Low stock", value: lowStock, sign: "+" },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrix</h2>

            <div className="grid grid-cols-3 gap-6 ">
                {metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                            {index === 1 ? `${metric.value}` : metric.value}
                        </div>

                        <div className="text-sm text-gray-600">{metric.label}</div>

                        <div className="flex items-center justify-center mt-1">
                            <span className="text-sm text-green-600">
                                {metric.sign}
                                {metric.value}
                            </span>

                            <TrendingUp className="w-3 h-3 text-gray-600 ml-1" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function NewProducts({ weeklyProductsData }: { weeklyProductsData: any[] }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
                New products per week
            </h2>

            <div className="h-48">
                <ProductsChart data={weeklyProductsData} />
            </div>
        </div>
    );
}

import StockLevels from "@/components/stock-levels";

export default async function DashboardPage() {
    const { id: userId } = await getUser();

    const [totalProduct, lowStock, allProducts] = await Promise.all([
        prisma.product.count({ where: { userId } }),

        prisma.product.count({
            where: { userId, lowStockAt: { not: null }, quantity: { lte: 5 } },
        }),

        prisma.product.findMany({
            where: { userId },

            select: { price: true, quantity: true, createdAt: true },
        }),
    ]);

    const totalValue = allProducts.reduce(
        (sum, { price, quantity }) => sum + Number(price) * Number(quantity),
        0,
    );

    const recentProducts = await prisma.product.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const { chartStackData, weeklyProductsData } = await getChartData(
        totalProduct,
        allProducts,
    );

    return (
        <MainContainer
            header="Dashboard"
            description="Welcom!"
            sidebar={<SideBar curentPath="/dashboard" />}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <KeyMetrics
                    totalProduct={totalProduct}
                    totalValue={totalValue}
                    lowStock={lowStock}
                />

                <NewProducts weeklyProductsData={weeklyProductsData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <StockLevels recentProducts={recentProducts} />

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            Efficency
                        </h2>
                    </div>

                    <div className="flex items-center justify-around">
                        <div className="relative w-1/3 h-1/3 flex flex-col gap-4 flex-3">
                            {chartStackData.map((stack, key) => {
                                return (
                                    <div
                                        key={key}
                                        className="flex items-center min-w-20  justify-start gap-4 p-3 rounded-lg bg-gray-50"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: stack.fill }}
                                        />

                                        <div className="text-sm font-bold">{stack.name} </div>

                                        <span
                                            className="text-sm font-light"
                                            style={{ color: stack.fill }}
                                        >
                                            {" "}
                                            ({stack.value}) %
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <StackChart data={chartStackData} />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}
