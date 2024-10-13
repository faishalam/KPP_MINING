import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Swal from 'sweetalert2';
import { updateActionAsset } from '../../features/asset/asyncAction';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export default function ModalFeedback(props) {
    const { openModal, setOpenModal, setIsCanceled, isCanceled } = props
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleChange = (event) => {
        setIsCanceled({
            ...isCanceled,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve this!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Approved!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                dispatch(updateActionAsset(id, { action: isCanceled.action }))

                setIsCanceled({
                    action: ''
                })
            } else {
                setIsCanceled({
                    action: ''
                })
            }
        });
    }

    return (
        <Dialog open={openModal.show} onClose={() => setOpenModal({ show: false })} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <form onSubmit={onSubmit} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Enter Feedback
                                </DialogTitle>
                                <textarea
                                    className="mt-2 border w-full h-[100px] placeholder:text-sm p-2"
                                    placeholder='enter feedback'
                                    onChange={handleChange}
                                    value={isCanceled.action}
                                    name="action"
                                />

                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="submit"
                                onClick={() => setOpenModal({ show: false })}
                                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                canceled
                            </button>
                        </div>
                    </DialogPanel>
                </form>
            </div >
        </Dialog >
    )
}
