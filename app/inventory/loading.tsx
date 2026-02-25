import SideBar from "@/components/sidebar";

export default function Loading() {
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50 animate-pulse">
            <SideBar curentPath="/inventory" />
            <main className="ml-64 p-6 text-black" >
                <div className="mb-8">
                    <div className="flex item-centers justify-between">
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-64"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex gap-2">
                            <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                            <div className="h-10 bg-blue-200 rounded-lg w-24"></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stack</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </main>
        </div>
    )
}