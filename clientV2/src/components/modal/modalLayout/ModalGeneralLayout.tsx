import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

type ModalGeneralProps = {
    openModal: boolean;
    setOpenModal: (newOpen: boolean) => void;
    children: ReactNode
    title: string
    description: string
}

export default function ModalGeneralLayout({ openModal, setOpenModal, children, title, description }: ModalGeneralProps) {
    return (
        <>
            <Dialog open={openModal} onClose={setOpenModal} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-50 overflow-auto max-w-full w-full">
                    <div className="flex max-w-full w-full items-center justify-center p-10 text-center sm:items-start md:items-start sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-w-full w-full sm:my-8 sm:w-full sm:max-w-xl md:w-full md:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 px-2"
                        >
                            <div className="max-w-full w-full bg-white ">
                                <div className="flex gap-2 sm:gap-0 sm:flex sm:items-start max-w-full w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="mx-auto w-12 h-1  flex flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <BsFillCreditCard2FrontFill aria-hidden="true" className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div className="max-w-full w-full text-start sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="max-w-full w-full text-base font-semibold leading-6 text-gray-900">
                                            {title}
                                        </DialogTitle>
                                        <div className="w-full max-w-full">
                                            <p className="text-sm text-gray-500">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {children}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}