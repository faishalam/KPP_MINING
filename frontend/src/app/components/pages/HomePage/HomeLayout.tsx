'use client'

import { useHomeContext } from "@/app/providers/rootProviders/HomeProviders";
import React from "react";
import ExcelDownloadButton from "@/app/components/button/ExcelDownloadButton";
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
                <section className="max-w-full w-full rounded">
                    <div className="w-full max-w-full flex gap-4">
                        <ExcelDownloadButton />
                        <InputSearchSection
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            register={register}
                        />
                    </div>
                </section>

                <section className="mx-auto max-w-full h-full rounded flex flex-col">
                    <DataTableHome />
                </section>
            </div>
        </>
    )
}