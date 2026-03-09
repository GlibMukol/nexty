"use client"

import { UserButton } from "@neondatabase/auth/react";
import clsx from "clsx";
import { BarChart3, LucideIcon, Package, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


type TSideBar = {
    curentPath?: string;
    variant?: "desktop" | "mobile";
    open?: boolean;
    onClose?: () => void;
};
export type TNavigation = {
    name: string;
    href: string;
    icon: LucideIcon;
};

export const navigation: TNavigation[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: BarChart3,
    },
    {
        name: "Inventory",
        href: "/inventory",
        icon: Package,
    },
    {
        name: "Add Product",
        href: "/add-product",
        icon: Plus,
    },
    {
        name: "Setting",
        href: "/account/settings",
        icon: Settings,
    },

];

export default function SideBar({
    curentPath = "/dashboard",
    variant = "desktop",
    open = false,
    onClose,
}: TSideBar) {
    const path = usePathname();

    if (variant === "mobile") {
        return (
            <>
                {open ? (
                    <div
                        data-testid="sidebar-backdrop"
                        className="fixed inset-0 z-40 bg-black/40 md:hidden"
                        onClick={onClose}
                    />
                ) : null}

                <aside
                    className={clsx(
                        "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-gray-900 p-5 text-white shadow-2xl transition-transform md:hidden",
                        open ? "translate-x-0" : "-translate-x-full",
                    )}
                    aria-hidden={!open}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            <span className="text-lg font-semibold">App</span>
                        </div>

                        <button
                            type="button"
                            aria-label="Close navigation"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="space-y-3">
                        <div className="text-xs font-semibold text-gray-400 uppercase">
                            Inventory
                        </div>

                        {navigation.map((item) => (
                            <Link
                                data-testid={item.name}
                                href={item.href}
                                key={item.href}
                                onClick={onClose}
                                className={clsx(
                                    "flex items-center gap-3 rounded-lg p-2 py-3 hover:bg-gray-500",
                                    item.href === path && "bg-gray-600",
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6">
                        <UserButton />
                    </div>
                </aside>
            </>
        );
    }

    return (
        <aside className="hidden min-h-screen flex-col bg-gray-900 p-4 text-white md:fixed md:inset-y-0 md:left-0 md:flex md:w-20 lg:w-64 lg:p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 lg:mb-4">
                    <BarChart3 className="h-5 w-5" />
                    <span className="hidden text-lg font-semibold lg:inline">App</span>
                </div>
            </div>

            <nav className="space-y-2">
                <div className="hidden text-sm font-semibold text-gray-400 uppercase lg:block">
                    Inventory
                </div>

                {navigation.map((item) => (
                    <Link
                        data-testid={item.name}
                        href={item.href}
                        key={item.href}
                        className={clsx(
                            "flex items-center rounded-lg p-2 py-3 hover:bg-gray-500",
                            "gap-3 md:justify-center lg:justify-start",
                            item.href === path && "bg-gray-600",
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="hidden text-sm lg:inline">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-6">
                <UserButton />
            </div>
        </aside>
    );
}