'use client'
import { TypeYourDataAssetList, useUserAssetContext } from "@/app/providers/rootProviders/UserAssetProviders";
import DataTable from "react-data-table-component";
import LoadingSpinnder from "../../LoadingSpinnder";
import PaginationComponent from "../../PaginationComponent";
import { FaRegEdit } from "react-icons/fa";
import ButtonSubmit from "../../button/ButtonSubmit";
import { MdDelete } from "react-icons/md";
import ModalEditAsset from "../../modal/ModalEditAsset";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalFeedbackCancel from "../../modal/ModalFeedbackCancel";
import ModalFeedbackHold from "../../modal/ModalFeedbackHold";

export default function DataTableYourAssetSection() {
    const {
        dataUserAssetList,
        isLoadingDataUserAssetList,
        pagination,
        setPagination,
        setOpenModalEdit,
        setId,
        handleDeleteYourAsset,
        mutateApproveAsset,
        mutateUpdateActionAsset
    } = useUserAssetContext()
    const [role, setRole] = useState<string>('')

    const [openModalCancel, setOpenModalCancel] = useState<{ id: number | undefined, show: boolean }>({ id: undefined, show: false });
    const [openModalHold, setOpenModalHold] = useState<{ id: number | undefined, show: boolean }>({ id: undefined, show: false });

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
            name: 'Status Approval',
            selector: (row: TypeYourDataAssetList) => row.statusApproval,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className={`font-sm rounded-xl text-xs p-1 ${row.statusApproval === 'approved' ? 'bg-green-200 text-green-600' : row.statusApproval === 'waiting' ? 'bg-red-200 text-red-600 ' : ''}`}>
                    {row.statusApproval}
                </div>
            ),
            width: '150px'
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
            selector: (row: TypeYourDataAssetList) => row.keterangan,
            sortable: true,
            cell: (row: TypeYourDataAssetList) => (
                <div className="min-w-[100px] text-gray-500">
                    {row.keterangan}
                </div>
            ),
            width: '150px'
        },
        {
            name: 'Status Approval',
            cell: (row: TypeYourDataAssetList) => (
                <div className="flex gap-3">
                    {role === 'user' ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            {row.statusApproval !== 'approved' ? (
                                <ButtonSubmit
                                    classname={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                    type={"button"}
                                    btnText="Approve"
                                    onClick={() => mutateApproveAsset(row.id)}
                                />
                            ) : (
                                <div className={`font-sm rounded-xl text-xs p-1 bg-green-200 text-green-600`}>
                                    Approved
                                </div>
                            )}

                        </>
                    )}

                </div>
            ),
            width: '100px'
        },
        ...(role === 'user' ? [{
            name: 'Status Realisasi',
            cell: (row: TypeYourDataAssetList) => (
                <div className="flex gap-1">
                    {row.statusRealisasi !== 'realisasi waiting' ? (
                        <ButtonSubmit
                            btnText={row.statusRealisasi}
                            classname={`
                            ${row.statusRealisasi === 'worked' ? 'bg-green-200 text-green-700 text-xs p-1 rounded-xl' : ''}
                          ${row.statusRealisasi === 'canceled' ? 'bg-red-200 text-red-700 text-xs p-1 rounded-xl' : ''}
                          ${row.statusRealisasi === 'hold' ? 'bg-gray-200 text-gray-700 text-xs p-1 rounded-xl' : ''}
                          
                      `}
                        />
                    ) : (
                        <>
                            <ButtonSubmit
                                classname={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                type={"button"}
                                btnText="Worked"
                                onClick={() => handleUpdateAction(row.id, 'worked')}
                            />
                            <ButtonSubmit
                                classname={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                type={"button"}
                                btnText="Cancel"
                                onClick={() => handleUpdateAction(row.id, 'canceled')}
                            />
                            <ButtonSubmit
                                classname={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                type={"button"}
                                btnText="Hold"
                                onClick={() => handleUpdateAction(row.id, 'hold')}
                            />
                        </>
                    )}
                </div>
            ),
            width: '250px'
        }] : []),
    ];

    const handleUpdateAction = (id: number, status: string) => {
        if (status === 'worked') {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Asset Action is Worked",
                showConfirmButton: false,
                timer: 1500
            });
            mutateUpdateActionAsset({ id: id, payload: { body: 'working on', status: status } })
        }
        if (status === 'canceled') {
            setOpenModalCancel(() => ({ show: true, id: id }))
        }
        if (status === 'hold') {
            setOpenModalHold(() => ({ show: true, id: id }))
        }
    }

    const handleEditAsset = (id: number) => {
        setId(id)
        setOpenModalEdit(true)
    };

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role) {
            setRole(role)
        }
    }, [])

    return (
        <>
            {isLoadingDataUserAssetList ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <LoadingSpinnder />
                    <p className="text-gray-600 mt-2">Loading assets...</p>
                </div>
            ) : (
                <>
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
                                totalItems={dataUserAssetList?.totalItems || 0}
                                totalPages={dataUserAssetList?.totalPages || 0}
                                currentPage={dataUserAssetList?.currentPage || 0}
                            />
                        </>
                    )}
                </>
            )}
            <ModalEditAsset />


            <ModalFeedbackCancel
                openModal={openModalCancel}
                setOpenModal={setOpenModalCancel}
                mutate={mutateUpdateActionAsset}
            />

            <ModalFeedbackHold
                openModal={openModalHold}
                setOpenModal={setOpenModalHold}
                mutate={mutateUpdateActionAsset}
            />
        </>
    )
}