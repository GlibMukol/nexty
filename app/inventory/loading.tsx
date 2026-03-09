import SideBar from "@/components/sidebar";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <SideBar curentPath="/inventory" variant="desktop" />
            <SideBar curentPath="/inventory" variant="mobile" open={false} />

            <div className="md:hidden sticky top-0 z-20 border-b border-gray-200 bg-gray-50/95 backdrop-blur">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="h-9 w-9 rounded-md border border-gray-200 bg-white" />
                    <div className="min-w-0 flex-1">
                        <div className="h-4 w-28 rounded bg-gray-200" />
                        <div className="mt-1 h-3 w-44 rounded bg-gray-200" />
                    </div>
                </div>
            </div>

            <main className="p-4 text-black sm:p-6 md:ml-20 lg:ml-64">
                <div className="mb-6 hidden md:block sm:mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-64"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                            <div className="h-10 bg-blue-200 rounded-lg w-full sm:w-24"></div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="min-w-[720px] w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">SKU</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Quantity</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Low Stack</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}