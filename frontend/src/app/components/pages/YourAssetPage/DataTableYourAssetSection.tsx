'use client'
import { TypeYourDataAssetList, useUserAssetContext } from "@/app/providers/rootProviders/UserAssetProviders";
import DataTable from "react-data-table-component";
import PaginationComponent from "../../PaginationComponent";
import { FaRegEdit } from "react-icons/fa";
import ButtonSubmit from "../../button/ButtonSubmit";
import { MdDelete } from "react-icons/md";
import ModalEditAsset from "../../modal/ModalEditAsset";
import { useState } from "react";
import Swal from "sweetalert2";
import ModalFeedbackCancel from "../../modal/ModalFeedbackCancel";
import ModalFeedbackHold from "../../modal/ModalFeedbackHold";
import LoadingSkeletonTable from "../../loading/LoadingSkeletonTable";

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
        mutateUpdateActionAsset,
        isFetchingDataUserAssetList,
        role
    } = useUserAssetContext()
    const [openModalCancel, setOpenModalCancel] = useState<{ id: number | undefined, show: boolean }>({ id: undefined, show: false });
    const [openModalHold, setOpenModalHold] = useState<{ id: number | undefined, show: boolean }>({ id: undefined, show: false });

    const columnYourAsset = [
        {
            name: 'No',
            sortable: true,
            selector: (row: TypeYourDataAssetList) => row.index + 1,
            cell: (row: TypeYourDataAssetList) => <div className="w-full">{row.index + 1}</div>,
            width: '70px'
        },
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
            width: '170px'
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
                <div className="min-w-[100px] text-gray-500 flex items-center space-x-2">
                    {row.statusRealisasi !== "realisasi waiting" && (
                        <div
                            className={`p-1 rounded-full ${row.statusRealisasi === "worked"
                                ? "bg-green-400"
                                : row.statusRealisasi === "hold"
                                    ? "bg-gray-400"
                                    : "bg-red-400"
                                }`}
                        ></div>
                    )}
                    <div>{row.keterangan}</div>
                </div>
            ),
            width: '150px'
        },
        {
            name: 'Action',
            cell: (row: TypeYourDataAssetList) => (
                <div className="flex gap-3">
                    {role === 'user' ? (
                        <>
                            <ButtonSubmit
                                type="button"
                                btnIcon={<FaRegEdit size={23} className="text-gray-500 hover:text-purple-700 transition-all" />}
                                onClick={() => handleEditAsset(row.id)}
                            />
                            <ButtonSubmit
                                type="button"
                                btnIcon={<MdDelete size={23} className="text-gray-500 hover:text-red-700 transition-all" />}
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
            width: '120px'
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
                                classname={`bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                type={"button"}
                                btnText="Worked"
                                onClick={() => handleUpdateAction(row.id, 'worked')}
                            />
                            <ButtonSubmit
                                classname={`bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
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

    const conditionalRowStyles = [
        {
            when: (row: TypeYourDataAssetList) => row.index % 2 === 0,
            style: {
                backgroundColor: '#f9f9f9',
            },
        },
        {
            when: (row: TypeYourDataAssetList) => row.index % 2 !== 0,
            style: {
                backgroundColor: '#ffffff',
            },
        },
    ];

    const dataWithIndex = dataUserAssetList?.data?.map((item, index) => ({ ...item, index }));

    const handleUpdateAction = (id: number, statusRealisasi: string) => {
        if (statusRealisasi === 'worked') {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Asset Action is Worked",
                showConfirmButton: false,
                timer: 1500
            });
            mutateUpdateActionAsset({ id: id, payload: { keterangan: 'working on', statusRealisasi: statusRealisasi } })
        }
        if (statusRealisasi === 'canceled') {
            setOpenModalCancel(() => ({ show: true, id: id }))
        }
        if (statusRealisasi === 'hold') {
            setOpenModalHold(() => ({ show: true, id: id }))
        }
    }

    const handleEditAsset = (id: number) => {
        setId(id)
        setOpenModalEdit(true)
    };

    return (
        <>
            {isLoadingDataUserAssetList || isFetchingDataUserAssetList || !role ? (
                <>
                    <LoadingSkeletonTable />
                </>
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
                                data={dataWithIndex || []}
                                className="w-full"
                                conditionalRowStyles={conditionalRowStyles}
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