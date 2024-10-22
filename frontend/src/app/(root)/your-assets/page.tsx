'use client'
import { UserAssetProvider } from "@/app/providers/rootProviders/UserAssetProviders";
import YourAssetLayout from "@/app/components/pages/YourAssetPage/YourAssetLayout";

export default function YourAssetPage() {
    return (
        <>
            <UserAssetProvider>
                <YourAssetLayout />
            </UserAssetProvider>
        </>
    )
}