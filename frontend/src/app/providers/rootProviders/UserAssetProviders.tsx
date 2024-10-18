"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useAssetList from "../../api/home/useAssetList"
import useUserAssetList from "../../api/userAsset/useUserAssetList"
import { AlertError } from "@/app/components/alert/AlertToastify";
import { useRouter } from 'next/navigation';

interface UserAssetContextProps {
  dataUserAssetList: TypeDataAssetList[];
  isLoadingDataUserAssetList: boolean;
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
    const {data: dataUserAssetList, isLoading: isLoadingDataUserAssetList} = useUserAssetList()


    return (
        <UserAssetContext.Provider value={{
          dataUserAssetList,
          isLoadingDataUserAssetList
        }}>
            {children}
        </UserAssetContext.Provider>
    );
}

export { useUserAssetContext, UserAssetProvider };
