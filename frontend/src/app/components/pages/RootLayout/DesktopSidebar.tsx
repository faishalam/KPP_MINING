'use client'
import { classNames } from "@/app/helper/classnames"
import { HomeProvider, useHomeContext } from "@/app/providers/rootProviders/HomeProviders"
import { useRootLayoutContext } from "@/app/providers/rootProviders/RootLayoutProviders"
import { Cog6ToothIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ModalAddAsset from "../../modal/ModalAddAsset"

export default function DesktopSidebar() {
    const {
        dataUser,
        isLoadingDataUser,
        mutateAddAsset,
        isLoadingAddAsset,
        register, 
        handleSubmit,
        onSubmit,
        errors
    } = useRootLayoutContext()

    const pathname = usePathname()

    const [openModalAddAsset, setOpenModalAddAsset] = useState<boolean>(false)


    const navigation = [
        { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
        { name: `${dataUser?.role === 'user' ? 'My Asset' : 'Your Department'}`, href: '/your-assets', icon: UsersIcon, current: false },
    ]

    const actions = [
        { id: 1, name: 'Add Assets', onclick: () => setOpenModalAddAsset(!openModalAddAsset), initial: 'A', current: false },
        { id: 2, name: 'Guide Apps', href: '#', initial: 'G', current: false },
    ].filter(action => !(dataUser?.role === 'head' && action.name === 'Add Assets'));

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
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
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    item.href === pathname
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                )}
                                            >
                                                <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                                {item.name}
                                            </Link>
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
                                                onClick={item.onclick}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
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
                            <li className="mt-auto">
                                <Link
                                    onClick={() => localStorage.removeItem('access_token')}
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                    href="/login"
                                >
                                    <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <ModalAddAsset
                    open={openModalAddAsset}
                    setOpen={setOpenModalAddAsset}
                    mutate={mutateAddAsset}
                    isLoading={isLoadingAddAsset}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                />
            </div>
        </>
    )
}