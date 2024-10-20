"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useAssetList from "../../api/home/useAssetList"
import { redirect, useRouter, useSearchParams } from 'next/navigation';

export type InputsSearch = {
    search: string
}

export interface TypeDataAssetList {
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

export interface AssetResponse {
    totalItems: number | undefined;
    totalPages: number | undefined;
    currentPage: number | undefined;
    data: TypeDataAssetList[]; // Array of TypeDataAssetList
}

interface HomeContextProps {
    dataAssetList?: AssetResponse;
    isLoadingDataAssetList: boolean;
    register: UseFormReturn<InputsSearch>["register"]
    handleSubmit: UseFormReturn<InputsSearch>["handleSubmit"]
    setSearchAsset: (value: string | undefined) => void
    searchAsset: string | undefined
    onSubmit: (data: InputsSearch) => void,
    pagination: { page: number, limit: number },
    setPagination: (value: { page: number, limit: number }) => void,
}


interface HomeProviderContext {
    children: ReactNode;
}

const HomeContext = createContext<HomeContextProps | undefined>(undefined);

function useHomeContext() {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error("HomeContext must be used within an HomeProvider");
    }
    return context;
}

const HomeProvider = ({ children }: HomeProviderContext) => {
    const { register, handleSubmit } = useForm<InputsSearch>()
    const [searchAsset, setSearchAsset] = useState<string | undefined>()
    const [pagination, setPagination] = useState<{ page: number, limit: number }>({ page: 1, limit: 13 })

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search');
    const initialPage = searchParams.get('page');

    const { data: dataAssetList, isLoading: isLoadingDataAssetList } = useAssetList({
        params: {
            search: searchAsset || undefined,
            page: pagination?.page || 1,
            limit: pagination?.limit || 12,
            enabled: false
        }
    });

    //search asset
    const onSubmit = (data: InputsSearch) => {
        const { search } = data;
        if (!search) {
            router.push("/");
            return;
        }
        setSearchAsset(search);
        router.push(`/?search=${search}`);
    };

    // useEffect(() => {
    //     setSearchAsset(initialSearch);
    // }, [initialSearch])

    // useEffect(() => {
    //     if (!initialSearch) {
    //         router.push(`/?page=${pagination.page}`)
    //     }
    // }, [pagination.page])

    // useEffect(() => {
    //     if (initialPage) {
    //         setPagination({
    //             page: Number(initialPage),
    //             limit: pagination.limit
    //         })
    //     }
    // }, [initialPage])


    return (
        <HomeContext.Provider value={{
            setPagination,
            pagination,
            dataAssetList,
            isLoadingDataAssetList,
            register,
            handleSubmit,
            onSubmit: onSubmit,
            setSearchAsset,
            searchAsset
        }}>
            {children}
        </HomeContext.Provider>
    );
}

export { useHomeContext, HomeProvider };
