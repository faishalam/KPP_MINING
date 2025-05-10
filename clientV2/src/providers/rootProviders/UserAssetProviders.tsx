"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useUserAssetList from "../../api/asset/useUserAssetList";
import useDeleteAsset from "../../api/asset/useDeleteAsset";
import useEditAsset from "../../api/asset/useEditAsset";
import useAssetById from "../../api/asset/useAssetById";
import useUpdateActionAsset from "../../api/asset/useUpdateActionAsset";
import useApproveAsset from "../../api/asset/useApproveAsset";
import Swal from "sweetalert2";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import { useQueryClient } from "react-query";

export type InputsSearch = {
  search: string;
};

export interface AssetFormInputs {
  namaAsset: string;
  kodePN: string;
  nilaiAsset: number;
  quantityAsset: number;
  actionPlan: string;
  remark: string;
  areaKerja: string;
  benefit: string;
  planRealisasi: string;
}

export interface TypeYourDataAssetList {
  no: number;
  index: number;
  id: number;
  site: string;
  namaAsset: string;
  kodePN: string;
  nilaiAsset: number;
  quantityAsset: number;
  totalNilaiAsset: number;
  actionPlan: string;
  userDept: string;
  depresiasi: number;
  remark: string;
  areaKerja: string;
  benefit: string;
  planRealisasi: string;
  realisasiAsset: string;
  statusApproval: string;
  statusRealisasi: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  keterangan: string;
  User: {
    username: string;
  };
}

export interface YourDataAssetResponse {
  data: TypeYourDataAssetList[];
  totalItems: number | undefined;
  totalPages: number | undefined;
  currentPage: number | undefined;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  district: string;
  department: string;
  site: string;
  createdAt: string;
  updatedAt: string;
}

export interface payloadMutate {
  id: number;
  payload: {
    id: number | undefined;
    keterangan: string | undefined;
    statusRealisasi: string | undefined;
    planRealisasi: string | undefined;
  };
}

interface UserAssetContextProps {
  dataUserAssetList?: YourDataAssetResponse;
  isLoadingDataUserAssetList: boolean;
  setSearchAsset: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; limit: number }>
  >;
  pagination: { page: number; limit: number };
  searchAsset: string | undefined;
  register: UseFormReturn<InputsSearch>["register"];
  handleSubmit: UseFormReturn<InputsSearch>["handleSubmit"];
  onSubmit: (data: InputsSearch) => void;
  isLoadingDeleteAsset: boolean;
  mutateDeleteAsset: (id: number) => void;
  openModalEdit: boolean;
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  registerEdit: UseFormReturn<AssetFormInputs>["register"];
  handleSubmitEdit: UseFormReturn<AssetFormInputs>["handleSubmit"];
  errors: UseFormReturn<AssetFormInputs>["formState"]["errors"];
  dataAssetById?: TypeYourDataAssetList;
  isLoadingDataAssetById?: boolean;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number | null;
  reset: UseFormReturn<AssetFormInputs>["reset"];
  onSubmitEdit: (data: AssetFormInputs) => void;
  isLoadingEditAsset: boolean;
  handleDeleteYourAsset: (id: number) => void;
  isLoadingApproveAsset: boolean;
  mutateApproveAsset: (id: number) => void;
  mutateUpdateActionAsset: (params: {
    id: number | undefined;
    payload: {
      keterangan?: string | undefined;
      statusRealisasi?: string | undefined;
      planRealisasi?: string | undefined;
    };
  }) => void;
  isLoadingUpdateActionAsset: boolean;
  isFetchingDataUserAssetList: boolean;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

interface UserAssetProviderContext {
  children: ReactNode;
}

const UserAssetContext = createContext<UserAssetContextProps | undefined>(
  undefined
);

function useUserAssetContext() {
  const context = useContext(UserAssetContext);
  if (!context) {
    throw new Error(
      "UserAssetContext must be used within an UserAssetProvider"
    );
  }
  return context;
}

