import { InputsRegister } from '@/app/providers/authProviders/RegisterProviders';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';


interface SelectFieldProps {
    label: string;
    name: keyof InputsRegister; // Ensure it's one of the valid form field names
    options: Array<{ value: string; label: string }>;
    register: UseFormRegister<InputsRegister>; // Register typed to match the form
    required?: boolean;
    error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, register, required, error }) => {
    return (
        <div className="relative">
            <label className="sr-only">{label}</label>
            {error && <span className="text-red-500 text-xs">*{error}</span>}

            <select
                className={`w-full cursor-pointer rounded-lg border p-4 shadow text-sm text-black ${error ? 'border-red-500' : ''}`}
                {...register(name, { required: required ? `${label} wajib diisi` : undefined })}
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
