'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { MdOutlineAddToPhotos } from 'react-icons/md'
import InputFormAuth from '../input/InputFormAuth'
import { useForm } from 'react-hook-form'
import InputFormModal from '../input/InputFormModal'
import SelectField from '../input/InputSelectOption'
import { AssetFormInputs } from '@/app/providers/rootProviders/RootLayoutProviders'
import { useUserAssetContext } from '@/app/providers/rootProviders/UserAssetProviders'
import { useParams } from 'next/navigation'
import { BsFillCreditCard2FrontFill } from 'react-icons/bs'

export default function ModalEditAsset() {
    const {
        openModalEdit,
        setOpenModalEdit,
        registerEdit,
        handleSubmitEdit,
        errors,
        // mutateEditAsset,
        dataAssetById,
        isLoadingDataAssetById,
        setId,
        id
    } = useUserAssetContext()

    const kodePNOptions = [
        { value: 'WORKSHOP', label: 'WORKSHOP' },
        { value: 'FIXTURE_N_FITTING', label: 'FIXTURE N FITTING' },
        { value: 'BUILDING', label: 'BUILDING' },
        { value: 'COMPUTER_EQUIPMENT', label: 'COMPUTER EQUIPMENT' },
        { value: 'SAFETY_EQUIPMENT', label: 'SAFETY EQUIPMENT' },
        { value: 'OFFICE_EQUIPMENT', label: 'OFFICE EQUIPMENT' },
        { value: 'LEASEHOLD', label: 'LEASEHOLD' },
        { value: 'PRODUCTION_EQUIPMENT', label: 'PRODUCTION EQUIPMENT' },
        { value: 'SUPPORT_EQUIPMENT', label: 'SUPPORT EQUIPMENT' },
        { value: 'ENGINEERING_EQUIPMENT', label: 'ENGINEERING EQUIPMENT' }
    ];

    const actionPlan = [
        { value: 'HIGH PRIORIRY', label: 'HIGH PRIORIRY' },
        { value: 'CLOSED', label: 'CLOSED' },
    ]

    const onSubmit = (data: AssetFormInputs) => {
        const { kodePN, actionPlan, remark, areaKerja, benefit, planRealisasi, namaAsset, nilaiAsset, quantityAsset } = data

        const updatedAsset = {
            kodePN,
            actionPlan,
            remark,
            areaKerja,
            benefit,
            planRealisasi,
            namaAsset,
            nilaiAsset,
            quantityAsset
        }

    }

    useEffect(() => {
        if (!openModalEdit) {
            setId(null)
        }
    }, [openModalEdit])

    return (
        <Dialog open={openModalEdit} onClose={setOpenModalEdit} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 overflow-auto max-w-full w-full">
                <div className="flex max-w-full w-full items-start mt-16 justify-center p-10 text-center sm:items-start md:items-start sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-w-full w-full sm:my-8 sm:w-full sm:max-w-lg md:w-full md:max-w-2xl max-h-full h-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 px-2"
                    >

                        <div className="max-w-full w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex gap-2 sm:gap-0 sm:flex sm:items-start max-w-full w-full">
                                <div className="mx-auto w-12 h-12 flex flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <BsFillCreditCard2FrontFill aria-hidden="true" className="h-6 w-6 text-green-700" />
                                </div>
                                <div className="max-w-full w-full text-start sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="max-w-full w-full text-base font-semibold leading-6 text-gray-900">
                                        Edit Asset
                                    </DialogTitle>
                                    <div className="w-full max-w-full">
                                        <p className="text-sm text-gray-500">
                                            Lengkapi Form Dibawah Untuk Menambahkan Asset
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitEdit(onSubmit)} className='w-full max-w-full mt-8 space-y-2'>
                                <InputFormModal
                                    label='Nama Asset'
                                    type='text'
                                    placeholder='Masukkan Nama Asset..'
                                    name='namaAsset'
                                    register={registerEdit('namaAsset', {
                                        required: true,
                                    })}
                                    value={dataAssetById?.namaAsset}
                                    errors={errors.namaAsset?.message}
                                />

                                <SelectField
                                    label="Kode PN"
                                    options={kodePNOptions}
                                    classnames="w-full max-w-full p-1 text-xs border rounded-md p-2 shadow"
                                    labelClassnames='text-xs font-medium mb-1'
                                    register={registerEdit('kodePN', {
                                        required: true,
                                    })}
                                    errors={errors.kodePN?.message}
                                    value={dataAssetById?.kodePN}
                                />

                                <InputFormModal
                                    label='Nilai Asset'
                                    type='number'
                                    placeholder='Masukkan Nilai Asset..'
                                    name='nilaiAsset'
                                    min={1}
                                    register={registerEdit('nilaiAsset', {
                                        required: true,
                                    })}
                                    errors={errors.nilaiAsset?.message}
                                    value={dataAssetById?.nilaiAsset}
                                />

                                <InputFormModal
                                    label='Quantity Asset'
                                    type='number'
                                    min={1}
                                    placeholder='Masukkan Nilai Asset..'
                                    name='nilaiAsset'
                                    register={registerEdit('quantityAsset', {
                                        required: true,
                                    })}
                                    errors={errors.quantityAsset?.message}
                                    value={dataAssetById?.quantityAsset}
                                />

                                <SelectField
                                    label="Action Plan"
                                    options={actionPlan}
                                    classnames="w-full max-w-full p-1 text-xs border rounded-md p-2 shadow"
                                    labelClassnames='text-xs font-medium mb-1'
                                    register={registerEdit('actionPlan', {
                                        required: true,
                                    })}
                                    errors={errors.actionPlan?.message}
                                />

                                <InputFormModal
                                    label='Remark'
                                    type='text'
                                    placeholder='Masukkan Remark..'
                                    name='remark'
                                    register={registerEdit('remark', {
                                        required: true,
                                    })}
                                    errors={errors.remark?.message}
                                    value={dataAssetById?.remark}

                                />

                                <InputFormModal
                                    label='Area Kerja'
                                    type='text'
                                    placeholder='Masukkan Area Kerja..'
                                    name='areaKerja'
                                    register={registerEdit('areaKerja', {
                                        required: true,
                                    })}
                                    errors={errors.areaKerja?.message}
                                    value={dataAssetById?.areaKerja}
                                />

                                <InputFormModal
                                    label='Benefit'
                                    type='text'
                                    placeholder='Masukkan Benefit..'
                                    name='benefit'
                                    register={registerEdit('benefit', {
                                        required: true,
                                    })}
                                    errors={errors.benefit?.message}
                                    value={dataAssetById?.benefit}
                                />

                                <InputFormModal
                                    label='Plan Realisasi'
                                    type='date'
                                    name='planRealisasi'
                                    register={registerEdit('planRealisasi', {
                                        required: true,
                                    })}
                                    errors={errors.planRealisasi?.message}
                                    value={dataAssetById?.planRealisasi}
                                />

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        // onClick={() => setOpen(false)}
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Tambahkan Asset
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setOpenModalEdit(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}