"use client";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import useAssetManagement from "./hooks";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import { Button, Typography } from "@mui/material";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import DataGrid from "@/components/componentsV2/molecules/datagrid";

export default function AssetManagement() {
  const router = useRouter();
  const {
    statisticsDataTop,
    reset,
    dataGrid,
    kodePNOptions,
    actionPlan,
    filter,
    assetListColumnDef,
    setFilter,
    isLoadingDataAssetList,
    dataAssetList,
    onDownloadData,
  } = useAssetManagement();
  return (
    <>
      {isLoadingDataAssetList ? (
        <BlockingLoader />
      ) : (
        <div className="w-[100%] h-[100%]">
          <div className="w-full flex justify-between items-center">
            <Typography variant="h6" className="!font-bold">
              Asset Management
            </Typography>
            <div className="flex gap-2 items-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                className="text-black flex gap-2 !rounded-md h-[40px] !text-[10px] sm:!text-sm"
                onClick={() => onDownloadData(dataAssetList?.data)}
              >
                Download
              </Button>
              <Button
                onClick={() => {
                  router.push("/asset-management/incoming/new?mode=add");
                  reset();
                }}
                className="flex gap-2 text-white !bg-[#154940] hover:!bg-[#0e342d] !rounded-md h-[40px]"
              >
                <AddIcon className="text-white text-[10px] sm:text-sm" />
                <span className="text-white text-[10px] sm:text-sm">
                  Add Data
                </span>
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 py-6">
            <div className="w-full grid grid-cols-3 gap-5">
              {statisticsDataTop?.map((item, index) => (
                <StatisticsComponents
                  key={index}
                  label={item.label}
                  count={item.count ?? 0}
                  bgColor={item.bgColor}
                />
              ))}
            </div>
          </div>

          <div className="w-full bg-white shadow-md rounded-md">
            <div className="w-full bg-white rounded-md">
              <div className="w-full flex gap-3 p-4">
                <CInput
                  value={filter.search}
                  className="w-full"
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                  placeholder="Search"
                />
                <CAutoComplete
                  options={kodePNOptions}
                  className="w-full"
                  getOptionKey={(option) => option.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  onChange={(_, value) => {
                    setFilter({ ...filter, kodePN: value?.value });
                  }}
                  getOptionLabel={(option) => option.label}
                  placeholder="Kode PN"
                />
                <CAutoComplete
                  options={actionPlan}
                  className="w-full"
                  getOptionKey={(option) => option.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  onChange={(_, value) => {
                    setFilter({ ...filter, actionPlan: value?.value });
                  }}
                  getOptionLabel={(option) => option.label}
                  placeholder="Action Plan"
                />
              </div>
            </div>
            <DataGrid columnDefs={assetListColumnDef} rowData={dataGrid} />
          </div>
        </div>
      )}
    </>
  );
}

const StatisticsComponents: React.FC<{
  bgColor: string;
  count: string | number;
  label: string;
}> = ({ bgColor, count, label }) => {
  return (
    <div
      className={`flex flex-col bg-gradient-to-l ${bgColor} to-white shadow-md rounded-md p-4`}
    >
      <p className="text-[14px] sm:text-[14px] md:text-[22px] font-bold">
        {count}
      </p>
      <p className="text-gray-600 text-xs sm:text-sm md:text-md">{label}</p>
    </div>
  );
};
