'use client';

import { LoginProvider } from "@/app/providers/authProviders/LoginProviders";
import { RegisterProvider } from "@/app/providers/authProviders/RegisterProviders";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginProvider>
                <RegisterProvider>
                    {children}
                </RegisterProvider>
            </LoginProvider>
            <ToastContainer />
        </QueryClientProvider>
    );
};
