"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useAssetList from "../../api/home/useAssetList"
import useUser from "../../api/user/useUser"
import { AlertError } from "@/app/components/alert/AlertToastify";
import { useRouter } from 'next/navigation';

export type InputsSearch = {
    search: string
}
interface HomeContextProps {
    dataAssetList?: TypeDataAssetList[];
    dataUser?: User;
    isLoadingDataUser: boolean;
    isLoadingDataAssetList: boolean;
    register: UseFormReturn<InputsSearch>["register"]
    handleSubmit: UseFormReturn<InputsSearch>["handleSubmit"]
    setSearchAsset: (value: string | undefined) => void
    searchAsset: string | undefined
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

export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // Pastikan untuk mengamankan password dalam aplikasi Anda
    role: string;
    district: string;
    department: string;
    site: string;
    createdAt: string; // Atau bisa menggunakan Date jika Anda ingin
    updatedAt: string; // Atau bisa menggunakan Date jika Anda ingin
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
    const router = useRouter()

    const { data: dataUser, isLoading: isLoadingDataUser } = useUser()

    const { data: dataAssetList, isLoading: isLoadingDataAssetList } = useAssetList({
        params: {
            search: searchAsset
        }
    })

    // const handleChangeUrl = () => {
    //     if (searchAsset) {
    //         router.push(`/?search=${searchAsset}`)
    //     } else {
    //         router.push("/")
    //     }
    // }

    // useEffect(() => {
    //     handleChangeUrl()
    // }, [searchAsset])

    return (
        <HomeContext.Provider value={{
            dataAssetList,
            isLoadingDataAssetList,
            register,
            handleSubmit,
            setSearchAsset,
            searchAsset,
            dataUser,
            isLoadingDataUser
        }}>
            {children}
        </HomeContext.Provider>
    );
}

export { useHomeContext, HomeProvider };
