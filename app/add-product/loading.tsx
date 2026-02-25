import SideBar from "@/components/sidebar";

export default function Loading() {
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50 animate-pulse">
            <SideBar curentPath="/add-product" />
            <main className="ml-64 p-6 text-black">
                <div className="mb-8">
                    <div className="flex item-centers justify-between">
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-64"></div>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="space-y-6">
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                </div>
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <div className="h-12 bg-blue-200 rounded-lg w-36"></div>
                                <div className="h-12 bg-gray-200 rounded-lg w-36"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
