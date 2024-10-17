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
                {/* <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                    </svg>
                </span> */}
            </div>
        </>
    )
}