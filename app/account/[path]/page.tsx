import SideBar from '@/components/sidebar';
import { AccountView } from '@neondatabase/auth/react';
import { accountViewPaths } from '@neondatabase/auth/react/ui/server';

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    return (
        <div className="grid grid-cols-[1rem_1fr] bg-gray-50 h-screen">
            <SideBar curentPath='/account/settings' />
            <main className="flex-1 ml-64 p-6 pt-20 text-black h-screen overflow-y-auto">
                {/* <main className="w-screen h-screen flex justify-center items-center"> */}
                <AccountView path={path} />
            </main>
        </div >
    );
}