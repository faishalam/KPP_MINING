"use client";
import { useRouter } from "next/navigation";
import DownloadIcon from "@mui/icons-material/Download";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import { Button, Typography } from "@mui/material";
import DataGrid from "@/components/componentsV2/molecules/datagrid";
import AddIcon from "@mui/icons-material/Add";
import useAssetOnDepartment from "./hooks";
import ModalFeedbackCancel from "@/components/modal/ModalFeedbackCancel";
import ModalFeedbackHold from "@/components/modal/ModalFeedbackHold";

export default function AssetDepartment() {
  const router = useRouter();
  const {
    assetOnDepartmentColumnDef,
    isLoadingDataUserAssetList,
    dataGrid,
    reset,
    statisticsDataTop,
    filter,
    setFilter,
    actionPlan,
    selectedIds,
    kodePNOptions,
    handleApproveAsset,
    openModalCancel,
    setOpenModalCancel,
    openModalHold,
    setOpenModalHold,
    mutateUpdateActionAsset
  } = useAssetOnDepartment();
  return (
    <>
      {isLoadingDataUserAssetList ? (
        <BlockingLoader />
      ) : (
        <div className="w-[100%] h-[100%]">
          <div className="w-full flex justify-between items-center">
            <Typography variant="h6" className="!font-bold">
              Asset on Department
            </Typography>
            <div className="flex gap-2 items-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                className="text-black flex gap-2 !rounded-md h-[40px] !text-[10px] sm:!text-sm"
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
            <DataGrid
              columnDefs={assetOnDepartmentColumnDef}
              rowData={dataGrid}
            />
            <div className="flex justify-end gap-2 p-4">
              <Button
                disabled={selectedIds.length === 0}
                variant="contained"
                color="primary"
                className="text-black flex gap-2 !rounded-md h-[40px] !bg-ckbColor"
                onClick={() => handleApproveAsset(selectedIds)}
              >
                Approve
              </Button>
            </div>
          </div>
          <ModalFeedbackCancel
            openModal={openModalCancel}
            setOpenModal={setOpenModalCancel}
            mutate={mutateUpdateActionAsset}
          />

          <ModalFeedbackHold
            openModal={openModalHold}
            setOpenModal={setOpenModalHold}
            mutate={mutateUpdateActionAsset}
          />
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
