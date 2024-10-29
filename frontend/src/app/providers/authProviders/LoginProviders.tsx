"use client"

import { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useLogin from "../../api/login/useLogin";
// import { AlertError } from "@/app/components/alert/AlertToastify";
import { useRouter } from 'next/navigation';


export type InputsLogin = {
    email: string
    password: string
}

interface LoginContextProps {
    register: UseFormReturn<InputsLogin>["register"];
    handleSubmit: UseFormReturn<InputsLogin>["handleSubmit"];
    errors: UseFormReturn<InputsLogin>["formState"]["errors"];
    reset: UseFormReturn<InputsLogin>["reset"];
    resetField: UseFormReturn<InputsLogin>["resetField"];
    mutateLogin: (data: InputsLogin) => void,
    dataLogin: string | undefined,
    isLoadingLogin: boolean
}

interface LoginProviderProps {
    children: ReactNode;
}

interface DataLogin {
    access_token: string
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

function useLoginContext() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("LoginContext must be used within an LoginProvider");
    }
    return context;
}

const LoginProvider = ({ children }: LoginProviderProps) => {
    const { register, handleSubmit, formState: { errors }, reset, resetField } = useForm<InputsLogin>();
    const router = useRouter()

    const { mutate: mutateLogin, data: dataLogin, isLoading: isLoadingLogin } = useLogin({
        onSuccess: (data : DataLogin) => {
            localStorage.setItem("access_token", data.access_token)
            router.push("/")
        },
        onError: (error: string) => {
            // AlertError(error)
            reset()
        }
    })


    return (
        <LoginContext.Provider value={{
            register,
            handleSubmit,
            errors,
            reset,
            resetField,
            mutateLogin,
            dataLogin,
            isLoadingLogin
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export { useLoginContext, LoginProvider };
