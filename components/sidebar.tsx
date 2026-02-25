"use client"

import { UserButton } from "@neondatabase/auth/react"
import clsx from "clsx"
import { BarChart3, LucideIcon, Package, Plus, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


type TSideBar = {
    curentPath: string
}
type TNavigation = {
    name: string,
    href: string,
    icon: LucideIcon
}
export default function SideBar({ curentPath = "/dashboard" }: TSideBar) {

    const path = usePathname();

    const navigation: TNavigation[] = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: BarChart3
        },
        {
            name: "Inventory",
            href: "/inventory",
            icon: Package
        },
        {
            name: "Add Product",
            href: "/add-product",
            icon: Plus
        },
        {
            name: "Setting",
            href: "/account/settings",
            icon: Settings
        }

    ]

    return (
        <div className="fix left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-lg font-semibold">App</span>
                </div>
            </div>
            <nav className="space-y-3">
                <div className="text-sm font-semibold text-gray-400 uppercase">
                    Inventory
                </div>
                {navigation.map((item, idx) => (
                    <Link href={item.href} key={idx} className={clsx("flex space-x-3 items-center rounded-lg p-2 py-3 hover:bg-gray-500", item.href === path && "bg-gray-600")} >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">
                            {item.name}
                        </span>
                    </Link>

                ))}
            </nav>
            <div className="absolute bottom-0 left-0 p-6">
                <div>
                    <UserButton />
                </div>
            </div>
        </div >
    )
}