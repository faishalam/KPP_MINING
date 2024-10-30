'use client'

import { useUserAssetContext } from "@/app/providers/rootProviders/UserAssetProviders";
import InputSearchSection from "../../InputSearchSection";
import DataTableYourAssetSection from "./DataTableYourAssetSection";
import ExcelDownloadButtonYourAsset from "../../button/ExcelDownloadButtonYourData";

export default function YourAssetLayout() {
    const {
        handleSubmit,
        onSubmit,
        register,
    } = useUserAssetContext()

    return (
        <>
            <div className="max-w-full w-full flex flex-col gap-4 ">
                <section className="max-w-full w-full rounded">
                    <div className="w-full max-w-full flex gap-4">
                        <ExcelDownloadButtonYourAsset />
                        <InputSearchSection
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            register={register}
                            placeholder="Cari nama asset.."
                        />
                    </div>
                </section>

                <section className="mx-auto max-w-full w-full h-full rounded flex flex-col">
                    <DataTableYourAssetSection />
                </section>
            </div>
        </>
    )
}