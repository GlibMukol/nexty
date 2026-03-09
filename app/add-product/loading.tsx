import SideBar from "@/components/sidebar";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <SideBar curentPath="/add-product" variant="desktop" />
            <SideBar curentPath="/add-product" variant="mobile" open={false} />

            <div className="md:hidden sticky top-0 z-20 border-b border-gray-200 bg-gray-50/95 backdrop-blur">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="h-9 w-9 rounded-md border border-gray-200 bg-white" />
                    <div className="min-w-0 flex-1">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                        <div className="mt-1 h-3 w-40 rounded bg-gray-200" />
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

                <div className="w-full max-w-2xl">
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
                            <div className="flex flex-col gap-4 justify-center sm:flex-row">
                                <div className="h-12 bg-blue-200 rounded-lg w-full sm:w-36"></div>
                                <div className="h-12 bg-gray-200 rounded-lg w-full sm:w-36"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
