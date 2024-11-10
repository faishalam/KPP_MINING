'use client'

import { useHomeContext } from "@/providers/rootProviders/HomeProviders";
import React from "react";
import ExcelDownloadButton from "@/components/button/ExcelDownloadButton";
import InputSearchSection from "../../InputSearchSection";
import DataTableHome from "./DataTableHome";

export default function HomeLayout() {
    const {
        handleSubmit,
        onSubmit,
        register,
    } = useHomeContext()

    return (
        <>
            <div className="max-w-full w-full flex flex-col gap-4 ">
                <section className="max-w-full w-full rounded mb-2">
                    <div className="w-full max-w-full flex gap-4">
                        <ExcelDownloadButton />
                        <InputSearchSection
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            register={register}
                            placeholder="Cari nama asset atau nama user..."
                        />
                    </div>
                </section>

                <section className="mx-auto max-w-full w-full h-full rounded flex flex-col">
                    <DataTableHome />
                </section>
            </div>
        </>
    )
}