'use client'
import { classNames } from "@/app/helper/classnames";
import { useRootLayoutContext } from "@/app/providers/rootProviders/RootLayoutProviders";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalAddAsset from "../../modal/ModalAddAsset";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MobileSidebar() {
    const {
        dataUser,
        sidebarOpen,
        setSidebarOpen,
        setOpenModalAddAsset,
        role,
    } = useRootLayoutContext()

    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
        { name: `${dataUser?.role === 'user' ? 'My Asset' : 'Your Department'}`, href: '/your-assets', icon: UsersIcon, current: false },
    ]

    const actions = [
        { id: 1, name: 'Add Assets', onclick: () => setOpenModalAddAsset(true), initial: 'A', current: false },
        { id: 2, name: 'Guide Apps', href: '#', initial: 'G', current: false },
    ].filter(action => !(role === 'head' && action.name === 'Add Assets'));

    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>

                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        onClick={() => setSidebarOpen(false)}
                                                        className={classNames(
                                                            item.href === pathname
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                        )}
                                                    >
                                                        <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="text-xs font-semibold leading-6 text-gray-400">Settings</div>
                                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                                            {actions.map((item) => (
                                                <li key={item.name}>
                                                    <button
                                                        onClick={() => {
                                                            item.onclick && item.onclick();
                                                            setSidebarOpen(false);
                                                        }}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:w-full hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                        )}
                                                    >
                                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                            {item.initial}
                                                        </span>
                                                        <span className="truncate">{item.name}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
                <ModalAddAsset />
            </Dialog>
        </>
    )
}