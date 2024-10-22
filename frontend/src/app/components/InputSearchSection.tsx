'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonSubmit from "./button/ButtonSubmit";


export default function InputSearchSection({ handleSubmit, onSubmit, register, setSearchAsset, searchAsset }: any) {
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-full w-full">
                <input
                    type="text"
                    className="w-full max-w-full h-full bg-white-400 rounded-md shadow px-10 text-black placeholder:text-gray-400 focus:ring-0 text-[12px] sm:text-sm"
                    placeholder={'Search nama asset atau nama user...'}
                    {...register('search')}
                />
                <MagnifyingGlassIcon
                    // onClick={() => setSearchAsset(undefined)}
                    aria-hidden="true"
                    className="pointer-events-none absolute p-2 inset-y-0 left-1 h-full text-gray-400"
                />

                <ButtonSubmit
                    type="submit"
                />
            </form>
        </>
    )
}