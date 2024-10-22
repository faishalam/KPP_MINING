import { UseFormRegisterReturn } from "react-hook-form"

type InputFormModalProps = {
    label?: string
    type?: string
    placeholder?: string
    name?: string
    register: UseFormRegisterReturn
    min?: number
    errors?: string
    value?: string | number
}

export default function InputFormModal({ label, type, placeholder, name, register, min, errors, value }: InputFormModalProps) {
    return (
        <>
            <div className='w-full max-w-full space-y-1'>
                <label htmlFor="" className='text-xs font-medium'>{label}</label>
                {errors && <p className=" mt-1 text-red-500 text-xs">*{errors}</p>}
                <input
                    type={type}
                    className='w-full max-w-full border p-2 rounded-md text-xs shadow'
                    placeholder={placeholder}
                    min={min}
                    defaultValue={value}
                    {...register}
                />
            </div>
        </>
    )
}