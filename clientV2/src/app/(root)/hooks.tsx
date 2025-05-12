import { useContext, createContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AssetFormInputs, TMasterUser } from "./types";
import { useQueryClient } from "react-query";
import useUser from "@/api/user/useUser";
import useAddAsset from "@/api/asset/useAddAsset";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";

const useRootLayoutHooks = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssetFormInputs>();
  const [openModalAddAsset, setOpenModalAddAsset] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>("head");

  const queryClient = useQueryClient();

  const { data: dataUser, isLoading: isLoadingDataUser } = useUser() as {
    data: TMasterUser | undefined;
    isLoading: boolean;
  };

  const {
    mutate: mutateAddAsset,
    isLoading: isLoadingAddAsset,
    error: errorAddAsset,
  } = useAddAsset({
    onSuccess: () => {
      queryClient.refetchQueries("useAssetList");
      queryClient.refetchQueries("useUserAssetList");
      AlertSuccess("Berhasil Menambah Asset!");
      reset();
    },
    onError: () => {
      AlertError(errorAddAsset as string);
    },
  });

  const onSubmit = (data: AssetFormInputs) => {
    mutateAddAsset(data);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) return;
    setRole(role);
  }, []);

  return {
    dataUser,
    isLoadingDataUser,
    mutateAddAsset,
    isLoadingAddAsset,
    register,
    handleSubmit,
    onSubmit,
    errors,
    openModalAddAsset,
    setOpenModalAddAsset,
    sidebarOpen,
    setSidebarOpen,
    role,
    setRole,
  };
};

const RootLayoutContext = createContext<
  ReturnType<typeof useRootLayoutHooks> | undefined
>(undefined);

export const RootLayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useRootLayoutHooks();
  return (
    <RootLayoutContext.Provider value={value}>
      {children}
    </RootLayoutContext.Provider>
  );
};

export const useRootLayoutContext = () => {
  const context = useContext(RootLayoutContext);
  if (context === undefined) {
    throw new Error(
      "useRootLayoutHooks must be used within an RootLayoutProvider"
    );
  }
  return context;
};

export default useRootLayoutContext;
