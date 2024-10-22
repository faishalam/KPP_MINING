'use client'
import { HomeProvider, InputsSearch, useHomeContext } from "@/app/providers/rootProviders/HomeProviders"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Bars3Icon, BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import ButtonSubmit from "../../button/ButtonSubmit"
import { RootLayoutProvider, useRootLayoutContext } from "@/app/providers/rootProviders/RootLayoutProviders"
import Link from "next/link"

interface NavbarProps {
    setSidebarOpen: (open: boolean) => void
}

const userNavigation = [
    { name: 'Sign out' },
]

export default function Navbar({ setSidebarOpen }: NavbarProps) {
    const {
        dataUser
    } = useRootLayoutContext()

    return (
        <>
            <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>


                <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                <div className="flex max-w-full w-full items-center gap-x-4 justify-end lg:gap-x-6 p-3">
                    <div className="flex items-center justify-end gap-x-4 lg:gap-x-6">


                        <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                        <Menu as="div" className="relative">
                            <MenuButton className="-m-1.5 flex items-center p-1.5">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                />
                                <span className="hidden lg:flex lg:items-center">
                                    <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                                        {dataUser?.username}
                                    </span>
                                    <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                                </span>
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                {userNavigation.map((item) => (
                                    <MenuItem key={item.name}>
                                        <Link
                                            href={'/login'}
                                            onClick={() => localStorage.removeItem('access_token')}
                                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div >
        </>
    )
}