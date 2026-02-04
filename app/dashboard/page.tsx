import SideBar from "@/components/sidebar";

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-[1rem_1fr] min-h-screen bg-gray-50">
            <SideBar curentPath="/dashboard" />
            <main className="ml-64 p-6 text-black" >Dashboard  </main>
        </div>
    )
} 