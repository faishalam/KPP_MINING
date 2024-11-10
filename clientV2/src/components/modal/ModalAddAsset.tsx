'use client'

import InputFormModal from '../input/InputFormModal'
import SelectField from '../input/InputSelectOption'
import { useRootLayoutContext } from '@/providers/rootProviders/RootLayoutProviders'
import ModalGeneralLayout from './modalLayout/ModalGeneralLayout'
import ButtonSubmit from '../button/ButtonSubmit'

export default function ModalAddAsset() {
    const {
        openModalAddAsset,
        setOpenModalAddAsset,
        register,
        handleSubmit,
        onSubmit,
        errors,
    } = useRootLayoutContext()

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

    return (
        <>
            <ModalGeneralLayout
                openModal={openModalAddAsset}
                setOpenModal={setOpenModalAddAsset}
                title='Tambah Asset'
                description='Lengkapi Form Dibawah Untuk Menambahkan Asset'
            >
                <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-full space-y-2'>
                    <div className='max-w-full w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-2'>
                        <InputFormModal
                            label='Nama Asset'
                            type='text'
                            placeholder='Masukkan Nama Asset..'
                            register={register('namaAsset', {
                                required: true,
                            })}
                            errors={errors.namaAsset?.message}
                        />

                        <SelectField
                            label="Kode PN"
                            options={kodePNOptions}
                            classnames="w-full max-w-full p-1 text-xs border rounded-md p-2 shadow"
                            labelClassnames='text-xs font-medium mb-1'
                            register={register('kodePN', {
                                required: true,
                            })}
                            errors={errors.kodePN?.message}
                        />

                        <InputFormModal
                            label='Nilai Asset'
                            type='number'
                            placeholder='Masukkan Nilai Asset..'
                            min={1}
                            register={register('nilaiAsset', {
                                required: true,
                            })}
                            errors={errors.nilaiAsset?.message}
                        />

                        <InputFormModal
                            label='Quantity Asset'
                            type='number'
                            min={1}
                            placeholder='Masukkan Nilai Asset..'
                            register={register('quantityAsset', {
                                required: true,
                            })}
                            errors={errors.quantityAsset?.message}
                        />

                        <SelectField
                            label="Action Plan"
                            options={actionPlan}
                            classnames="w-full max-w-full p-1 text-xs border rounded-md p-2 shadow"
                            labelClassnames='text-xs font-medium mb-1'
                            register={register('actionPlan', {
                                required: true,
                            })}
                            errors={errors.actionPlan?.message}
                        />

                        <InputFormModal
                            label='Remark'
                            type='text'
                            placeholder='Masukkan Remark..'
                            register={register('remark', {
                                required: true,
                            })}
                            errors={errors.remark?.message}
                        />

                        <InputFormModal
                            label='Area Kerja'
                            type='text'
                            placeholder='Masukkan Area Kerja..'
                            register={register('areaKerja', {
                                required: true,
                            })}
                            errors={errors.areaKerja?.message}
                        />

                        <InputFormModal
                            label='Benefit'
                            type='text'
                            placeholder='Masukkan Benefit..'
                            register={register('benefit', {
                                required: true,
                            })}
                            errors={errors.benefit?.message}
                        />

                        <InputFormModal
                            label='Plan Realisasi'
                            type='date'
                            register={register('planRealisasi', {
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
                            onClick={() => setOpenModalAddAsset(false)}
                        />
                        <ButtonSubmit
                            btnText='Cancel'
                            type='button'
                            classname='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-auto transition-all border'
                            onClick={() => setOpenModalAddAsset(false)}
                        />
                    </div>
                </form >
            </ModalGeneralLayout >
        </>
    )
}