import * as XLSX from 'xlsx';
import useAssetList from '../api/home/useAssetList';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { RiFileReduceLine } from 'react-icons/ri';
import ButtonSubmit from '../components/button/ButtonSubmit';

interface TypeDataAssetList {
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
    data: TypeDataAssetList[]; // Array of TypeDataAssetList
}

export default function ExcelDownloadButton() {
    const [enabled, setEnabled] = useState(false);
    const { data: dataAssetList, isLoading: isLoadingDataAssetList } = useAssetList({
        params: {
            enabled,
        },
    });
    
    const downloadExcel = () => {
        if (!dataAssetList) {
            console.error("No data available for download.");
            return;
        }

        const dataOnExcel = dataAssetList.map((item: TypeDataAssetList) => ({
            site: item.site,
            namaAsset: item.namaAsset,
            kodePN: item.kodePN,
            nilaiAsset: item.nilaiAsset,
            quantityAsset: item.quantityAsset,
            totalNilaiAsset: item.totalNilaiAsset,
            actionPlan: item.actionPlan,
            userDept: item.userDept,
            depresiasi: item.depresiasi,
            remark: item.remark,
            areaKerja: item.areaKerja,
            benefit: item.benefit,
            planRealisasi: item.planRealisasi,
            realisasiAsset: item.realisasiAsset,
            status: item.status,
            action: item.action,
            userId: item.userId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            username: item.User.username, // Flattening the User object
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataOnExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report Assets");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "AssetsDashboard.xlsx");
    };

    useEffect(() => {
        if (enabled && !isLoadingDataAssetList) {
            downloadExcel();
            setEnabled(false);
        }
    }, [enabled, isLoadingDataAssetList, dataAssetList]);

    const handleDownloadClick = () => {
        setEnabled(true); // Enable the API call
    };

    if (isLoadingDataAssetList) {
        return <p>Loading data...</p>; // Display loading state
    }

    return (
        <ButtonSubmit
            btnText="Download Report"
            btnIcon={<RiFileReduceLine size={25} />}
            classname="w-[114px] shadow-sm max-w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-all rounded text-white text-[10px]"
            onClick={handleDownloadClick}
        />
    );
}
