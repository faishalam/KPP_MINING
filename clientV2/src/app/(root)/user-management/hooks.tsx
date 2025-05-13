"use client";
import IconPencil from "@/assets/svg/icon-pencil.svg";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DeleteIcon from "@/assets/svg/delete-icon.svg";
import IconEye from "@/assets/svg/eye-icon.svg";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useContext, createContext, useState, useMemo, useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useUserList from "@/api/user/useGetUserList";
import {
  InputsRegister,
  TMasterResponse,
  TMasterUserCol,
  TMasterUserList,
} from "@/app/(root)/user-management/types";
import useRegister from "@/api/user/useRegister";
import useUpdateUser from "@/api/user/useUpdateUser";
import useDeleteUser from "@/api/user/useDeleteUser";
import { useModalWarningInfo } from "@/components/componentsV2/atoms/modal-warning";
import { useQueryClient } from "react-query";
import { ValueGetterParams } from "@ag-grid-community/core";
import Image from "next/image";
import useUserById from "@/api/user/useUserById";
import useRootLayoutContext from "../hooks";

const useUserManagementHooks = () => {
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister,
    resetField,
    getValues: getValuesRegister,
    control: controlRegister,
  } = useForm<InputsRegister>({
    defaultValues: {
      email: "",
      old_password: "",
      password: "",
      username: "",
      district: "",
      department: "",
      site: "",
      role: "",
    },
  });
  const { role } = useRootLayoutContext();
  const { id } = useParams();
  const router = useRouter();
  const [searchUser, setSearchUser] = useState<string>("");
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [filter, setFilter] = useState<{
    search: string;
    role: string | null;
    department: string | null;
    site: string | null;
  }>({ search: "", role: null, department: null, site: null });
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );
  const modalWarningInfo = useModalWarningInfo();
  const queryClient = useQueryClient();

  const { data: dataUserList, isLoading: isLoadingGetUserList } = useUserList({
    params: {
      search: undefined,
      page: pagination?.page || 1,
      limit: pagination?.limit || 13,
    },
  });

  const dataGrid = useMemo(() => {
    const dataFilter = dataUserList?.data?.filter((x: TMasterUserList) => {
      const search1 = x.username
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search2 = x.email
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search3 = x.role
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search4 = x.site
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search5 = x.department
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search6 = x.district
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const search =
        search1 || search2 || search3 || search4 || search5 || search6;

      const byRoles = filter.role ? x.role === filter.role : true;
      const byDepartments = filter.department
        ? x.department === filter.department
        : true;
      const bySites = filter.site ? x.site === filter.site : true;

      return search && byRoles && byDepartments && bySites;
    });
    return dataFilter;
  }, [dataUserList, filter]);

  const { mutate: mutateRegister, isLoading: isLoadingAddUser } = useRegister({
    onSuccess: () => {
      queryClient.refetchQueries("useUserList");
      resetRegister();
      router.push("/user-management");
      AlertSuccess("Created user successfully");
    },
    onError: (error: string) => {
      AlertError(error);
    },
  });

  const { data: dataUserById, isLoadingUserById } = useUserById({
    params: {
      id: id || undefined,
    },
  });

  const { mutate: mutateEditUser, isLoading: isLoadingEditUser } =
    useUpdateUser({
      onSuccess: () => {
        queryClient.refetchQueries("useUserList");
        resetRegister();
        router.push("/user-management");
        AlertSuccess("Updated user successfully");
      },
      onError: (error: string) => {
        AlertError(error);
      },
    });

  const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
    useDeleteUser({
      onSuccess: () => {
        queryClient.refetchQueries("useUserList");
        AlertSuccess("Delete user successfully");
      },
      onError: (errorDeleteAsset: string) => {
        AlertError(errorDeleteAsset);
      },
    });

  const onValidSubmit: SubmitHandler<InputsRegister> = (data) => {
    modalWarningInfo.open({
      title: "Confirm Save",
      message: (
        <div>
          <p>Are you sure you want to save this user?</p>
        </div>
      ),
      onConfirm: () => {
        if (mode === "add") {
          mutateRegister(data);
        } else {
          mutateEditUser({ id, data });
        }
      },
    });
  };

  const onInvalidSubmit = (errors: FieldErrors<InputsRegister>) => {
    Object.entries(errors).forEach(([key, error]) => {
      console.log(key);
      if (error?.message) {
        AlertError(error.message);
      }
    });
  };

  const handleCancelUserManagement = () => {
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
          router.push("/user-management");
        },
      });
    }
  };

  const userListColumnDef = useMemo<TMasterUserCol>(() => {
    return [
      {
        width: 90,
        headerName: "No",
        valueGetter: (params: ValueGetterParams<TMasterResponse>) =>
          (params.node?.rowIndex ?? 0) + 1,
      },
      {
        field: "username",
        headerName: "User Name",
        width: 200,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "role",
        headerName: "Role",
        width: 150,
      },
      {
        field: "district",
        headerName: "District",
        width: 200,
      },
      {
        field: "department",
        headerName: "Department",
        width: 150,
      },
      {
        field: "site",
        flex: 1,
        headerName: "Site",
        width: 150,
      },
      {
        width: 130,
        headerName: "Action",
        pinned: "right",
        sortable: false,
        cellRenderer: (params: ValueGetterParams<TMasterUserList>) => {
          return (
            <div className="flex gap-1 py-1 items-center justify-center">
              <div className="cursor-pointer">
                <Image
                  onClick={() => {
                    if (params?.data) {
                      resetRegister(params?.data);
                      router.push(
                        `/user-management/${params?.data.id}?mode=view`
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
                          resetRegister(params?.data);
                          router.push(
                            `/user-management/${params?.data.id}?mode=edit`
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
                              mutateDeleteUser(params?.data?.id);
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
  }, [dataUserList]);

  const statisticsDataTop = useMemo(
    () => [
      {
        count: isNaN(Number(dataUserList?.totalItems))
          ? 0
          : Number(dataUserList?.totalItems),
        label: "Total Users",
        bgColor: "from-[rgba(2,132,199,0.1)]",
      },
      {
        count: isNaN(Number(dataUserList?.total_roles_user))
          ? 0
          : Number(dataUserList?.total_roles_user),
        label: "Role Users",
        bgColor: "from-[rgba(250,204,21,0.1)]",
      },
      {
        count: isNaN(Number(dataUserList?.total_roles_head))
          ? 0
          : Number(dataUserList?.total_roles_head),
        label: "Role Head",
        bgColor: "from-[rgba(22,163,74,0.1)]",
      },
    ],
    [dataUserList]
  );

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

  const siteOptions = [
    { value: "TMRB", label: "TMRB" },
    { value: "INDE", label: "INDE" },
    { value: "RANT", label: "RANT" },
    { value: "AGMR", label: "AGMR" },
    { value: "SJRP", label: "SJRP" },
    { value: "SPRL", label: "SPRL" },
    { value: "BDMA", label: "BDMA" },
    { value: "SPUT", label: "SPUT" },
    { value: "MASS", label: "MASS" },
    { value: "PELH", label: "PELH" },
    { value: "AOC", label: "AOC" },
  ];

  const rolesOptions = [
    { value: "head", label: "Head" },
    { value: "user", label: "User" },
  ];

  const onDownloadData = (dataUser: TMasterUserList[]) => {
    try {
      const d = dataUser?.map((user) => {
        return {
          "User Name": user?.username,
          Email: user?.email,
          Role: user?.role,
          District: user?.district,
          Department: user?.department,
          Site: user?.site,
        };
      });
      const ws = XLSX.utils.json_to_sheet(d);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, `user-management.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((mode === "view" || mode === "edit") && dataUserById) {
      resetRegister(dataUserById);
    } else {
      resetRegister({
        username: "",
        email: "",
        role: "",
        district: "",
        department: "",
        site: "",
      });
    }
  }, [mode, dataUserById]);

  return {
    isLoadingAddUser,
    isLoadingDeleteUser,
    isLoadingEditUser,
    isLoadingUserById,
    isLoadingGetUserList,
    departmentOptions,
    siteOptions,
    statisticsDataTop,
    userListColumnDef,
    mutateRegister,
    dataUserList,
    rolesOptions,
    registerRegister,
    resetField,
    handleSubmitRegister,
    errorsRegister,
    resetRegister,
    pagination,
    onDownloadData,
    setPagination,
    getValuesRegister,
    controlRegister,
    onInvalidSubmit,
    onValidSubmit,
    handleCancelUserManagement,
    mode,
    searchUser,
    setSearchUser,
    setFilter,
    filter,
    dataGrid,
  };
};

const UserManagementContext = createContext<
  ReturnType<typeof useUserManagementHooks> | undefined
>(undefined);

export const UserManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useUserManagementHooks();
  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error(
      "useUserManagementHooks must be used within an UserManagementProvider"
    );
  }
  return context;
};
export default useUserManagement;
