"use client"

import { createContext, useContext, ReactNode } from "react";
import useAssetList from "../../api/asset/useAssetList"

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
    statusApproval: string;
    statusRealisasi: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    keterangan: string
    User: {
        username: string;
    };
}

// export interface AssetResponse {
//     data: TypeDataAssetList[]; // Array of TypeDataAssetList
// }

interface StatisticsContextProps {
    dataAssetList?: TypeDataAssetList[];
    isLoadingDataAssetList: boolean;
    isFetchingDataAssetList: boolean
}


interface StatisticsProviderContext {
    children: ReactNode;
}

const StatisticsContext = createContext<StatisticsContextProps | undefined>(undefined);

function useStatisticsContext() {
    const context = useContext(StatisticsContext);
    if (!context) {
        throw new Error("StatisticsContext must be used within an StatisticsProvider");
    }
    return context;
}

const StatisticsProvider = ({ children }: StatisticsProviderContext) => {
    const { data: dataAssetList, isLoading: isLoadingDataAssetList, isFetching: isFetchingDataAssetList } = useAssetList({
        params: {
            enabled: true
        }
    });

    return (
        <StatisticsContext.Provider value={{
            dataAssetList,
            isLoadingDataAssetList,
            isFetchingDataAssetList
        }}>
            {children}
        </StatisticsContext.Provider>
    );
}

export { useStatisticsContext, StatisticsProvider };
