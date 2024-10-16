'use client'

import ButtonSubmit from "@/app/components/button/ButtonSubmit";
import InputFormAuth from "@/app/components/input/InputFormAuth";
import QueryProvider from "@/app/components/queryProviders/QueryProvider";
import { InputsLogin } from "@/app/providers/authProviders/loginProviders/LoginProviders";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsLogin>()

    const onSubmit: SubmitHandler<InputsLogin> = (data) => {
        console.log(data);
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md w-full space-y-4">
                {/* {error && <p className="text-red-500 text-sm">*{error}</p>} */}

                <InputFormAuth
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    register={register}
                    name="email"
                />
                <InputFormAuth
                    type="password"
                    label="Passowrd"
                    placeholder="Enter password"
                    register={register}
                    name="password"
                />

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        No account?
                        <Link href={'/register'} className="underline"> Sign up</Link>
                    </p>
                    <ButtonSubmit
                        type={'submit'}
                        classname={'w-20 h-8 rounded-lg bg-[#164427] text-white hover:bg-green-700'}
                        btnText="Login"
                    />
                </div>
            </form >
        </>
    )
}