import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react'

interface ModalFeedbackProps {
    children: ReactNode;
    openModal: boolean
    setOpenModal: (newOpen: boolean) => void
}

export default function ModalFeedback({ children, openModal, setOpenModal }: ModalFeedbackProps) {

    return (
        <Dialog open={openModal} onClose={setOpenModal} className="relative z-50" >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed max-w-full inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex max-w-full min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-w-sm w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >

                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    );
}
