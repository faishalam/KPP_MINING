'use client'

import { useEffect } from 'react'
import InputFormModal from '../input/InputFormModal'
import SelectField from '../input/InputSelectOption'
import { useUserAssetContext } from '@/providers/rootProviders/UserAssetProviders'
import ModalGeneralLayout from './modalLayout/ModalGeneralLayout'
import ButtonSubmit from '../button/ButtonSubmit'

export default function ModalEditAsset() {
    const {
        openModalEdit,
        setOpenModalEdit,
        registerEdit,
        handleSubmitEdit,
        errors,
        setId,
        onSubmitEdit
    } = useUserAssetContext()

    const kodePNOptions = [
        { value: 'WORKSHOP', label: 'WORKSHOP' },
        { value: 'FIXTURE N FITTING', label: 'FIXTURE N FITTING' },
        { value: 'BUILDING', label: 'BUILDING' },
        { value: 'COMPUTER EQUIPMENT', label: 'COMPUTER EQUIPMENT' },
        { value: 'SAFETY EQUIPMENT', label: 'SAFETY EQUIPMENT' },
        { value: 'OFFICE EQUIPMENT', label: 'OFFICE EQUIPMENT' },
        { value: 'LEASEHOLD', label: 'LEASEHOLD' },
        { value: 'PRODUCTION EQUIPMENT', label: 'PRODUCTION EQUIPMENT' },
        { value: 'SUPPORT EQUIPMENT', label: 'SUPPORT EQUIPMENT' },
        { value: 'ENGINEERING EQUIPMENT', label: 'ENGINEERING EQUIPMENT' }
    ];

    const actionPlan = [
        { value: 'HIGH PRIORIRY', label: 'HIGH PRIORIRY' },
        { value: 'CLOSED', label: 'CLOSED' },
    ]

    useEffect(() => {
        if (!openModalEdit) {
            setId(null)
        }
    }, [openModalEdit])

    return (
        <>
            <ModalGeneralLayout
                openModal={openModalEdit}
                setOpenModal={setOpenModalEdit}
                title="Edit Asset"
                description="Lengkapi Form Dibawah Untuk Menambahkan Asset"
            >
                <form onSubmit={handleSubmitEdit(onSubmitEdit)} className='w-full max-w-full space-y-2'>
                    <div className='max-w-full w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                        <InputFormModal
                            label='Nama Asset'
                            type='text'
                            placeholder='Masukkan Nama Asset..'
                            register={registerEdit('namaAsset', {
                                required: true,
                            })}
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
                        />

                        <InputFormModal
                            label='Nilai Asset'
                            type='number'
                            placeholder='Masukkan Nilai Asset..'
                            min={1}
                            register={registerEdit('nilaiAsset', {
                                required: true,
                            })}
                            errors={errors.nilaiAsset?.message}
                        />

                        <InputFormModal
                            label='Quantity Asset'
                            type='number'
                            min={1}
                            placeholder='Masukkan Nilai Asset..'
                            register={registerEdit('quantityAsset', {
                                required: true,
                            })}
                            errors={errors.quantityAsset?.message}
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
                            register={registerEdit('remark', {
                                required: true,
                            })}
                            errors={errors.remark?.message}

                        />

                        <InputFormModal
                            label='Area Kerja'
                            type='text'
                            placeholder='Masukkan Area Kerja..'
                            register={registerEdit('areaKerja', {
                                required: true,
                            })}
                            errors={errors.areaKerja?.message}
                        />

                        <InputFormModal
                            label='Benefit'
                            type='text'
                            placeholder='Masukkan Benefit..'
                            register={registerEdit('benefit', {
                                required: true,
                            })}
                            errors={errors.benefit?.message}
                        />

                        <InputFormModal
                            label='Plan Realisasi'
                            type='date'
                            register={registerEdit('planRealisasi', {
                                required: true,
                            })}
                            errors={errors.planRealisasi?.message}
                        />
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <ButtonSubmit
                            btnText='Simpan'
                            type='submit'
                            classname='inline-flex w-full justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 sm:ml-3 sm:w-auto transition-all'
                        />

                        <ButtonSubmit
                            btnText='Cancel'
                            type='button'
                            classname='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-auto transition-all border'
                            onClick={() => setOpenModalEdit(false)}
                        />
                    </div>
                </form>

            </ModalGeneralLayout>
        </>
    )
}