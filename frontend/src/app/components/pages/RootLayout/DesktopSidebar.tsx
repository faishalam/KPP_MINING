'use client'
import { classNames } from "@/app/helper/classnames"
import { useRootLayoutContext } from "@/app/providers/rootProviders/RootLayoutProviders"
import { Cog6ToothIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ModalAddAsset from "../../modal/ModalAddAsset"
import { useRouter } from "next/router"

export default function DesktopSidebar() {
    const {
        dataUser,
        setOpenModalAddAsset,
        role
    } = useRootLayoutContext()

    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
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
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0e342d] px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-start">
                        <img
                            alt="Your Company"
                            src="https://career.kppmining.com/logo.svg"
                            className="h-14 w-auto"
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
                                                        ? 'bg-[#207262] text-white'
                                                        : 'text-white hover:bg-[#207262] hover:w-full hover:text-white',
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
                                                        ? 'bg-[#207262] text-white'
                                                        : 'text-white hover:bg-[#207262] hover:w-full hover:text-white',
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
                                    onClick={() => handleLogout()}
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-[#207262] hover:w-full hover:text-white"
                                    href="/login"
                                >
                                    <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <ModalAddAsset />
            </div>
        </>
    )
}