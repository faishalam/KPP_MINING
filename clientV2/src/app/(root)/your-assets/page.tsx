'use client';

import YourAssetLayout from "@/components/pages/YourAssetPageComponents/YourAssetLayout";
import { UserAssetProvider } from "@/providers/rootProviders/UserAssetProviders";

export default function YourAssetPage() {
    return (
        <>
            <UserAssetProvider>
                <YourAssetLayout />
            </UserAssetProvider>
        </>
    );
}
