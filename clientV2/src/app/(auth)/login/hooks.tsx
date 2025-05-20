"use client"
import { useContext, createContext } from "react";
import { DataLogin, InputsLogin, InputsRegister } from "./types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLogin from "@/api/login/useLogin";
import Cookies from "js-cookie";
import { AlertError } from "@/components/alert/AlertToastify";

const useAuthHooks = () => {
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
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    },
    onError: (error: string) => {
      AlertError(error);
      reset();
    },
  });

  return {
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
  };
};

const AuthContext = createContext<ReturnType<typeof useAuthHooks> | undefined>(
  undefined
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useAuthHooks();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthHooks must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
