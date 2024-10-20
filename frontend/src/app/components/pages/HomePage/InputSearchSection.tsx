import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonSubmit from "../../button/ButtonSubmit";
import { InputsSearch, useHomeContext } from "@/app/providers/rootProviders/HomeProviders";
import { useCallback } from "react";
import { debounce } from "lodash";

export default function InputSearchSection() {
    const {
        handleSubmit,
        onSubmit,
        register,
        setSearchAsset,
    } = useHomeContext()

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
            </form>
            {/* <div className="w-full max-w-full bg-black">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon
                        // onClick={() => setSearchAsset(undefined)}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-1 h-full text-gray-400"
                    />
                    <input 
                        type="text" 
                        placeholder="Search Nama Asset..."
                        className="h-full"
                        />
                    <input
                        id="search-field"
                        type="search"
                        placeholder="Search nama asset..."
                        className="block h-full w-full border rounded-2xl px-10 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-[12px] sm:text-sm"
                        {...register('search')}
                    />
                    <ButtonSubmit
                        type="submit"
                    />

                </form>
            </div > */}

        </>
    )
}