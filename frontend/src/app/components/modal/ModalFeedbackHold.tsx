import { DialogTitle } from "@headlessui/react";
import ModalFeedback from "./modalLayout/ModalFeedbackLayout";
import { SubmitHandler, useForm } from "react-hook-form";


type ModalFeedbackHoldProps = {
    openModal: { id: number | undefined, show: boolean }
    setOpenModal: (newOpen: { id: number | undefined, show: boolean }) => void
    mutate: (params: { id: number | undefined, payload: { keterangan: string, statusRealisasi: string, planRealisasi: string } }) => void
}

type FormData = {
    keterangan: string;
    planRealisasi: string;
};

export default function ModalFeedbackHold({ openModal, setOpenModal, mutate }: ModalFeedbackHoldProps) {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate({ id: openModal.id, payload: { keterangan: data.keterangan, statusRealisasi: 'hold', planRealisasi: data.planRealisasi } })
    };



    return (
        <>
            <ModalFeedback
                openModal={openModal.show}
                setOpenModal={(show) => setOpenModal({ ...openModal, show })}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-3 text-center sm:mt-5 p-4">
                        <DialogTitle as="h3" className="text-base mb-4 font-semibold leading-6 text-gray-900">
                            Enter Feedback
                        </DialogTitle>

                        <div className='w-full flex flex-col'>
                            <label htmlFor="" className='w-full text-left text-sm font-semibold mb-2'>Plan Realisasi</label>
                            <input
                                className={'w-full rounded-lg border-gray-200 text-sm shadow-sm border border-grey-200 mb-4 p-2 flex items-start'}
                                type='date'
                                {...register("planRealisasi", { required: true })}
                            />
                        </div>

                        <textarea
                            className="mt-2 border w-full h-[100px] placeholder:text-sm p-2"
                            placeholder='enter feedback'
                            {...register("keterangan", { required: true })}
                        />

                    </div>

                    <div className="mt-5 sm:mt-6 p-6">
                        <button
                            type="submit"
                            // onClick={() => setOpenModal(false)}
                            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Hold
                        </button>
                    </div>
                </form>

            </ModalFeedback>
        </>
    )
}