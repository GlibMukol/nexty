
function StockLevels({ recentProducts }: { recentProducts: any[] }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Stock Levels</h2>

            <div className="space-y-3">
                {recentProducts.map((prd, key) => {
                    const stockLevel =
                        prd.quantity === 0
                            ? 0
                            : prd.quantity <= (prd.lowStockAt || 5)
                                ? 1
                                : 2;

                    const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"];

                    const textColors = [
                        "text-red-600",
                        "text-yellow-600",
                        "text-green-600",
                    ];

                    return (
                        <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}
                                />

                                <div>
                                    <span className="text-sm font-medium text-gray-800">
                                        {prd.name}
                                    </span>
                                </div>
                            </div>

                            <div className={`text-sm font-medium ${textColors[stockLevel]}`}>
                                {prd.quantity} units
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StockLevels;
