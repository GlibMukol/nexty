import SideBar from "@/components/sidebar";

export default async function DashboardPage() {
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50">
            <SideBar curentPath="/dashboard" />
            <main className="ml-64 p-6 text-black" >
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
                            <p className="text-sm text-gray-500">Welcome!</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 