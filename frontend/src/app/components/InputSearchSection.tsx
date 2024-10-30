'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonSubmit from "./button/ButtonSubmit";
import { UseFormRegister, SubmitHandler } from "react-hook-form";

type InputsSearch = {
    search: string;
};

type Props = {
    register: UseFormRegister<InputsSearch>;
    handleSubmit: (onSubmit: SubmitHandler<InputsSearch>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    onSubmit: SubmitHandler<InputsSearch>;
    placeholder?: string
};

export default function InputSearchSection({ register, handleSubmit, onSubmit, placeholder }: Props) {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-full w-full">
            <input
                type="text"
                className="w-full max-w-full h-full bg-white-400 rounded-md shadow px-10 text-black placeholder:text-gray-400 focus:ring-0 text-[12px] sm:text-sm"
                placeholder={placeholder}
                {...register('search')}
            />
            <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none absolute p-2 inset-y-0 left-1 h-full text-gray-400"
            />
            <ButtonSubmit type="submit" />
        </form>
    );
}
