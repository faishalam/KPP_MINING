'use client';

import YourAssetLayout from "@/app/components/pages/YourAssetPage/YourAssetLayout";
import { UserAssetProvider } from "@/app/providers/rootProviders/UserAssetProviders";

export default function YourAssetPage() {
    return (
        <>
            <UserAssetProvider>
                <YourAssetLayout />
            </UserAssetProvider>
        </>
    );
}
