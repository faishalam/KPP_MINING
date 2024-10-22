"use client"

import { createContext, useContext, ReactNode, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useUserAssetList from "../../api/userAsset/useUserAssetList"
import { AlertError } from "@/app/components/alert/AlertToastify";
import useDeleteAsset from "../../api/userAsset/useDeleteAsset"
import { useQueryClient } from "react-query";
import useEditAsset from "../../api/asset/useEditAsset"
import useAssetById from "../../api/asset/useAssetById"

export type InputsSearch = {
    search: string
}

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
    status: string;
    action: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
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

interface UserAssetContextProps {
    dataUserAssetList?: YourDataAssetResponse;
    isLoadingDataUserAssetList: boolean;
    setSearchAsset: (search: string | undefined) => void
    setPagination: (pagination: { page: number, limit: number }) => void
    pagination: { page: number, limit: number }
    searchAsset: string | undefined,
    register: UseFormReturn<InputsSearch>["register"],
    handleSubmit: UseFormReturn<InputsSearch>["handleSubmit"],
    onSubmit: (data: InputsSearch) => void,
    isLoadingDeleteAsset: boolean
    mutateDeleteAsset: (id: number) => void;
    openModalEdit: boolean
    setOpenModalEdit: (open: boolean) => void
    registerEdit: UseFormReturn<AssetFormInputs>["register"],
    handleSubmitEdit: UseFormReturn<AssetFormInputs>["handleSubmit"],
    errors: UseFormReturn<AssetFormInputs>["formState"]["errors"],
    dataAssetById?: TypeYourDataAssetList
    isLoadingDataAssetById?: boolean
    setId: (id: number | null) => void
    id: number | null
}


interface UserAssetProviderContext {
    children: ReactNode;
}

const UserAssetContext = createContext<UserAssetContextProps | undefined>(undefined);

function useUserAssetContext() {
    const context = useContext(UserAssetContext);
    if (!context) {
        throw new Error("UserAssetContext must be used within an UserAssetProvider");
    }
    return context;
}

const UserAssetProvider = ({ children }: UserAssetProviderContext) => {
    const { register, handleSubmit } = useForm<InputsSearch>();
    const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors } } = useForm<AssetFormInputs>();
    const [searchAsset, setSearchAsset] = useState<string | undefined>()
    const [pagination, setPagination] = useState<{ page: number, limit: number }>({ page: 1, limit: 13 })

    const [openModalEdit, setOpenModalEdit] = useState(false)

    const [id, setId] = useState<number | null>(null)

    const queryClient = useQueryClient()

    const { data: dataUserAssetList, isLoading: isLoadingDataUserAssetList } = useUserAssetList({
        params: {
            search: searchAsset || undefined,
            page: pagination.page || 1,
            limit: pagination.limit || 13,
            enabled: false
        }
    })

    const { data: dataAssetById, isLoading: isLoadingDataAssetById } = useAssetById({
        params: {
            id: id || undefined
        },
    })

    const { mutate: mutateDeleteAsset, isLoading: isLoadingDeleteAsset } = useDeleteAsset({
        onSuccess: () => {
            queryClient.refetchQueries('useUserAssetList');
        },
        onError: () => {
            AlertError("Delete Failed")
        }
    })

    //search asset
    const onSubmit = (data: InputsSearch) => {
        const { search } = data;
        setSearchAsset(search);
        setPagination({ page: 1, limit: pagination.limit });
    }


    return (
        <UserAssetContext.Provider value={{
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
        }}>
            {children}
        </UserAssetContext.Provider>
    );
}

export { useUserAssetContext, UserAssetProvider };
