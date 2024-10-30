'use client'
import CardStatistics from "@/app/components/card/CardStatistics";
import { StatisticsProvider, useStatisticsContext } from "@/app/providers/rootProviders/StatisticsProviders";
import { LuCassetteTape } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdApproval } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { TbDeviceIpadCancel } from "react-icons/tb";






export default function Page() {
    return (
        <>
            <StatisticsProvider>
                <StatisticsLayout />
            </StatisticsProvider>
        </>
    )
}

function StatisticsLayout() {
    const {
        dataAssetList,
        isLoadingDataAssetList,
        isFetchingDataAssetList
    } = useStatisticsContext()

    const totalNilaiAsset = `Rp. ${dataAssetList?.reduce((a, b) => a + b.totalNilaiAsset, 0).toLocaleString('id-ID')}`
    const assetApproved = dataAssetList?.filter((a) => a.statusApproval === "approved").length
    const assetWaiting = dataAssetList?.filter((a) => a.statusApproval === "waiting").length
    const assetWorked = dataAssetList?.filter((a) => a.statusRealisasi === "worked").length
    const assetCanceled = dataAssetList?.filter((a) => a.statusRealisasi === "canceled").length

    return (
        <div className="max-w-full w-full">
            <div className="max-w-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CardStatistics
                    title="Total Asset"
                    icon={<LuCassetteTape aria-hidden="true" className="h-7 w-7 text-green-700" />}
                    total={dataAssetList?.length.toString()}
                />
                <CardStatistics
                    title="Total Nilai Asset"
                    icon={<CiMoneyCheck1 aria-hidden="true" className="h-8 w-8 text-green-700" />}
                    total={totalNilaiAsset || "Rp. 0"}
                />
                <CardStatistics
                    title="Asset Approved"
                    icon={<MdApproval aria-hidden="true" className="h-8 w-8 text-green-700" />}
                    total={assetApproved?.toString()}
                />
                <CardStatistics
                    title="Asset Waiting"
                    icon={<MdPendingActions aria-hidden="true" className="h-8 w-8 text-green-700" />}
                    total={assetWaiting?.toString()}
                />
                <CardStatistics
                    title="Asset Worked"
                    icon={<GrUserWorker aria-hidden="true" className="h-8 w-8 text-green-700" />}
                    total={assetWorked?.toString()}
                />
                 <CardStatistics
                    title="Asset Canceled"
                    icon={<TbDeviceIpadCancel aria-hidden="true" className="h-8 w-8 text-green-700" />}
                    total={assetCanceled?.toString()}
                />
            </div>
        </div>
    )
}