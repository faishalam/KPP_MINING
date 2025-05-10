"use client";

import { Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DataGrid from "@/components/componentsV2/molecules/datagrid";
import ModalUpdateProgressCapex from "./components/modalUpdateCapex";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import useProgressAssetManagement from "./hooks";
import Dashboard from "./components/Dashboard";

export default function ProgressAssetPage() {
  const {
    progressListColumnDef,
    isLoadingDelete,
    isLoadingAddProgress,
    isLoadingProgressList,
    selectedIds,
    openModalProgressCapex,
    setOpenModalProgressCapex,
    filter,
    setFilter,
    departmentOptions,
    dataGrid,
    onDownloadData,
    dataProgressList
  } = useProgressAssetManagement();
  return (
    <>
      {isLoadingProgressList ? (
        <BlockingLoader />
      ) : (
        <div className="w-[100%] h-[100%]">
          <div className="w-full flex justify-between items-center">
            <Typography variant="h6" className="!font-bold">
              Progress Capex Management
            </Typography>
            <div className="flex gap-2 items-center">
              {selectedIds?.length > 0 && (
                <Button
                  onClick={() => {
                    setOpenModalProgressCapex(!openModalProgressCapex);
                  }}
                  className="flex gap-2 text-white !bg-[#154940] hover:!bg-[#0e342d] !rounded-md h-[40px]"
                >
                  <span className="text-white text-[10px] sm:text-sm">
                    Update Progress Capex
                  </span>
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                className="text-black flex gap-2 !rounded-md h-[40px] !text-[10px] sm:!text-sm"
                onClick={() => onDownloadData(dataProgressList?.data)}
              >
                Download
              </Button>
            </div>
          </div>
          {openModalProgressCapex && <ModalUpdateProgressCapex />}
          <div className="py-4">
            <Dashboard />
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
                <div className="flex items-center gap-2">
                  <CInput
                    type="date"
                    className="w-40"
                    placeholder="Cutoff from"
                    onChange={(e) =>
                      setFilter({ ...filter, cutoff_from: e.target.value })
                    }
                    value={filter.cutoff_from}
                  />
                  <span className="text-gray-500">→</span>
                  <CInput
                    type="date"
                    className="w-40"
                    placeholder="Cutoff to"
                    onChange={(e) =>
                      setFilter({ ...filter, cutoff_to: e.target.value })
                    }
                    value={filter.cutoff_to}
                  />
                </div>
                <CAutoComplete
                  options={departmentOptions}
                  className="w-full"
                  getOptionKey={(option) => option.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  onChange={(_, value) => {
                    setFilter({ ...filter, department: value?.value });
                  }}
                  getOptionLabel={(option) => option.label}
                  placeholder="Department"
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <DataGrid
                columnDefs={progressListColumnDef}
                rowData={dataGrid}
                pagination={true}
                loading={
                  isLoadingDelete ||
                  isLoadingAddProgress ||
                  isLoadingProgressList
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
