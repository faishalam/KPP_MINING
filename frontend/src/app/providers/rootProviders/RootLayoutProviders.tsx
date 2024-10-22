"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useAssetList from "../../api/home/useAssetList"
import useUser from "../../api/user/useUser"
import { AlertError, AlertSuccess } from "@/app/components/alert/AlertToastify";
import { useRouter } from 'next/navigation';
import RootLayout from "@/app/(root)/layout";
import useAddAsset from "../../api/asset/useAddAsset"
import { useQueryClient } from "react-query";

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

    const { data: dataUser, isLoading: isLoadingDataUser } = useUser()

    const queryClient = useQueryClient()

    const { mutate: mutateAddAsset, isLoading: isLoadingAddAsset, error: errorAddAsset } = useAddAsset({
        onSuccess: () => {
            queryClient.refetchQueries('useAssetList');
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
        }}>
            {children}
        </RootLayoutContext.Provider>
    );
}

export { useRootLayoutContext, RootLayoutProvider };
