import { AccountView } from '@neondatabase/auth/react';
import { accountViewPaths } from '@neondatabase/auth/react/ui/server';

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <AccountView path={path} />
        </main>
    );
}