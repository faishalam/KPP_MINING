'use client'
import { InputsRegister, useRegisterContext } from "@/app/providers/authProviders/RegisterProviders";
import { SubmitHandler } from "react-hook-form";
import InputFormAuth from "../../input/InputFormAuth";
import SelectField from "../../input/InputSelectOption";
import ButtonSubmit from "../../button/ButtonSubmit";
import Link from "next/link";
import ContinueWithSection from "./ContinueWithSection";

export default function FormRegisterSection() {
    const {
        register,
        handleSubmit,
        errors,
        mutateRegister,
        isLoadingRegister
    } = useRegisterContext();

    const onSubmit: SubmitHandler<InputsRegister> = (data) => {
        console.log(data);
        mutateRegister(data)
    }

    const registerFields = [
        {
            name: 'username',
            label: 'Username',
            placeholder: 'Enter username',
            type: 'text',
            register: register('username', {
                required: 'Username wajib diisi',
                pattern: {
                    value: /^[A-Za-z0-9]+$/i,
                    message: 'Invalid username'
                }
            }),
            errors: errors.username?.message
        },
        {
            name: 'email',
            label: 'Email',
            placeholder: 'Enter email',
            type: 'email',
            register: register('email', {
                required: 'Email wajib diisi',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                }
            }),
            errors: errors.email?.message
        },
        {
            name: 'password',
            label: 'Password',
            placeholder: 'Enter password',
            type: 'password',
            register: register('password', {
                required: 'Password wajib diisi',
                minLength: {
                    value: 8,
                    message: 'Password minimal 8 karakter'
                }
            }),
            errors: errors.password?.message
        },
        {
            name: 'district',
            label: 'District',
            placeholder: 'Enter district',
            type: 'text',
            register: register('district', {
                required: 'District wajib diisi',
                pattern: {
                    value: /^[A-Za-z0-9]+$/i,
                    message: 'Invalid district'
                }
            }),
            errors: errors.district?.message
        }
    ]

    const departmentOptions = [
        { value: 'PLANT', label: 'PLANT' },
        { value: 'SM', label: 'SM' },
        { value: 'ENG', label: 'ENG' },
        { value: 'PROD', label: 'PROD' },
        { value: 'HCGS', label: 'HCGS' },
        { value: 'FAT', label: 'FAT' },
        { value: 'ICT', label: 'ICT' },
        { value: 'SHE', label: 'SHE' },
    ];

    const siteOptions = [
        { value: 'TMRB', label: 'TMRB' },
        { value: 'INDE', label: 'INDE' },
        { value: 'RANT', label: 'RANT' },
        { value: 'AGMR', label: 'AGMR' },
        { value: 'SJRP', label: 'SJRP' },
        { value: 'SPRL', label: 'SPRL' },
        { value: 'BDMA', label: 'BDMA' },
        { value: 'SPUT', label: 'SPUT' },
        { value: 'MASS', label: 'MASS' },
        { value: 'PELH', label: 'PELH' },
        { value: 'AOC', label: 'AOC' },
    ];
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-4 max-w-full md:max-w-md w-full space-y-3 px-10 lg:px-0">
                {registerFields.map((field, index) => (
                    <InputFormAuth
                        key={index}
                        type={field.type}
                        label={field.label}
                        placeholder={field.placeholder}
                        register={field.register}
                        errors={field.errors}
                        name={field.name}
                    />
                ))}

                {/* Department Select */}
                <SelectField
                    label="Department"
                    name="department"
                    options={departmentOptions}
                    register={register('department', { required: 'Department wajib diisi' })}
                    required={true}
                    errors={errors.department?.message}
                />

                {/* Site Select */}
                <SelectField
                    label="Site"
                    name="site"
                    options={siteOptions}
                    register={register('site', { required: 'Site wajib diisi' })}
                    required={true}
                    errors={errors.site?.message}
                />

                <div className="flex flex-col space-y-4">
                    <ButtonSubmit
                        type={'submit'}
                        classname={'w-fulll max-w-full rounded-lg bg-[#164427] text-white hover:bg-green-700 p-2'}
                        btnText="Register"
                        btnLoading={isLoadingRegister}
                    />
                    <p className="text-sm text-gray-500">
                        Already have an account?
                        <Link href={'/login'} className="underline"> Sign In</Link>
                    </p>
                </div>
                <ContinueWithSection />
            </form>
        </>

    )
}