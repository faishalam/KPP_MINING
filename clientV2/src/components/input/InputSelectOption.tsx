import { InputsRegister } from '@/providers/authProviders/AuthProviders';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';


interface SelectFieldProps {
    label?: string;
    name?: keyof InputsRegister; //
    options?: Array<{ value: string; label: string }>;
    register?: UseFormRegisterReturn;
    required?: boolean;
    errors?: string;
    classnames?: string;
    labelClassnames?: string;
    value?: string;
}

export default function SelectField({
    label,
    options,
    register,
    errors,
    classnames,
    labelClassnames,
    value,
    // registerEdit
}: SelectFieldProps) {
    // const registerFn = register ?? registerEdit; // Memilih register yang tersedia

    return (
        <div className="relative">
            <label className={`${labelClassnames ? labelClassnames : 'sr-only'}`}>{label}</label>
            {errors && <span className="text-red-500 text-xs">*{errors}</span>}

            <select
                className={`${classnames ? classnames : `w-full cursor-pointer rounded-lg border p-4 shadow text-sm text-black ${errors ? 'border-red-500' : ''}`}`}
                defaultValue={value ? value : ""}  // Setting defaultValue here
                {...register}
            >
                <option value="">Select {label}</option>
                {options?.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div >
    );
}
