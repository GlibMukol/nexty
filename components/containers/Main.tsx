"use client";

import React from "react";
import { Menu } from "lucide-react";

type TMainContainer = {
    sidebar?: React.ReactElement<any>;
    children: React.ReactNode;
    header: string;
    description: string;
};

export default function MainContainer(props: TMainContainer) {
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

    const desktopSidebar = props.sidebar
        ? React.cloneElement(props.sidebar, {
            variant: "desktop",
        })
        : null;

    const mobileSidebar = props.sidebar
        ? React.cloneElement(props.sidebar, {
            variant: "mobile",
            open: mobileNavOpen,
            onClose: () => setMobileNavOpen(false),
        })
        : null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            {desktopSidebar}
            {mobileSidebar}

            <div className="md:hidden sticky top-0 z-20 border-b border-gray-200 bg-gray-50/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
                <div className="flex items-center gap-3 px-4 py-3">
                    <button
                        type="button"
                        aria-label="Open navigation"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                        onClick={() => setMobileNavOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-gray-900 dark:text-zinc-100">
                            {props.header}
                        </div>
                        <div className="truncate text-xs text-gray-500 dark:text-zinc-400">
                            {props.description}
                        </div>
                    </div>
                </div>
            </div>

            <main className="p-4 text-black sm:p-6 md:ml-20 lg:ml-64 dark:text-zinc-100">
                <div className="mb-6 hidden md:block sm:mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                                {props.header}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-zinc-400">{props.description}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">{props.children}</div>
            </main>
        </div>
    );
}