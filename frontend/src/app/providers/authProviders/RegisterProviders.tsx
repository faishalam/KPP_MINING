'use client'

import { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useRegister from "../../api/register/useRegister"
import { AlertError, AlertSuccess } from "@/app/components/alert/AlertToastify";
import { useRouter } from 'next/navigation';

export type InputsRegister = {
    email: string
    password: string
    username: string
    district: string
    department: string
    site: string
}

interface RegisterContextProps {
    register: UseFormReturn<InputsRegister>["register"];
    handleSubmit: UseFormReturn<InputsRegister>["handleSubmit"];
    errors: UseFormReturn<InputsRegister>["formState"]["errors"];
    reset: UseFormReturn<InputsRegister>["reset"];
    resetField: UseFormReturn<InputsRegister>["resetField"];
    mutateRegister: (data: InputsRegister) => void,
    isLoadingRegister: boolean
}

interface RegisterProviderProps {
    children: ReactNode;
}


const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

function useRegisterContext() {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error("RegisterContext must be used within an RegisterProviders");
    }
    return context;
}

const RegisterProvider = ({ children }: RegisterProviderProps) => {
    const { register, handleSubmit, formState: { errors }, reset, resetField } = useForm<InputsRegister>();
    const router = useRouter()

    const { mutate: mutateRegister, isLoading: isLoadingRegister } = useRegister({
        onSuccess: () => {
            AlertSuccess('Register successfully')
            reset()
            router.push('/login')
        },
        onError: (error: string) => {
            AlertError(error)
        }
    })


    return (
        <RegisterContext.Provider value={{
            register,
            handleSubmit,
            errors,
            reset,
            resetField,
            mutateRegister,
            isLoadingRegister
        }}>
            {children}
        </RegisterContext.Provider>
    );
}

export { useRegisterContext, RegisterProvider };
