'use client'
import { TypeDataAssetList, useHomeContext } from "@/app/providers/rootProviders/HomeProviders";
import DataTable from "react-data-table-component";
import LoadingSpinnder from "../../LoadingSpinnder";
import PaginationComponent from "../../PaginationComponent";

const columnHomePage = [
    {
        name: 'Site',
        selector: (row: TypeDataAssetList) => row.site,
        sortable: true,
    },
    {
        name: 'Nama Asset',
        selector: (row: TypeDataAssetList) => row.namaAsset,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '200px' }}>
                {row.namaAsset}
            </div>
        ),
    },
    {
        name: 'Kode PN',
        selector: (row: TypeDataAssetList) => row.kodePN,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '170px' }}>
                {row.kodePN}
            </div>
        ),
    },
    {
        name: 'Nilai Asset',
        selector: (row: TypeDataAssetList) => `Rp. ${row.nilaiAsset.toLocaleString('id-ID')}`,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '150px' }}>
                Rp. {row.nilaiAsset.toLocaleString('id-ID')}
            </div>
        ),
    },
    {
        name: 'Quantity',
        selector: (row: TypeDataAssetList) => row.quantityAsset,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '10px' }}>
                {row.quantityAsset}
            </div>
        ),
    },
    {
        name: 'Total Nilai Asset',
        selector: (row: TypeDataAssetList) => `Rp. ${row.totalNilaiAsset.toLocaleString('id-ID')}`,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '150px' }}>
                Rp. {row.totalNilaiAsset.toLocaleString('id-ID')}
            </div>
        ),
    },
    {
        name: 'Action Plan',
        selector: (row: TypeDataAssetList) => row.actionPlan,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '150px' }}>
                {row.actionPlan}
            </div>
        ),
    },
    {
        name: 'User Dept',
        selector: (row: TypeDataAssetList) => row.userDept,
        sortable: true,
    },
    {
        name: 'Depresiasi',
        selector: (row: TypeDataAssetList) => row.depresiasi,
        sortable: true,
    },
    {
        name: "Remark",
        selector: (row: TypeDataAssetList) => row.remark,
        sortable: true,
    },
    {
        name: "Area Kerja",
        selector: (row: TypeDataAssetList) => row.areaKerja,
        sortable: true,
    },
    {
        name: "Benefit",
        selector: (row: TypeDataAssetList) => row.benefit,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                display: 'block',
                minWidth: '150px', // moved minWidth into style
                maxWidth: '200px', // moved maxWidth into style
            }}>
                {row.benefit}
            </div>
        ),
    },
    {
        name: "By",
        selector: (row: TypeDataAssetList) => row.User?.username,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{
                fontStyle: 'italic', // Teks miring
                color: 'gray', // Warna abu-abu
            }}>
                {row.User?.username}
            </div>
        ),
    },
    {
        name: "Status",
        selector: (row: TypeDataAssetList) => row.status,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{
                color: row.status === 'approved' ? 'green' : row.status === 'waiting' ? 'red' : 'black',
            }}>
                {row.status}
            </div>
        ),
    },
    {
        name: "Plan Realisasi",
        selector: (row: TypeDataAssetList) => new Date(row.planRealisasi).toISOString().split('T')[0],
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '100px' }}>
                {new Date(row.planRealisasi).toISOString().split('T')[0]}
            </div>
        ),
    },
    {
        name: "Realisasi Asset",
        selector: (row: TypeDataAssetList) => new Date(row.realisasiAsset).toISOString().split('T')[0],
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '100px' }}>
                {new Date(row.realisasiAsset).toISOString().split('T')[0]}
            </div>
        ),
    },
    {
        name: "Keterangan",
        selector: (row: TypeDataAssetList) => row.remark,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{ minWidth: '150px' }}>
                {row.remark}
            </div>
        ),
    },
];

export default function DataTableHome() {
    const {
        isLoadingDataAssetList,
        dataAssetList,
        pagination,
        setPagination
    } = useHomeContext();

    return (
        <>
            {/* Loading Spinner */}
            {isLoadingDataAssetList ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <LoadingSpinnder />
                    <p className="text-gray-600 mt-2">Loading assets...</p>
                </div>
            ) : (
                <>
                    {/* Data Tidak Ditemukan */}
                    {dataAssetList?.data && dataAssetList?.data?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">Asset Tidak Ditemukan</p>
                        </div>
                    ) : (
                        <>
                            <DataTable
                                columns={columnHomePage}
                                data={dataAssetList?.data || []}
                                // pagination
                                // paginationPerPage={11}
                                className="w-full"
                            />

                            <PaginationComponent/>
                        </>
                    )}
                </>
            )}
        </>

    )
}