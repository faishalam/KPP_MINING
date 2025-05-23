"use client";
import * as XLSX from "xlsx";
import IconPencil from "@/assets/svg/icon-pencil.svg";
import { saveAs } from "file-saver";
import IconEye from "@/assets/svg/eye-icon.svg";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useAssetList from "@/api/asset/useAssetList";
import { useModalWarningInfo } from "@/components/componentsV2/atoms/modal-warning";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import useAddAsset from "@/api/asset/useAddAsset";
import { useQueryClient } from "react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useEditAsset from "@/api/asset/useEditAsset";
import { ValueGetterParams } from "@ag-grid-community/core";
import moment from "moment";
import Image from "next/image";
import useAssetById from "@/api/asset/useAssetById";
import {
  AssetFormInputs,
  AssetResponse,
  FotoAssetFormData,
  TAssetListCol,
  TypeDataAssetList,
} from "../types";
import { TMasterProgressCol } from "../../progress-management/types";
import useUploadFoto from "../../../../api/asset/useUploadFoto";
import useRootLayoutContext from "../../hooks";

const useAssetManagementHooks = () => {
  const { register, handleSubmit, control, reset } = useForm<AssetFormInputs>();
  const { role } = useRootLayoutContext();
  const {
    register: registerFoto,
    control: controlFoto,
    reset: resetFoto,
    handleSubmit: handleSubmitFoto,
  } = useForm<FotoAssetFormData>();
  const [openModalFoto, setOpenModalFoto] = useState<boolean>(false);
  const modalWarningInfo = useModalWarningInfo();
  const [pagination, setPagination] = useState({ page: 1, limit: 13 });
  const [filter, setFilter] = useState<{
    search: string;
    kodePN: string | null;
    actionPlan: string | null;
  }>({ search: "", kodePN: null, actionPlan: null });
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { id } = useParams();
  const {
    data: dataAssetList,
    isLoading: isLoadingDataAssetList,
    isFetching: isFetchingDataAssetList,
  } = useAssetList({
    params: {
      search: undefined,
      page: pagination.page,
      limit: pagination.limit,
    },
  });

  const dataGrid = useMemo(() => {
    const dataIncomingAsset = dataAssetList?.data?.filter(
      (item: TypeDataAssetList) => !item.fotoTandaTerima && !item.fotoAsset
    );

    const dataFilter = dataIncomingAsset?.filter((x: TypeDataAssetList) => {
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
      // search10;

      const byKodePN = filter.kodePN ? x.kodePN === filter.kodePN : true;
      const byActionPlan = filter.actionPlan
        ? x.actionPlan === filter.actionPlan
        : true;

      return search && byKodePN && byActionPlan;
    });
    return dataFilter;
  }, [dataAssetList, filter]);

  const dataGridCompletedAsset = useMemo(() => {
    const dataIncomingAsset = dataAssetList?.data?.filter(
      (item: TypeDataAssetList) => item.fotoTandaTerima && item.fotoAsset
    );

    const dataFilter = dataIncomingAsset?.filter((x: TypeDataAssetList) => {
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
      // search10;

      const byKodePN = filter.kodePN ? x.kodePN === filter.kodePN : true;
      const byActionPlan = filter.actionPlan
        ? x.actionPlan === filter.actionPlan
        : true;

      return search && byKodePN && byActionPlan;
    });
    return dataFilter;
  }, [dataAssetList, filter]);

  const {
    mutate: mutateAddAsset,
    isLoading: isLoadingAddAsset,
    error: errorAddAsset,
  } = useAddAsset({
    onSuccess: () => {
      queryClient.refetchQueries("useAssetList");
      queryClient.refetchQueries("useUserAssetList");
      reset();
      router.push("/asset-management/incoming");
      AlertSuccess("Successfully add asset");
    },
    onError: () => {
      AlertError(errorAddAsset as string);
    },
  });

  const { mutate: mutateEditAsset, isLoading: isLoadingEditAsset } =
    useEditAsset({
      onSuccess: () => {
        queryClient.refetchQueries("useUserAssetList");
        queryClient.refetchQueries("useAssetList");
        router.push("/asset-management/incoming");
        AlertSuccess("Edit Asset Successfully");
      },
      onError: (errorEditAsset: string) => {
        AlertError(errorEditAsset);
      },
    });

  const { mutate: mutateUploadFoto, isLoading: isLoadingUploadFoto } =
    useUploadFoto({
      onSuccess: () => {
        queryClient.refetchQueries("useAssetList");
        queryClient.refetchQueries("useAssetById");
        queryClient.refetchQueries("useUserAssetList");
        resetFoto();
        setOpenModalFoto(!openModalFoto);
        router.push("/asset-management/completed-asset");
        AlertSuccess("Upload Foto Successfully");
      },
      onError: (errorEditAsset: string) => {
        AlertError(errorEditAsset);
      },
    });

  const { data: dataAssetById, isLoadingDataAssetById } = useAssetById({
    params: {
      id:
        (typeof id === "string" || typeof id === "number") && !isNaN(Number(id))
          ? Number(id)
          : undefined,
    },
  });

  const onValidSubmit: SubmitHandler<AssetFormInputs> = (data) => {
    modalWarningInfo.open({
      title: "Confirm Save",
      message: (
        <div>
          <p>Are you sure you want to save this Progress?</p>
        </div>
      ),
      onConfirm: () => {
        if (mode === "add") {
          mutateAddAsset(data);
        } else {
          mutateEditAsset({ id, data });
        }
      },
    });
  };

  const onInvalidSubmit = (errors: FieldErrors<AssetFormInputs>) => {
    Object.entries(errors).forEach(([key, error]) => {
      console.log(key);
      if (error?.message) {
        AlertError(error.message);
      }
    });
  };

  const onSubmitFoto = (data: FotoAssetFormData) => {
    modalWarningInfo.open({
      title: "Confirm Save",
      message: (
        <div>
          <p>Are you sure you want to save this Asset Photo?</p>
        </div>
      ),
      onConfirm: () => {
        if (mode === "view") {
          mutateUploadFoto({ id: id, data: data });
        } else {
          mutateUploadFoto({ id: id, data: data });
        }
      },
    });
  };

  const handleCancel = () => {
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
          router.push("/asset-management");
        },
      });
    }
  };

  const assetListColumnDef = useMemo<TAssetListCol>(() => {
    return [
      {
        width: 90,
        headerName: "No",
        pinned: "left",
        valueGetter: (params: ValueGetterParams<AssetResponse>) =>
          (params.node?.rowIndex ?? 0) + 1,
      },
      {
        field: "assetNumber",
        headerName: "No Asset",
        width: 150,
      },
      {
        field: "site",
        headerName: "Site",
        width: 100,
      },
      {
        field: "namaAsset",
        headerName: "Nama Asset",
        width: 250,
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
        width: 100,
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
        width: 150,
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
        field: "statusApproval",
        headerName: "Status Approval",
        width: 200,
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
      },
      {
        field: "poReciept",
        headerName: "PO Reciept",
        width: 130,
        valueFormatter: (params: TAssetListCol) =>
          params.value
            ? `Rp ${Number(params.value).toLocaleString("id-ID")}`
            : " ",
      },
      {
        field: "fotoAsset",
        width: 150,
        headerName: "Foto Asset",
        cellRenderer: (params: ValueGetterParams<AssetFormInputs>) => {
          const imageSrc = params.data?.fotoAsset?.url;
          if (!imageSrc) return null;
          return (
            <Image
              src={imageSrc}
              alt="Foto Asset"
              width={70}
              height={70}
              unoptimized
            />
          );
        },
      },
      {
        field: "fotoTandaTerima",
        width: 150,
        headerName: "Foto Tanda Terima",
        cellRenderer: (params: ValueGetterParams<AssetFormInputs>) => {
          const imageSrc = params.data?.fotoTandaTerima?.url;
          if (!imageSrc) return null;
          return (
            <Image
              src={imageSrc}
              alt="Foto Tanda Terima"
              width={70}
              height={70}
              unoptimized
            />
          );
        },
      },
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
              {/* {role === "user_admin" && ( */}
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
                </>
              {/* )} */}
            </div>
          );
        },
      },
    ];
  }, [dataAssetList, dataGrid]);

  const progressListColumnDef = useMemo<TMasterProgressCol>(() => {
    return [
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
    ];
  }, [dataAssetById]);

  const statisticsDataTop = useMemo(
    () => [
      {
        count:
          dataAssetList?.data?.filter(
            (item: TypeDataAssetList) => item.fotoAsset && item.fotoTandaTerima
          )?.length || 0,
        label: "Asset Completed",
        bgColor: "from-[rgba(2,132,199,0.1)]",
      },
      {
        count:
          dataAssetList?.data?.filter(
            (item: TypeDataAssetList) =>
              !item.fotoAsset && !item.fotoTandaTerima
          )?.length || 0,
        label: "Asset Incoming",
        bgColor: "from-[rgba(250,204,21,0.1)]",
      },
      {
        count:
          dataAssetList?.data?.filter(
            (item: TypeDataAssetList) => item.statusApproval === "approved"
          )?.length || 0,
        label: "Asset Approved",
        bgColor: "from-[rgba(99,102,241,0.1)]",
      },
      {
        count:
          dataAssetList?.data?.filter(
            (item: TypeDataAssetList) => item.statusApproval === "waiting"
          )?.length || 0,
        label: "Asset Waiting",
        bgColor: "from-[rgba(22,163,74,0.1)]",
      },
    ],
    [dataAssetById?.progress, dataAssetList]
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
    { value: "HIGH PRIORITY", label: "HIGH PRIORITY" },
    { value: "CLOSED", label: "CLOSED" },
  ];

  const remarksOptions = [
    {value: "new_capex", label: "New Capex"},
    {value: "carry_over", label: "Carry Over"},
  ]

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
      saveAs(data, `asset-management.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((mode === "view" || mode === "edit") && dataAssetById) {
      reset(dataAssetById);
    } else {
      reset({});
    }
  }, [mode, dataAssetById]);

  return {
    assetListColumnDef,
    kodePNOptions,
    actionPlan,
    id,
    register,
    handleSubmit,
    onValidSubmit,
    control,
    onInvalidSubmit,
    pagination,
    onSubmitFoto,
    setPagination,
    dataAssetList,
    isLoadingDataAssetList,
    isFetchingDataAssetList,
    filter,
    dataGrid,
    setFilter,
    isLoadingAddAsset,
    isLoadingDataAssetById,
    dataAssetById,
    reset,
    handleCancel,
    statisticsDataTop,
    isLoadingEditAsset,
    mode,
    progressListColumnDef,
    onDownloadData,
    openModalFoto,
    setOpenModalFoto,
    registerFoto,
    controlFoto,
    handleSubmitFoto,
    isLoadingUploadFoto,
    dataGridCompletedAsset,
    remarksOptions
  };
};

const AssetManagementContext = createContext<
  ReturnType<typeof useAssetManagementHooks> | undefined
>(undefined);

export const AssetManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useAssetManagementHooks();
  return (
    <AssetManagementContext.Provider value={value}>
      {children}
    </AssetManagementContext.Provider>
  );
};

export const useAssetManagement = () => {
  const context = useContext(AssetManagementContext);
  if (!context) {
    throw new Error(
      "useAssetManagementContext must be used within an AssetManagementProvider"
    );
  }
  return context;
};

export default useAssetManagement;
