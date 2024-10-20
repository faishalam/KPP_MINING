'use client';

import { LoginProvider } from "@/app/providers/authProviders/LoginProviders";
import { RegisterProvider } from "@/app/providers/authProviders/RegisterProviders";
import { HomeProvider } from "@/app/providers/rootProviders/HomeProviders";
import { UserAssetProvider } from "@/app/providers/rootProviders/UserAssetProviders";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const RootProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ToastContainer />
        </QueryClientProvider>
    );
};
