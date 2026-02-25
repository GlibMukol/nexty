import SideBar from "@/components/sidebar";

export default function Loading() {
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50 animate-pulse">
            <SideBar curentPath="/dashboard" />
            <main className="ml-64 p-6 text-black" >
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                            </div>
                            <div className="text-center">
                                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                            </div>
                            <div className="text-center">
                                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                        <div className="h-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="flex items-center justify-around">
                            <div className="relative w-1/3 h-1/3 flex flex-col gap-4 flex-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex items-center min-w-20  justify-start gap-4 p-3 rounded-lg bg-gray-50">
                                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-32 h-32 rounded-full bg-gray-200"></div>
                        </div>
                    </div>

                </div>
            </main >
        </div >
    )
}
