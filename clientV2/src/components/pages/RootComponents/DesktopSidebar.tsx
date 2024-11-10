'use client'
import { classNames } from "@/helper/classnames"
import { useRootLayoutContext } from "@/providers/rootProviders/RootLayoutProviders"
import { Cog6ToothIcon, FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ModalAddAsset from "../../modal/ModalAddAsset"
import Cookies from "js-cookie"
import Image from "next/image"

export default function DesktopSidebar() {
    const {
        setOpenModalAddAsset,
        role
    } = useRootLayoutContext()
    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
        { name: 'Assets', href: '/assets', icon: FolderIcon, current: true },
        { name: 'Asset on Department', href: '/your-assets', icon: UsersIcon, current: false },
    ]

    const actions = [
        { id: 1, name: 'Add Assets', onclick: () => setOpenModalAddAsset(true), initial: 'A', current: false },
        { id: 2, name: 'Guide Apps', href: '#', initial: 'G', current: false },
    ].filter(action => !(role === 'head' && action.name === 'Add Assets'));

    const handleLogout = () => {
        Cookies.remove("Authorization");
        localStorage.clear()
    }


    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex bg-[#0e342d] border-gray-500 shadow-xl items-center p-1 border-b">
                    <Image
                        src="/assets/logoWhite.png"
                        alt="Logo KPP Mining"
                        width={80}
                        height={80}
                        className="p-3"
                    />
                    <p className="text-white font-medium">KPP MONITORING</p> {/* Tambahkan margin jika perlu */}
                </div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0e342d] px-6 pb-4 py-10">

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
                                <div className="text-xs font-semibold leading-6 text-gray-400">Actions</div>
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
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-green-900 bg-green-800 text-[0.625rem] font-medium text-white group-hover:text-white">
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