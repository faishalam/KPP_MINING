'use client'
import { TypeYourDataAssetList, useUserAssetContext } from "@/app/providers/rootProviders/UserAssetProviders";
import DataTable from "react-data-table-component";
import LoadingSpinnder from "../../LoadingSpinnder";
import PaginationComponent from "../../PaginationComponent";
import { FaRegEdit } from "react-icons/fa";
import ButtonSubmit from "../../button/ButtonSubmit";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import ModalEditAsset from "../../modal/ModalEditAsset";
import { useState } from "react";
import { useRouter } from "next/navigation";




export default function DataTableYourAssetSection() {
    const {
        dataUserAssetList,
        isLoadingDataUserAssetList,
        pagination,
        setPagination,
        mutateDeleteAsset,
        setOpenModalEdit,
        openModalEdit,
        setId
    } = useUserAssetContext()

    const columnYourAsset = [
        {
            name: 'Site',
            selector: (row: TypeYourDataAssetList) => row.site,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-full">
                    {row.site}
                </div>
            ),
            width: '100px'
        },
        {
            name: 'Nama Asset',
            selector: (row: TypeYourDataAssetList) => row.namaAsset,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-48 p-1">
                    {row.namaAsset}
                </div>
            ),
        },
        {
            name: 'Kode PN',
            selector: (row: TypeYourDataAssetList) => row.kodePN,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-full">
                    {row.kodePN}
                </div>
            ),
            width: '150px'
        },
        {
            name: 'Nilai Asset',
            selector: (row: TypeYourDataAssetList) => `Rp. ${row.nilaiAsset.toLocaleString('id-ID')}`,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-full">
                    Rp. {row.nilaiAsset.toLocaleString('id-ID')}
                </div>
            ),
            width: '170px'
        },
        {
            name: 'Quantity',
            selector: (row: TypeYourDataAssetList) => row.quantityAsset,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-full">
                    {row.quantityAsset}
                </div>
            ),
            width: '100px'
        },
        {
            name: 'Total Nilai Asset',
            selector: (row: TypeYourDataAssetList) => `Rp. ${row.totalNilaiAsset.toLocaleString('id-ID')}`,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-full">
                    Rp. {row.totalNilaiAsset.toLocaleString('id-ID')}
                </div>
            ),
            width: '170px'
        },
        {
            name: 'Action Plan',
            selector: (row: TypeYourDataAssetList) => row.actionPlan,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-48 p-1 pr-10">
                    {row.actionPlan}
                </div>
            ),
            width: '200px'
        },
        {
            name: 'User Dept',
            selector: (row: TypeYourDataAssetList) => row.userDept,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Depresiasi',
            selector: (row: TypeYourDataAssetList) => row.depresiasi,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Remark',
            selector: (row: TypeYourDataAssetList) => row.remark,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Area Kerja',
            selector: (row: TypeYourDataAssetList) => row.areaKerja,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Benefit',
            selector: (row: TypeYourDataAssetList) => row.benefit,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="w-[800px]">
                    {row.benefit}
                </div>
            ),
            width: '200px'
        },
        {
            name: 'By',
            selector: (row: TypeYourDataAssetList) => row.User?.username,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="italic text-gray-500">
                    {row.User?.username}
                </div>
            ),
            width: '130px'
        },
        {
            name: 'Status',
            selector: (row: TypeYourDataAssetList) => row.status,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className={`font-sm rounded-xl text-xs p-1 ${row.status === 'approved' ? 'bg-green-200 text-green-600' : row.status === 'waiting' ? 'bg-red-200 text-red-600 ' : ''}`}>
                    {row.status}
                </div>
            ),
            width: '100px'
        },
        {
            name: 'Plan Realisasi',
            selector: (row: TypeYourDataAssetList) => new Date(row.planRealisasi).toISOString().split('T')[0],
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="min-w-[100px] text-gray-500">
                    {new Date(row.planRealisasi).toISOString().split('T')[0]}
                </div>
            ),
            width: '150px'
        },
        {
            name: 'Realisasi Asset',
            selector: (row: TypeYourDataAssetList) => new Date(row.realisasiAsset).toISOString().split('T')[0],
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="min-w-[100px] text-gray-500">
                    {new Date(row.realisasiAsset).toISOString().split('T')[0]}
                </div>
            ),
            width: '150px'
        },
        {
            name: 'Keterangan',
            selector: (row: TypeYourDataAssetList) => row.action,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="min-w-[150px]">
                    {row.action}
                </div>
            ),
            width: '200px'
        },
        {
            name: 'Action',
            cell: (row: TypeYourDataAssetList) => (
                <div className="flex gap-3">
                    <ButtonSubmit
                        type="button"
                        btnIcon={<FaRegEdit size={23} className="text-purple-700 hover:text-purple-800 transition-all" />}
                        onClick={() => handleEditAsset(row.id)}
                    />

                    <ButtonSubmit
                        type="button"
                        btnIcon={<MdDelete size={23} className="text-red-600 hover:text-red-700 transition-all" />}
                        onClick={() => handleDeleteYourAsset(row.id)}
                    />
                </div>
            ),
        }
    ];

    const handleDeleteYourAsset = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                mutateDeleteAsset(id)
            }
        });
    }

    const handleEditAsset = (id: number) => {
        setId(id)
        setOpenModalEdit(true)
    };



    return (
        <>
            {/* Loading Spinner */}
            {isLoadingDataUserAssetList ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <LoadingSpinnder />
                    <p className="text-gray-600 mt-2">Loading assets...</p>
                </div>
            ) : (
                <>
                    {/* Data Tidak Ditemukan */}
                    {dataUserAssetList?.data && dataUserAssetList?.data.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">Asset Tidak Ditemukan</p>
                        </div>
                    ) : (
                        <>
                            <DataTable
                                columns={columnYourAsset}
                                data={dataUserAssetList?.data || []}
                                className="w-full"
                            />

                            <PaginationComponent
                                pagination={pagination}
                                setPagination={setPagination}
                                data={dataUserAssetList || []}
                            />
                        </>
                    )}
                </>
            )}
            <ModalEditAsset />
        </>
    )
}