const UserAssetProvider = ({ children }: UserAssetProviderContext) => {
  const { register, handleSubmit } = useForm<InputsSearch>();
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors },
    reset,
  } = useForm<AssetFormInputs>({
    defaultValues: {
      namaAsset: "",
      kodePN: "",
      nilaiAsset: 0,
      quantityAsset: 0,
      actionPlan: "",
      remark: "",
      areaKerja: "",
      benefit: "",
      planRealisasi: "",
    },
  });
  const [searchAsset, setSearchAsset] = useState<string>("");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 13 }
  );

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>("");

  const queryClient = useQueryClient();

  const {
    data: dataUserAssetList,
    isLoading: isLoadingDataUserAssetList,
    isFetching: isFetchingDataUserAssetList,
  } = useUserAssetList({
    params: {
      search: searchAsset || undefined,
      page: pagination.page || 1,
      limit: pagination.limit || 13,
      enabled: false,
      filter: role || null,
    },
  });

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
        setOpenModalEdit(false);
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
      },
      onerror: (errorApproveAsset: string) => {
        AlertError(errorApproveAsset);
      },
    });

  const {
    mutate: mutateUpdateActionAsset,
    isLoading: isLoadingUpdateActionAsset,
  } = useUpdateActionAsset({
    onSuccess: () => {
      queryClient.refetchQueries("useUserAssetList");
      queryClient.refetchQueries("useAssetList");
      AlertSuccess("Update Action Asset Successfully");
    },
    onError: (errorUpdateActionAsset: string) => {
      AlertError(errorUpdateActionAsset);
    },
  });

  //search asset
  const onSubmit = (data: InputsSearch) => {
    const { search } = data;
    setSearchAsset(search);
    setPagination({ page: 1, limit: pagination.limit });
  };

  //onSubmitEdit
  const onSubmitEdit = (data: AssetFormInputs) => {
    const {
      kodePN,
      actionPlan,
      remark,
      areaKerja,
      benefit,
      planRealisasi,
      namaAsset,
      nilaiAsset,
      quantityAsset,
    } = data;
    mutateEditAsset({
      id: id || undefined,
      data: {
        namaAsset: namaAsset || "",
        kodePN: kodePN || "",
        nilaiAsset: nilaiAsset || 0,
        quantityAsset: quantityAsset || 0,
        actionPlan: actionPlan || "",
        remark: remark || "",
        areaKerja: areaKerja || "",
        benefit: benefit || "",
        planRealisasi: planRealisasi || "",
      },
    });
  };

  //deleteAsset
  const handleDeleteYourAsset = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        mutateDeleteAsset(id);
      }
    });
  };

  //defaultValues edit
useEffect(() => {
  if (dataAssetById) {
    reset({
      namaAsset: dataAssetById?.namaAsset,
      kodePN: dataAssetById?.kodePN,
      nilaiAsset: dataAssetById?.nilaiAsset,
      quantityAsset: dataAssetById?.quantityAsset,
      actionPlan: dataAssetById?.actionPlan,
      remark: dataAssetById?.remark,
      areaKerja: dataAssetById?.areaKerja,
      benefit: dataAssetById?.benefit,
      planRealisasi: dataAssetById.planRealisasi.split("T")[0],
    });
  }
}, [dataAssetById, reset]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) return;
    setRole(role);
  }, []);

  return (
    <UserAssetContext.Provider
      value={{
        dataUserAssetList,
        isLoadingDataUserAssetList,
        setSearchAsset,
        setPagination,
        pagination,
        searchAsset,
        register,
        handleSubmit,
        onSubmit,
        mutateDeleteAsset,
        isLoadingDeleteAsset,
        openModalEdit,
        setOpenModalEdit,
        registerEdit,
        handleSubmitEdit,
        errors,
        dataAssetById,
        isLoadingDataAssetById,
        id,
        setId,
        reset,
        onSubmitEdit,
        isLoadingEditAsset,
        handleDeleteYourAsset,
        isLoadingApproveAsset,
        mutateApproveAsset,
        mutateUpdateActionAsset,
        isLoadingUpdateActionAsset,
        isFetchingDataUserAssetList,
        role,
        setRole,
      }}
    >
      {children}
    </UserAssetContext.Provider>
  );
};

export { useUserAssetContext, UserAssetProvider };
