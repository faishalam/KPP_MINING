"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useUser from "../../api/user/useUser"
import useAddAsset from "../../api/asset/useAddAsset"
import { useQueryClient } from "react-query";
import { AlertError, AlertSuccess } from "@/app/components/alert/AlertToastify";

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

interface RootLayoutContextProps {
    dataUser?: User;
    isLoadingDataUser: boolean;
    mutateAddAsset: (body: AssetFormInputs) => void;
    isLoadingAddAsset: boolean
    register: UseFormReturn<AssetFormInputs>["register"]
    handleSubmit: UseFormReturn<AssetFormInputs>["handleSubmit"]
    errors: UseFormReturn<AssetFormInputs>["formState"]["errors"]
    onSubmit: (data: AssetFormInputs) => void
    openModalAddAsset: boolean
    setOpenModalAddAsset: (open: boolean) => void
    sidebarOpen: boolean,
    setSidebarOpen: (open: boolean) => void
    role: string | null
    setRole: (role: string | null) => void
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


interface HomeProviderContext {
    children: ReactNode;
}

const RootLayoutContext = createContext<RootLayoutContextProps | undefined>(undefined);

function useRootLayoutContext() {
    const context = useContext(RootLayoutContext);
    if (!context) {
        throw new Error("HomeContext must be used within an HomeProvider");
    }
    return context;
}


const RootLayoutProvider = ({ children }: HomeProviderContext) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AssetFormInputs>();
    const [openModalAddAsset, setOpenModalAddAsset] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>('head');

    const queryClient = useQueryClient()

    const { data: dataUser, isLoading: isLoadingDataUser } = useUser()


    const { mutate: mutateAddAsset, isLoading: isLoadingAddAsset, error: errorAddAsset } = useAddAsset({
        onSuccess: () => {
            queryClient.refetchQueries('useAssetList');
            queryClient.refetchQueries('useUserAssetList');
            AlertSuccess('Berhasil Menambah Asset!')
            reset()
        },
        onError: () => {
            AlertError(errorAddAsset as string)
        }
    })

    const onSubmit = (data: AssetFormInputs) => {
        mutateAddAsset(data)
    }

    useEffect(() => {
        const role = localStorage.getItem('role')
        if(!role) return
        setRole(role)
    }, [])


    return (
        <RootLayoutContext.Provider value={{
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
            setRole
        }}>
            {children}
        </RootLayoutContext.Provider>
    );
}

export { useRootLayoutContext, RootLayoutProvider };
