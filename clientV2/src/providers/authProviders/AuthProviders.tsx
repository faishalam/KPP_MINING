"use client";

import { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useLogin from "../../api/login/useLogin";
import { useRouter } from "next/navigation";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import useRegister from "@/api/user/useRegister";
import Cookies from "js-cookie";


export type InputsLogin = {
  email: string;
  password: string;
};

export type InputsRegister = {
  email: string;
  password: string;
  username: string;
  district: string;
  department: string;
  site: string;
};

interface AuthContextProps {
  register: UseFormReturn<InputsLogin>["register"];
  handleSubmit: UseFormReturn<InputsLogin>["handleSubmit"];
  errors: UseFormReturn<InputsLogin>["formState"]["errors"];
  reset: UseFormReturn<InputsLogin>["reset"];
  resetField: UseFormReturn<InputsLogin>["resetField"];
  mutateLogin: (data: InputsLogin) => void;
  dataLogin: string | undefined;
  isLoadingLogin: boolean;
  registerRegister: UseFormReturn<InputsRegister>["register"];
  handleSubmitRegister: UseFormReturn<InputsRegister>["handleSubmit"];
  errorsRegister: UseFormReturn<InputsRegister>["formState"]["errors"];
  resetRegister: UseFormReturn<InputsRegister>["reset"];
  mutateRegister: (data: InputsRegister) => void;
  isLoadingRegister: boolean;
}

interface AuthProvidersProps {
  children: ReactNode;
}

interface DataLogin {
  access_token: string;
  role: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProviders");
  }
  return context;
}

const AuthProviders = ({ children }: AuthProvidersProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<InputsLogin>();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister,
  } = useForm<InputsRegister>();
  const router = useRouter();

  const {
    mutate: mutateLogin,
    data: dataLogin,
    isLoading: isLoadingLogin,
  } = useLogin({
    onSuccess: (data: DataLogin) => {
      Cookies.set("Authorization", `${data?.access_token}`, {
        expires: 7,
      });
      localStorage.setItem("role", data.role);
      router.push("/dashboard");
    },
    onError: (error: string) => {
      AlertError(error);
      reset();
    },
  });

  const { mutate: mutateRegister, isLoading: isLoadingRegister } = useRegister({
    onSuccess: () => {
      AlertSuccess("Register successfully");
      reset();
      router.push("/login");
    },
    onError: (error: string) => {
      AlertError(error);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        reset,
        resetField,
        mutateLogin,
        dataLogin,
        isLoadingLogin,
        registerRegister,
        handleSubmitRegister,
        errorsRegister,
        resetRegister,
        mutateRegister,
        isLoadingRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProviders };
