"use client";
import { useContext, createContext, useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import IconPencil from "@/assets/svg/icon-pencil.svg";
import DeleteIcon from "@/assets/svg/delete-icon.svg";
import IconEye from "@/assets/svg/eye-icon.svg";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useModalWarningInfo } from "@/components/componentsV2/atoms/modal-warning";
import { useQueryClient } from "react-query";
import useProgressList from "@/api/prgoress/useGetProgressList";
import useAddProgress from "@/api/prgoress/useAddProgress";
import useProgressById from "@/api/prgoress/useProgressById";
import useUpdateProgress from "@/api/prgoress/useUpdateProgress";
import useUpdateCapex from "@/api/prgoress/useUpdateCapex";
import useDeleteProgress from "@/api/prgoress/useDeleteProgress";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import { ValueGetterParams } from "@ag-grid-community/core";
import Image from "next/image";
import moment from "moment";
import { Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import useAssetById from "@/api/asset/useAssetById";
import { TInputsProgress, TMasterProgressCol, TMasterResponse } from "../types";
import useRootLayoutContext from "../../hooks";

const useProgressAssetManagementHooks = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const modalWarningInfo = useModalWarningInfo();
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );
  const searchParams = useSearchParams();
  const { role } = useRootLayoutContext();
  const [openModalProgressCapex, setOpenModalProgressCapex] =
    useState<boolean>(false);
  const mode = searchParams.get("mode");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [progressCapex, setProgressCapex] = useState<string>("");
  const [filter, setFilter] = useState<{
    search: string;
    department: string | null;
    cutoff_from: string | null;
    cutoff_to: string | null;
  }>({ search: "", department: null, cutoff_from: null, cutoff_to: null });
  const { id } = useParams();

  const {
    register: registerProgress,
    handleSubmit: handleSubmitProgress,
    formState: { errors: errorsProgress },
    reset: resetProgress,
    control: controlProgress,
  } = useForm<TInputsProgress>({
    defaultValues: {
      dept: "",
      projectNumber: "",
      projectDescription: "",
      totalBudget: "",
      totalRecipt: "",
      totalPr: "",
      balance: "",
      bulanRealisasi: new Date(),
      remarks: "",
      progressCapex: "",
      posisiUnit: "",
      poOutstanding: "",
      prOutstanding: "",
      checked: false,
    },
  });

  const { data: dataProgressList, isLoading: isLoadingProgressList } =
    useProgressList({
      params: {
        search: undefined,
        page: pagination?.page || 1,
        limit: pagination?.limit || 1000,
      },
    });

  const dataGrid = useMemo(() => {
    const dataFilter = dataProgressList?.data?.filter((x: TInputsProgress) => {
      const search1 = x.dept
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search2 = x.projectNumber
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search3 = x.projectDescription
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search4 = x.remarks
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search5 = x.progressCapex
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search6 = x.posisiUnit
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search =
        search1 || search2 || search3 || search4 || search5 || search6;

      const byDepartments = filter.department
        ? x.dept === filter.department
        : true;

      let isCutoffInRange = true;
      if (x.bulanRealisasi) {
        const createdDate =
          x.bulanRealisasi instanceof Date
            ? x.bulanRealisasi.toISOString().substring(0, 10)
            : new Date(x.bulanRealisasi).toISOString().substring(0, 10);

        isCutoffInRange =
          (!filter.cutoff_from ||
            filter.cutoff_from === "" ||
            createdDate >= filter.cutoff_from) &&
          (!filter.cutoff_to ||
            filter.cutoff_to === "" ||
            createdDate <= filter.cutoff_to);
      }
      return search && byDepartments && isCutoffInRange;
    });
    return dataFilter;
  }, [dataProgressList, filter]);

  const { mutate: mutateProgress, isLoading: isLoadingAddProgress } =
    useAddProgress({
      onSuccess: () => {
        queryClient.refetchQueries("useProgressList");
        resetProgress();
        router.push("/progress-management");
        AlertSuccess("Progress added successfully");
      },
      onError: (error: string) => {
        AlertError(error);
      },
    });

  const { data: dataProgressById, isLoadingProgressById } = useProgressById({
    params: {
      id:
        (typeof id === "string" || typeof id === "number") &&
        mode !== "add" &&
        mode !== "edit" &&
        !isNaN(Number(id))
          ? Number(id)
          : undefined,
    },
  });

  const { mutate: mutateEditProgress, isLoading: isLoadingMutateEdit } =
    useUpdateProgress({
      onSuccess: () => {
        queryClient.refetchQueries("useProgressList");
        resetProgress();
        router.push("/progress-management");
        AlertSuccess("Updated data successfully");
      },
      onError: (error: string) => {
        AlertError(error);
      },
    });

  const { mutate: mutateEditCapex, isLoading: isLoadingMutateEditCapex } =
    useUpdateCapex({
      onSuccess: () => {
        queryClient.refetchQueries("useProgressList");
        setOpenModalProgressCapex(!openModalProgressCapex);
        router.push("/progress-management");
        AlertSuccess("Updated capex successfully");
      },
      onError: (error: string) => {
        AlertError(error);
      },
    });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteProgress({
      onSuccess: () => {
        queryClient.refetchQueries("useProgressList");
        AlertSuccess("Delete progress capex successfully");
      },
      onError: (errorDeleteAsset: string) => {
        AlertError(errorDeleteAsset);
      },
    });

  const { data: dataAssetById, isLoading: isLoadingDataAssetById } =
    useAssetById({
      params: {
        id: id || undefined,
      },
    });

  const onValidSubmit: SubmitHandler<TInputsProgress> = (data) => {
    modalWarningInfo.open({
      title: "Confirm Save",
      message: (
        <div>
          <p>Are you sure you want to save this Progress?</p>
        </div>
      ),
      onConfirm: () => {
        if (mode === "add") {
          mutateProgress(data);
        } else {
          mutateEditProgress({ id, data });
        }
      },
    });
  };

  const onInvalidSubmit = (errors: FieldErrors<TInputsProgress>) => {
    Object.entries(errors).forEach(([key, error]) => {
      console.log(key);
      if (error?.message) {
        AlertError(error.message);
      }
    });
  };

  const handleCancelProgress = () => {
    if (mode === "view") {
      router.back();
    } else {
      modalWarningInfo.open({
        title: "Confirm Cancelation",
        message: (
          <div>
            <p>
              Are you sure you want to cancel the creation of this data, the
              data will not be saved.
            </p>
          </div>
        ),
        onConfirm: () => {
          router.push("/progress-management");
        },
      });
    }
  };

  const progressListColumnDef = useMemo<TMasterProgressCol>(() => {
    return [
      {
        width: 80,
        pinned: "left",
        hide: role !== "super_admin",
        sortable: false,
        cellRenderer: (params: ValueGetterParams<TInputsProgress>) => {
          return (
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
          );
        },
      },
      {
        width: 90,
        headerName: "No",
        pinned: "left",
        valueGetter: (params: ValueGetterParams<TMasterResponse>) =>
          (params.node?.rowIndex ?? 0) + 1,
      },
      {
        field: "assetNumber",
        headerName: "No Asset",
        width: 200,
      },
      {
        field: "dept",
        headerName: "Department",
        width: 200,
      },
      {
        field: "projectNumber",
        headerName: "Proejct Number",
        width: 200,
      },
      {
        field: "projectDescription",
        headerName: "Project Description",
        width: 250,
      },
      {
        field: "totalBudget",
        headerName: "Jumlah Sebesar Total Budget",
        width: 200,
        valueFormatter: (params: TMasterProgressCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "totalRecipt",
        headerName: "Jumlah Sebesar Total PO Recipt",
        width: 200,
        valueFormatter: (params: TMasterProgressCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "totalPr",
        headerName: "Jumlah Sebesar Total PR/PO",
        width: 200,
        valueFormatter: (params: TMasterProgressCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "balance",
        headerName: "Jumlah Sebesar End Balance",
        width: 200,
        valueFormatter: (params: TMasterProgressCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "prOutstanding",
        headerName: "PR Outstanding",
        width: 200,
        valueFormatter: (params: TMasterProgressCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "poOutstanding",
        headerName: "PO Outstanding",
        width: 200,
        valueFormatter: (params: TMasterProgressCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : "Rp 0",
      },
      {
        field: "bulanRealisasi",
        headerName: "Bulan Realisasi",
        width: 150,
        valueFormatter: (params: TMasterProgressCol) => {
          if (!params.value) return "";
          return moment(params.value).format("DD/MM/YYYY");
        },
      },
      {
        field: "remarks",
        headerName: "Remarks",
        width: 200,
      },
      {
        field: "progressCapex",
        headerName: "Progress Capex",
        width: 200,
      },
      {
        field: "posisiUnit",
        headerName: "Posisi Unit",
        width: 200,
      },
      {
        width: 130,
        headerName: "Action",
        pinned: "right",
        sortable: false,
        cellRenderer: (params: ValueGetterParams<TInputsProgress>) => {
          return (
            <div className="flex gap-1 py-1 items-center justify-center">
              <div className="cursor-pointer">
                <Image
                  onClick={() => {
                    if (params?.data) {
                      resetProgress(params?.data);
                      router.push(
                        `/progress-management/incoming/${params?.data.id}?mode=view`
                      );
                    }
                  }}
                  src={IconEye}
                  alt="view"
                />
              </div>
              {role === "super_admin" && (
                <>
                  <div className="cursor-point">
                    <Image
                      onClick={() => {
                        if (params?.data) {
                          resetProgress(params?.data);
                          router.push(
                            `/progress-management/incoming/${params?.data.id}?mode=edit`
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
                                  Are you sure you want to delete this Progress
                                  Asset?
                                </p>
                              </div>
                            ),
                            onConfirm: () => {
                              mutateDelete(params?.data?.id);
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
  }, [dataProgressList, selectedIds]);

  const onSubmitUpdateCapex = () => {
    if (progressCapex === "") {
      return toast.error("Progress Capex is required");
    }
    mutateEditCapex({
      data: { id: selectedIds, progressCapex },
    });
  };

  const departmentOptions = [
    { value: "PLANT", label: "PLANT" },
    { value: "SM", label: "SM" },
    { value: "ENG", label: "ENG" },
    { value: "PROD", label: "PROD" },
    { value: "HCGS", label: "HCGS" },
    { value: "FAT", label: "FAT" },
    { value: "ICT", label: "ICT" },
    { value: "SHE", label: "SHE" },
  ];

  const statisticsDataTop = useMemo(
    () => [
      {
        count: isNaN(Number(dataProgressList?.totalItems))
          ? 0
          : Number(dataProgressList?.totalItems),
        label: "Total Progress",
        bgColor: "from-[rgba(2,132,199,0.1)]",
      },
      {
        count: new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(
          Array.isArray(dataProgressList?.data)
            ? dataProgressList.data.reduce(
                (acc: number, item: TInputsProgress) => {
                  const budget = Number(item.totalBudget);
                  return acc + (isNaN(budget) ? 0 : budget);
                },
                0
              )
            : 0
        ),
        label: "Total Budget",
        bgColor: "from-[rgba(250,204,21,0.1)]",
      },
      {
        count: new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(
          Array.isArray(dataProgressList?.data)
            ? dataProgressList.data.reduce(
                (acc: number, item: TInputsProgress) => {
                  const balance = Number(item.balance);
                  return acc + (isNaN(balance) ? 0 : balance);
                },
                0
              )
            : 0
        ),
        label: "Total End Balance",
        bgColor: "from-[rgba(22,163,74,0.1)]",
      },
      {
        count: new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(
          Array.isArray(dataProgressList?.data)
            ? dataProgressList.data.reduce(
                (acc: number, item: TInputsProgress) => {
                  const totalRecipt = Number(item.totalRecipt);
                  return acc + (isNaN(totalRecipt) ? 0 : totalRecipt);
                },
                0
              )
            : 0
        ),
        label: "Total PO Recipt",
        bgColor: "from-[rgba(45,212,191,0.1)]",
      },
    ],
    [dataProgressList]
  );

  const onDownloadData = (dataProgressList: TInputsProgress[]) => {
    try {
      const d = dataProgressList?.map((capex) => {
        return {
          "No Asset": capex.assetNumber,
          Department: capex.dept,
          "Project Number": capex.projectNumber,
          "Project Description": capex.projectDescription,
          "Jumlah Sebesar Total Budget": capex.totalBudget,
          "Jumlah Sebesar Total PO Recipt": capex.totalRecipt,
          "Jumlah Sebesar Total PR": capex.totalPr,
          "Jumlah Sebesar Balance": capex.balance,
          "Bulan Realisasi": capex.bulanRealisasi,
          "Progress Capex": capex.progressCapex,
          "Posisi Unit": capex.posisiUnit,
          "PR Outstanding": capex.prOutstanding,
          "PO Outstanding": capex.poOutstanding,
          Remarks: capex.remarks,
        };
      });
      const ws = XLSX.utils.json_to_sheet(d);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, `progress-management.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((mode === "view" || mode === "edit") && dataProgressById) {
      resetProgress(dataProgressById);
    } else {
      resetProgress({});
    }
  }, [mode, dataProgressById]);

  useEffect(() => {
    if (mode === "add" && dataAssetById) {
      resetProgress({
        projectDescription: dataAssetById.namaAsset || "",
        assetNumber: dataAssetById.assetNumber || "",
        bulanRealisasi: dataAssetById?.planRealisasi || "",
        dept: dataAssetById?.userDept.toUpperCase() || "",
      });
    }
  }, [mode, dataAssetById]);

  return {
    registerProgress,
    isLoadingProgressList,
    dataProgressList,
    progressListColumnDef,
    pagination,
    setPagination,
    resetProgress,
    mode,
    isLoadingAddProgress,
    controlProgress,
    onSubmitUpdateCapex,
    isLoadingProgressById,
    mutateEditProgress,
    handleSubmitProgress,
    isLoadingMutateEdit,
    isLoadingDelete,
    onValidSubmit,
    onInvalidSubmit,
    handleCancelProgress,
    errorsProgress,
    departmentOptions,
    selectedIds,
    openModalProgressCapex,
    setOpenModalProgressCapex,
    progressCapex,
    setProgressCapex,
    isLoadingMutateEditCapex,
    dataGrid,
    filter,
    setFilter,
    statisticsDataTop,
    onDownloadData,
    isLoadingDataAssetById,
  };
};

const ProgressAssetManagementContext = createContext<
  ReturnType<typeof useProgressAssetManagementHooks> | undefined
>(undefined);

export const ProgressAssetManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useProgressAssetManagementHooks();
  return (
    <ProgressAssetManagementContext.Provider value={value}>
      {children}
    </ProgressAssetManagementContext.Provider>
  );
};

export const useProgressAssetManagement = () => {
  const context = useContext(ProgressAssetManagementContext);
  if (context === undefined) {
    throw new Error(
      "useProgressAssetManagementHooks must be used within an ProgressAssetProvider"
    );
  }
  return context;
};

export default useProgressAssetManagement;
