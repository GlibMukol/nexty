import MainContainer from '@/components/containers/Main';
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
        <>
            <MainContainer
                header="Account Settings"
                description="Set your accoutnt settings"
                sidebar={<SideBar curentPath='/account/settings' />}
            >
                <AccountView path={path} />
            </MainContainer>
        </>
    );
}