"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useAssetList from "../../api/home/useAssetList"
import useUser from "../../api/user/useUser"
import { AlertError } from "@/app/components/alert/AlertToastify";
import { useRouter } from 'next/navigation';
import RootLayout from "@/app/(root)/layout";

interface RootLayoutContextProps {
    dataUser?: User;
    isLoadingDataUser: boolean;
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

const RootLayoutContext = createContext<RootLayoutContextProps | undefined>(undefined);

function useRootLayoutContext() {
    const context = useContext(RootLayoutContext);
    if (!context) {
        throw new Error("HomeContext must be used within an HomeProvider");
    }
    return context;
}

const RootLayoutProvider = ({ children }: HomeProviderContext) => {
    const { data: dataUser, isLoading: isLoadingDataUser } = useUser()

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
        <RootLayoutContext.Provider value={{
            dataUser,
            isLoadingDataUser,
        }}>
            {children}
        </RootLayoutContext.Provider>
    );
}

export { useRootLayoutContext, RootLayoutProvider };
