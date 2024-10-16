"use client";
import { LoginProvider } from "@/app/providers/authProviders/loginProviders/LoginProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

export default function QueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginProvider>
                {children}
            </LoginProvider>
            <ToastContainer />
        </QueryClientProvider>
    );
}
