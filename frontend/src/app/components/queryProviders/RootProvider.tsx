'use client';

import { QueryClient, QueryClientProvider } from "react-query";
// import { ToastContainer } from "react-toastify";


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
            {/* <ToastContainer /> */}
        </QueryClientProvider>
    );
};
