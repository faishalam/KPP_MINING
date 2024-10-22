import { UseFormRegisterReturn } from "react-hook-form";

interface InputFormAuthProps {
    type: string;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn
    name: string;
    errors?: string
}

export default function InputFormAuth({ type, label, placeholder, register, errors }: InputFormAuthProps) {
    return (
        <>
            <label htmlFor={type} className="sr-only">{label}</label>
            <div className="relative">
                {errors && <p className=" mt-1 text-red-500 text-xs">*{errors}</p>}
                <input
                    type={type}
                    className="w-full rounded-lg border p-4 pe-12 text-sm shadow text-black"
                    placeholder={placeholder}
                    {...register}
                />
            
            </div>
        </>
    )
}