"use client";
import { Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import useUserManagementHooks from "@/app/(root)/user-management/hooks";
import DataGrid from "@/components/componentsV2/molecules/datagrid";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import { useRootLayoutContext } from "@/providers/rootProviders/RootLayoutProviders";

export default function UserManagementPage() {
  const {
    userListColumnDef,
    statisticsDataTop,
    resetRegister,
    isLoadingGetUserList,
    isLoadingDeleteUser,
    setFilter,
    filter,
    dataUserList,
    departmentOptions,
    siteOptions,
    onDownloadData,
    dataGrid,
  } = useUserManagementHooks();
  const { role } = useRootLayoutContext();
  const router = useRouter();
  return (
    <>
      {isLoadingGetUserList ? (
        <BlockingLoader />
      ) : (
        <div className="w-[100%] h-[100%]">
          <div className="w-full flex justify-between items-center">
            <Typography variant="h6" className="!font-bold">
              User Management
            </Typography>
            <div className="flex gap-2 items-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                className="text-black flex gap-2 !rounded-md h-[40px] !text-[10px] sm:!text-sm"
                onClick={() => onDownloadData(dataUserList?.data)}
              >
                Download
              </Button>
              {role === "super_admin" && (
                <Button
                  onClick={() => {
                    router.push("/user-management/new?mode=add");
                    resetRegister();
                  }}
                  className="flex gap-2 text-white !bg-[#154940] hover:!bg-[#0e342d] !rounded-md h-[40px]"
                >
                  <AddIcon className="text-white text-[10px] sm:text-sm" />
                  <span className="text-white text-[10px] sm:text-sm">
                    Add Data
                  </span>
                </Button>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 py-6">
            <div className="w-full grid grid-cols-3 gap-5">
              {statisticsDataTop.map((item, index) => (
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
                <div className="flex max-w-lg w-[50%]">
                  <CInput
                    value={filter.search}
                    className="w-full"
                    onChange={(e) =>
                      setFilter({ ...filter, search: e.target.value })
                    }
                    placeholder="Search"
                  />
                </div>
                <div className="w-full flex gap-3">
                  <CAutoComplete
                    options={[
                      { label: "Head", value: "head" },
                      { label: "User", value: "user" },
                    ]}
                    className="w-full"
                    getOptionKey={(option) => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    onChange={(_, value) => {
                      setFilter({ ...filter, role: value?.value });
                    }}
                    getOptionLabel={(option) => option.label}
                    placeholder="Roles"
                  />
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
                  <CAutoComplete
                    options={siteOptions}
                    className="w-full"
                    getOptionKey={(option) => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    onChange={(_, value) => {
                      setFilter({ ...filter, site: value?.value });
                    }}
                    getOptionLabel={(option) => option.label}
                    placeholder="Site"
                  />
                </div>
              </div>
            </div>

            <DataGrid
              columnDefs={userListColumnDef}
              rowData={dataGrid}
              pagination={true}
              loading={isLoadingGetUserList || isLoadingDeleteUser}
            />
            {/* <PaginationComponent
              pagination={pagination}
              setPagination={setPagination}
              totalItems={dataUserList?.totalItems ?? 0}
              totalPages={dataUserList?.totalPages ?? 0}
              currentPage={dataUserList?.currentPage ?? 0}
            /> */}
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
