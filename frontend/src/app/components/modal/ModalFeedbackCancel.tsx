import { DialogTitle } from "@headlessui/react";
import ModalFeedback from "./modalLayout/ModalFeedbackLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonSubmit from "../button/ButtonSubmit";

type ModalFeedbackCancelProps = {
    openModal: { id: number | undefined, show: boolean }
    setOpenModal: (newOpen: { id: number | undefined, show: boolean }) => void
    mutate: (params: { id: number | undefined, payload: { keterangan: string, statusRealisasi: string } }) => void
}

type FormData = {
    keterangan: string;
};

export default function ModalFeedbackCancel({ openModal, setOpenModal, mutate }: ModalFeedbackCancelProps) {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate({ id: openModal.id, payload: { keterangan: data.keterangan, statusRealisasi: 'canceled' } })
        reset()
        setOpenModal({ ...openModal, show: false })
    };


    return (
        <>
            <ModalFeedback
                openModal={openModal.show}
                setOpenModal={(show) => setOpenModal({ ...openModal, show })}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-3 text-center sm:mt-5 p-4">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Enter Feedback
                        </DialogTitle>
                        <textarea
                            className="mt-2 border w-full h-[100px] placeholder:text-xs p-2"
                            placeholder='enter feedback'
                            {...register("keterangan", { required: true })}
                        />

                    </div>

                    <div className="mt-5 sm:mt-6 p-4">
                        <ButtonSubmit
                            type="submit"
                            classname="inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            btnText="Cancel"
                        />
                    </div>
                </form>

            </ModalFeedback>
        </>
    )
}