"use client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import useApproveAsset from "@/api/asset/useApproveAsset";
import IconPencil from "@/assets/svg/icon-pencil.svg";
import DeleteIcon from "@/assets/svg/delete-icon.svg";
import IconEye from "@/assets/svg/eye-icon.svg";
import useAssetById from "@/api/asset/useAssetById";
import useDeleteAsset from "@/api/asset/useDeleteAsset";
import useEditAsset from "@/api/asset/useEditAsset";
import useUppdateActionAsset from "@/api/asset/useUpdateActionAsset";
import useUserAssetList from "@/api/asset/useUserAssetList";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import { useRootLayoutContext } from "@/providers/rootProviders/RootLayoutProviders";
import { ValueGetterParams } from "@ag-grid-community/core";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import {
  AssetFormInputs,
  AssetResponse,
  TAssetListCol,
  TypeDataAssetList,
} from "../types";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useModalWarningInfo } from "@/components/componentsV2/atoms/modal-warning";
import { Checkbox } from "@mui/material";

const useAssetOnDepartmentHooks = () => {
  const { reset } = useForm<AssetFormInputs>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const modalWarningInfo = useModalWarningInfo();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { role } = useRootLayoutContext();
  const [openModalCancel, setOpenModalCancel] = useState<{
    id: string | undefined;
    show: boolean;
  }>({ id: undefined, show: false });
  const [openModalHold, setOpenModalHold] = useState<{
    id: string | undefined;
    show: boolean;
  }>({ id: undefined, show: false });
  const pathName = usePathname();
  const id = useMemo(() => {
    const lastPath = pathName.split("/").pop();
    if (lastPath === "new") {
      return null;
    }
    return lastPath;
  }, [pathName]);
  const [filter, setFilter] = useState<{
    search: string;
    kodePN: string | null;
    actionPlan: string | null;
  }>({ search: "", kodePN: null, actionPlan: null });
  const {
    data: dataUserAssetList,
    isLoading: isLoadingDataUserAssetList,
    isFetching: isFetchingDataUserAssetList,
  } = useUserAssetList({
    params: {
      search: undefined,
      page: 1,
      limit: 13,
      enabled: false,
      filter: role || null,
    },
  });

  const dataGrid = useMemo(() => {
    const dataFilter = dataUserAssetList?.data?.filter(
      (x: TypeDataAssetList) => {
        const search1 = x.site
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search2 = x.namaAsset
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search3 = x.kodePN
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search4 = x.remark
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search5 = x.actionPlan
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search6 = x.areaKerja
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search7 = x.benefit
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search8 = x.User?.username
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search9 = x.statusApproval
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const search10 = x.assetNumber
          .toLowerCase()
          .includes(filter.search.toLowerCase());

        // const search10 = x.keterangan
        //   .toLowerCase()
        //   .includes(filter.search.toLowerCase());
        const search =
          search1 ||
          search2 ||
          search3 ||
          search4 ||
          search5 ||
          search6 ||
          search7 ||
          search8 ||
          search9 ||
          search10;

        const byKodePN = filter.kodePN ? x.kodePN === filter.kodePN : true;
        const byActionPlan = filter.actionPlan
          ? x.actionPlan === filter.actionPlan
          : true;

        return search && byKodePN && byActionPlan;
      }
    );
    return dataFilter;
  }, [dataUserAssetList, filter]);

  const { data: dataAssetById, isLoading: isLoadingDataAssetById } =
    useAssetById({
      params: {
        id: id || undefined,
      },
    });

  const { mutate: mutateEditAsset, isLoading: isLoadingEditAsset } =
    useEditAsset({
      onSuccess: () => {
        queryClient.refetchQueries("useUserAssetList");
        queryClient.refetchQueries("useAssetList");
        AlertSuccess("Edit Asset Successfully");
      },
      onError: (errorEditAsset: string) => {
        AlertError(errorEditAsset);
      },
    });

  const { mutate: mutateDeleteAsset, isLoading: isLoadingDeleteAsset } =
    useDeleteAsset({
      onSuccess: () => {
        queryClient.refetchQueries("useUserAssetList");
        queryClient.refetchQueries("useAssetList");
        AlertSuccess("Delete Asset Successfully");
      },
      onError: (errorDeleteAsset: string) => {
        AlertError(errorDeleteAsset);
      },
    });

  const { mutate: mutateApproveAsset, isLoading: isLoadingApproveAsset } =
    useApproveAsset({
      onSuccess: () => {
        queryClient.refetchQueries("useUserAssetList");
        queryClient.refetchQueries("useAssetList");
        AlertSuccess("Approve Asset Successfully");
        setSelectedIds([]);
      },
      onerror: (errorApproveAsset: string) => {
        AlertError(errorApproveAsset);
      },
    });

  const {
    mutate: mutateUpdateActionAsset,
    isLoading: isLoadingUpdateActionAsset,
  } = useUppdateActionAsset({
    onSuccess: () => {
      queryClient.refetchQueries("useUserAssetList");
      queryClient.refetchQueries("useAssetList");
      AlertSuccess("Update Action Asset Successfully");
    },
    onError: (errorUpdateActionAsset: string) => {
      AlertError(errorUpdateActionAsset);
    },
  });

  const handleUpdateAction = (id: string, statusRealisasi: string) => {
    if (statusRealisasi === "worked") {
      modalWarningInfo.open({
        title: "Confirm Update",
        message: (
          <div>
            <p>Are you sure you want to Update this Asset?</p>
          </div>
        ),
        onConfirm: () => {
          mutateUpdateActionAsset({
            id: id,
            payload: {
              keterangan: "working on",
              statusRealisasi: statusRealisasi,
            },
          });
        },
      });
    }
    if (statusRealisasi === "canceled") {
      setOpenModalCancel({ show: true, id: id });
    }
    if (statusRealisasi === "hold") {
      setOpenModalHold({ show: true, id: id });
    }
  };

  const assetOnDepartmentColumnDef = useMemo<TAssetListCol>(() => {
    return [
      {
        width: 80,
        pinned: "left",
        hide: role === "user",
        sortable: false,
        cellRenderer: (params: ValueGetterParams<TypeDataAssetList>) => {
          return (
            <div
              className={`${
                params?.data?.statusApproval === "approved" ? "hidden" : ""
              }`}
            >
              <Checkbox
                checked={selectedIds.includes(params.data?.id || "")}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedIds((prevSelectedIds) => {
                    if (checked) {
                      return [...prevSelectedIds, params.data?.id || ""];
                    } else {
                      return prevSelectedIds.filter(
                        (id) => id !== params.data?.id
                      );
                    }
                  });
                }}
              />
            </div>
          );
        },
      },
      {
        width: 90,
        headerName: "No",
        pinned: "left",
        valueGetter: (params: ValueGetterParams<AssetResponse>) =>
          (params.node?.rowIndex ?? 0) + 1,
      },
      {
        field: "site",
        headerName: "Site",
        width: 200,
      },
      {
        field: "assetNumber",
        headerName: "No Asset",
        width: 150,
      },
      {
        field: "namaAsset",
        headerName: "Nama Asset",
        width: 200,
      },
      {
        field: "kodePN",
        headerName: "Kode PN",
        width: 200,
      },
      {
        field: "nilaiAsset",
        headerName: "Nilai Asset",
        width: 200,
        valueFormatter: (params: TAssetListCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "quantityAsset",
        headerName: "Quantity",
        width: 200,
      },
      {
        field: "totalNilaiAsset",
        headerName: "Total Nilai Asset",
        width: 200,
        valueFormatter: (params: TAssetListCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "actionPlan",
        headerName: "actionPlan",
        width: 200,
      },
      {
        field: "userDept",
        headerName: "User Dept",
        width: 200,
      },
      {
        field: "depresiasi",
        headerName: "Depresiasi",
        width: 200,
      },
      {
        field: "remark",
        headerName: "Remarks",
        width: 200,
      },
      {
        field: "areaKerja",
        headerName: "Area Kerja",
        width: 200,
      },
      {
        field: "benefit",
        headerName: "Benefit",
        width: 200,
      },
      {
        field: "by",
        headerName: "Submitted By",
        width: 200,
        cellRenderer: (params: TAssetListCol) => {
          return (
            <i className="text-gray-500">
              {params.data?.User?.username || "-"}
            </i>
          );
        },
      },
      {
        field: "planRealisasi",
        headerName: "Plan Realisasi",
        width: 200,
        valueFormatter: (params: TAssetListCol) => {
          if (!params.value) return "";
          return moment(params.value).format("DD/MM/YYYY");
        },
      },
      {
        field: "realisasiAsset",
        headerName: "Realisasi Asset",
        width: 200,
        valueFormatter: (params: TAssetListCol) => {
          if (!params.value) return "";
          return moment(params.value).format("DD/MM/YYYY");
        },
      },
      {
        field: "keterangan",
        headerName: "Keterangan",
        width: 200,
        cellRendered: (params: ValueGetterParams<TypeDataAssetList>) => {
          <div className="min-w-[100px] text-gray-500 flex items-center space-x-2">
            {params?.data?.statusRealisasi !== "realisasi waiting" && (
              <div
                className={`p-1 rounded-full ${
                  params?.data?.statusRealisasi === "worked"
                    ? "bg-green-400"
                    : params?.data?.statusRealisasi === "hold"
                    ? "bg-gray-400"
                    : "bg-red-400"
                }`}
              ></div>
            )}
            <div>{params?.data?.keterangan}</div>
          </div>;
        },
      },
      {
        field: "statusApproval",
        headerName: "Status",
        width: 100,
        pinned: "right",
      },
      ...(role === "user"
        ? [
            {
              width: 200,
              headerName: "Status Realisasi",
              pinned: "right",
              cellRenderer: (params: ValueGetterParams<TypeDataAssetList>) => {
                // Define status styling based on the status value
                // const getStatusStyle = (status: string) => {
                //   switch (status) {
                //     case "worked":
                //       return "bg-green-200 text-green-700";
                //     case "canceled":
                //       return "bg-red-200 text-red-700";
                //     case "hold":
                //       return "bg-gray-200 text-gray-700";
                //     default:
                //       return "bg-blue-200 text-blue-700";
                //   }
                // };
                if (
                  params?.data?.statusRealisasi !== "realisasi waiting" &&
                  params?.data
                ) {
                  return (
                    <div
                    // className={`${getStatusStyle(
                    //   params?.data?.statusRealisasi
                    // )} text-xs p-2 rounded-xl text-center`}
                    >
                      {params?.data?.statusRealisasi || ""}
                    </div>
                  );
                }

                // For statuses that need action buttons
                return (
                  <div className="flex gap-1">
                    <button
                      className="bg-green-700 hover:bg-green-800 text-white text-xs py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        const id = params?.data?.id;
                        if (id) {
                          handleUpdateAction(id, "worked");
                        }
                      }}
                    >
                      Worked
                    </button>
                    <button
                      className="bg-red-700 hover:bg-red-800 text-white text-xs py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        const id = params?.data?.id;
                        if (id) {
                          handleUpdateAction(id, "canceled");
                        }
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        const id = params?.data?.id;
                        if (id) {
                          handleUpdateAction(id, "hold");
                        }
                      }}
                    >
                      Hold
                    </button>
                  </div>
                );
              },
            },
          ]
        : []),
      {
        width: 130,
        headerName: "Action",
        pinned: "right",
        sortable: false,
        cellRenderer: (params: ValueGetterParams<TypeDataAssetList>) => {
          return (
            <div className="flex gap-1 py-1 items-center justify-center">
              <div className="cursor-pointer">
                <Image
                  onClick={() => {
                    if (params?.data) {
                      reset(params?.data);
                      router.push(
                        `/asset-management/incoming/${params?.data.id}?mode=view`
                      );
                    }
                  }}
                  src={IconEye}
                  alt="view"
                />
              </div>

              {role === "user" && (
                <>
                  <div className="cursor-point">
                    <Image
                      onClick={() => {
                        if (params?.data) {
                          reset(params?.data);
                          router.push(
                            `/asset-management/incoming/${params?.data.id}?mode=edit`
                          );
                        }
                      }}
                      src={IconPencil}
                      alt="edit"
                    />
                  </div>
                  <div className="cursor-point">
                    <Image
                      onClick={() => {
                        if (params?.data) {
                          modalWarningInfo.open({
                            title: "Confirm Delete",
                            message: (
                              <div>
                                <p>
                                  Are you sure you want to delete this user?
                                </p>
                              </div>
                            ),
                            onConfirm: () => {
                              mutateDeleteAsset(params?.data?.id);
                            },
                          });
                        }
                      }}
                      src={DeleteIcon}
                      alt="delete"
                    />
                  </div>
                </>
              )}
            </div>
          );
        },
      },
    ];
  }, [dataGrid, selectedIds]);

  const statisticsDataTop = useMemo(
    () => [
      {
        count: isNaN(Number(dataUserAssetList?.totalItems))
          ? 0
          : Number(dataUserAssetList?.totalItems),
        label: "Total Asset",
        bgColor: "from-[rgba(2,132,199,0.1)]",
      },
      {
        count:
          dataUserAssetList?.data?.filter(
            (item: TypeDataAssetList) => item.statusApproval === "approved"
          )?.length || 0,
        label: "Asset Approved",
        bgColor: "from-[rgba(250,204,21,0.1)]",
      },
      {
        count:
          dataUserAssetList?.data?.filter(
            (item: TypeDataAssetList) => item.statusApproval === "waiting"
          )?.length || 0,
        label: "Asset Waiting",
        bgColor: "from-[rgba(22,163,74,0.1)]",
      },
    ],
    [dataUserAssetList]
  );

  const kodePNOptions = [
    { value: "WORKSHOP", label: "WORKSHOP" },
    { value: "FIXTURE N FITTING", label: "FIXTURE N FITTING" },
    { value: "BUILDING", label: "BUILDING" },
    { value: "COMPUTER EQUIPMENT", label: "COMPUTER EQUIPMENT" },
    { value: "SAFETY EQUIPMENT", label: "SAFETY EQUIPMENT" },
    { value: "OFFICE EQUIPMENT", label: "OFFICE EQUIPMENT" },
    { value: "LEASEHOLD", label: "LEASEHOLD" },
    { value: "PRODUCTION EQUIPMENT", label: "PRODUCTION EQUIPMENT" },
    { value: "SUPPORT EQUIPMENT", label: "SUPPORT EQUIPMENT" },
    { value: "ENGINEERING EQUIPMENT", label: "ENGINEERING EQUIPMENT" },
  ];

  const actionPlan = [
    { value: "HIGH PRIORIRY", label: "HIGH PRIORIRY" },
    { value: "CLOSED", label: "CLOSED" },
  ];

  const handleApproveAsset = (id: string[]) => {
    modalWarningInfo.open({
      title: "Confirm Save",
      message: (
        <div>
          <p>Are you sure you want to Approve this Asset?</p>
        </div>
      ),
      onConfirm: () => {
        mutateApproveAsset(id);
      },
    });
  };

  const onDownloadData = (dataAsset: TypeDataAssetList[]) => {
    try {
      const d = dataAsset?.map((asset) => {
        return {
          "No Asset": asset?.assetNumber,
          Site: asset?.site,
          "Nama Asset": asset?.namaAsset,
          "Kode PN": asset?.kodePN,
          "Nilai Asset": asset?.nilaiAsset,
          Quantity: asset?.quantityAsset,
          "Total Nilai Asset": asset?.nilaiAsset,
          "Action Plan": asset?.actionPlan,
          "User Dept": asset?.userDept,
          Depresiasi: asset?.depresiasi,
          Remarks: asset?.remark,
          "Area Kerja": asset?.areaKerja,
          Benefit: asset?.benefit,
          "Status Approval": asset?.statusApproval,
          "Plan Realisasi": asset?.planRealisasi,
          "Realisasi Asset": asset?.realisasiAsset,
          Keterangan: asset?.keterangan,
        };
      });
      const ws = XLSX.utils.json_to_sheet(d);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, `asset-dept-management.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    statisticsDataTop,
    onDownloadData,
    kodePNOptions,
    actionPlan,
    dataUserAssetList,
    isLoadingDataUserAssetList,
    isFetchingDataUserAssetList,
    dataAssetById,
    isLoadingDataAssetById,
    mutateEditAsset,
    isLoadingEditAsset,
    mutateDeleteAsset,
    isLoadingDeleteAsset,
    mutateApproveAsset,
    isLoadingApproveAsset,
    mutateUpdateActionAsset,
    isLoadingUpdateActionAsset,
    dataGrid,
    setFilter,
    assetOnDepartmentColumnDef,
    reset,
    filter,
    selectedIds,
    handleApproveAsset,
    openModalCancel,
    setOpenModalCancel,
    openModalHold,
    setOpenModalHold,
  };
};

const AssetOnDepartmentContext = createContext<
  ReturnType<typeof useAssetOnDepartmentHooks> | undefined
>(undefined);

export const AssetOnDepartmentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useAssetOnDepartmentHooks();
  return (
    <AssetOnDepartmentContext.Provider value={value}>
      {children}
    </AssetOnDepartmentContext.Provider>
  );
};

export const useAssetOnDepartment = () => {
  const context = useContext(AssetOnDepartmentContext);
  if (!context) {
    throw new Error(
      "useAssetOnDepartmentContext must be used within an AssetOnDepartmentProvider"
    );
  }
  return context;
};

export default useAssetOnDepartment;
