'use client'

import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import DataTableHome from "../components/pages/HomePage/DataTableHome"
import { HomeProvider } from "../providers/rootProviders/HomeProviders"
import InputSearchSection from "../components/pages/HomePage/InputSearchSection"
import ExcelDownloadButton from "../helper/excelDownload"
import ButtonFilterSearch from "../components/ButtonFilterSearch"


export default function HomePage() {
    return (
        <>
            <HomeProvider>
                <div className="max-w-full w-full flex flex-col gap-4 ">
                    {/* <section className="max-w-full w-full grid grid-cols-5">
                        <ChartAssets />
                    </section> */}

                    <section className="max-w-full w-full rounded">
                        <div className="w-full max-w-full flex gap-4">
                            <ExcelDownloadButton />
                            {/* <ButtonFilterSearch /> */}
                            <InputSearchSection />
                        </div>
                    </section>

                    <section className="mx-auto max-w-full h-full rounded flex flex-col">
                        <DataTableHome />
                    </section>
                </div>
            </HomeProvider>
        </>
    )
}