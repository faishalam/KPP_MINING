"use client"

import { createContext, useContext, ReactNode } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

export type InputsLogin = {
    email: string
    password: string
}

interface LoginContextProps {
    register: UseFormReturn["register"];
    handleSubmit: UseFormReturn["handleSubmit"];
    errors: UseFormReturn["formState"]["errors"];
    reset: UseFormReturn["reset"];
    resetField: UseFormReturn["resetField"];
}

interface LoginProviderProps {
    children: ReactNode;
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
    const { register, handleSubmit, formState: { errors }, reset, resetField } = useForm();

    return (
        <LoginContext.Provider value={{
            register,
            handleSubmit,
            errors,
            reset,
            resetField,
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export { useLoginContext, LoginProvider };
