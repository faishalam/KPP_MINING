'use client'
import { TypeDataAssetList, useHomeContext } from "@/app/providers/rootProviders/HomeProviders";
import DataTable from "react-data-table-component";
import LoadingSpinnder from "../../LoadingSpinnder";
import PaginationComponent from "../../PaginationComponent";

const columnHomePage = [
    // {
    //     name: 'No',
    //     selector: (row: TypeDataAssetList, index: number) => index + 1,
    //     sortable: true,
    //     width: '70px'
    // },
    {
        name: 'Site',
        selector: (row: TypeDataAssetList) => row.site,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-full">
                {row.site}
            </div>
        ),
        width : '100px'
    },
    {
        name: 'Nama Asset',
        selector: (row: TypeDataAssetList) => row.namaAsset,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-48 p-1">
                {row.namaAsset}
            </div>
        ),
    },
    {
        name: 'Kode PN',
        selector: (row: TypeDataAssetList) => row.kodePN,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-full">
                {row.kodePN}
            </div>
        ),
        width: '150px'
    },
    {
        name: 'Nilai Asset',
        selector: (row: TypeDataAssetList) => `Rp. ${row.nilaiAsset.toLocaleString('id-ID')}`,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-full">
                Rp. {row.nilaiAsset.toLocaleString('id-ID')}
            </div>
        ),
        width: '170px'
    },
    {
        name: 'Quantity',
        selector: (row: TypeDataAssetList) => row.quantityAsset,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-full">
                {row.quantityAsset}
            </div>
        ),
        width: '100px'
    },
    {
        name: 'Total Nilai Asset',
        selector: (row: TypeDataAssetList) => `Rp. ${row.totalNilaiAsset.toLocaleString('id-ID')}`,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-full">
                Rp. {row.totalNilaiAsset.toLocaleString('id-ID')}
            </div>
        ),
        width: '170px'
    },
    {
        name: 'Action Plan',
        selector: (row: TypeDataAssetList) => row.actionPlan,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-48 p-1 pr-10">
                {row.actionPlan}
            </div>
        ),
        width: '200px'
    },
    {
        name: 'User Dept',
        selector: (row: TypeDataAssetList) => row.userDept,
        sortable: true,
        width: '120px',
    },
    {
        name: 'Depresiasi',
        selector: (row: TypeDataAssetList) => row.depresiasi,
        sortable: true,
        width: '120px',
    },
    {
        name: 'Remark',
        selector: (row: TypeDataAssetList) => row.remark,
        sortable: true,
        width: '200px',
    },
    {
        name: 'Area Kerja',
        selector: (row: TypeDataAssetList) => row.areaKerja,
        sortable: true,
        width: '200px',
    },
    {
        name: 'Benefit',
        selector: (row: TypeDataAssetList) => row.benefit,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="w-[800px]">
                {row.benefit}
            </div>
        ),
        width: '200px'
    },
    {
        name: 'By',
        selector: (row: TypeDataAssetList) => row.User?.username,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="italic text-gray-500">
                {row.User?.username}
            </div>
        ),
        width: '130px'
    },
    {
        name: 'Status Approval',
        selector: (row: TypeDataAssetList) => row.statusApproval,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className={`font-sm rounded-xl text-xs p-1 ${row.statusApproval === 'approved' ? 'bg-green-200 text-green-600' : row.statusApproval === 'waiting' ? 'bg-red-200 text-red-600 ' : ''}`}>
                {row.statusApproval}
            </div>
        ),
        width: '150px'
    },
    {
        name: 'Plan Realisasi',
        selector: (row: TypeDataAssetList) => new Date(row.planRealisasi).toISOString().split('T')[0],
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="min-w-[100px] text-gray-500">
                {new Date(row.planRealisasi).toISOString().split('T')[0]}
            </div>
        ),
        width: '150px'
    },
    {
        name: 'Realisasi Asset',
        selector: (row: TypeDataAssetList) => new Date(row.realisasiAsset).toISOString().split('T')[0],
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="min-w-[100px] text-gray-500">
                {new Date(row.realisasiAsset).toISOString().split('T')[0]}
            </div>
        ),
        width: '150px'
    },
    {
        name: 'Keterangan',
        selector: (row: TypeDataAssetList) => row.keterangan,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div className="min-w-[150px]">
                {row.keterangan}
            </div>
        ),
        width: '200px'
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
                                className="w-full"
                            />

                            <PaginationComponent
                                pagination={pagination}
                                setPagination={setPagination}
                                totalItems={dataAssetList?.totalItems || 0}
                                totalPages={dataAssetList?.totalPages || 0}
                                currentPage={dataAssetList?.currentPage || 0}
                            />
                        </>
                    )}
                </>
            )}
        </>

    )
}