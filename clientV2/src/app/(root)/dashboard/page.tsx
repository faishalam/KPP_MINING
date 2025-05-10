"use client";
import CardStatistics from "@/components/card/CardStatistics";
import { LuCassetteTape } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdApproval } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { TbDeviceIpadCancel } from "react-icons/tb";
import StatusRealisasiChart from "@/components/card/ChartStatusRealisasi";
import ChartStatusApproval from "@/components/card/ChartStatusApproval";
import useDashboard from "./hooks";
import { TypeDataAssetList } from "../asset-management/types";

export default function DashboardPage() {
  const { dataAssetList, isLoadingDataAssetList } = useDashboard();
  const totalNilaiAsset = `Rp. ${dataAssetList?.data
    ?.reduce((a: number, b: TypeDataAssetList) => a + b.totalNilaiAsset, 0)
    .toLocaleString("id-ID")}`;
  const assetApproved = dataAssetList?.data?.filter(
    (a: TypeDataAssetList) => a.statusApproval === "approved"
  ).length;
  const assetWaiting = dataAssetList?.data?.filter(
    (a: TypeDataAssetList) => a.statusApproval === "waiting"
  ).length;
  const assetWorked = dataAssetList?.data?.filter(
    (a: TypeDataAssetList) => a.statusRealisasi === "worked"
  ).length;
  const assetCanceled = dataAssetList?.data?.filter(
    (a: TypeDataAssetList) => a.statusRealisasi === "canceled"
  ).length;
  const assetHold = dataAssetList?.data?.filter(
    (a: TypeDataAssetList) => a.statusRealisasi === "hold"
  ).length;

  return (
    <div className="max-w-full w-full flex flex-col gap-5 max-h-full h-full">
      <div className="max-w-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CardStatistics
          title="Total Asset"
          icon={
            <LuCassetteTape
              aria-hidden="true"
              className="h-7 w-7 text-green-700"
            />
          }
          total={dataAssetList?.data?.length.toString()}
          loading={isLoadingDataAssetList}
        />
        <CardStatistics
          title="Total Nilai Asset"
          icon={
            <CiMoneyCheck1
              aria-hidden="true"
              className="h-8 w-8 text-green-700"
            />
          }
          total={totalNilaiAsset || "Rp. 0"}
          loading={isLoadingDataAssetList}
        />
        <CardStatistics
          title="Asset Approved"
          icon={
            <MdApproval aria-hidden="true" className="h-8 w-8 text-green-700" />
          }
          total={assetApproved?.toString()}
          loading={isLoadingDataAssetList}
        />
        <CardStatistics
          title="Asset Waiting"
          icon={
            <MdPendingActions
              aria-hidden="true"
              className="h-8 w-8 text-green-700"
            />
          }
          total={assetWaiting?.toString()}
          loading={isLoadingDataAssetList}
        />
        <CardStatistics
          title="Asset Worked"
          icon={
            <GrUserWorker
              aria-hidden="true"
              className="h-8 w-8 text-green-700"
            />
          }
          total={assetWorked?.toString()}
          loading={isLoadingDataAssetList}
        />
        <CardStatistics
          title="Asset Canceled"
          icon={
            <TbDeviceIpadCancel
              aria-hidden="true"
              className="h-8 w-8 text-green-700"
            />
          }
          total={assetCanceled?.toString()}
          loading={isLoadingDataAssetList}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-h-full h-full gap-5">
        <StatusRealisasiChart
          workedTotal={assetWorked}
          canceledTotal={assetCanceled}
          holdTotal={assetHold}
          loading={isLoadingDataAssetList}
        />

        <ChartStatusApproval
          approvedTotal={assetApproved}
          waitingTotal={assetWaiting}
          loading={isLoadingDataAssetList}
        />
      </div>
    </div>
  );
}
