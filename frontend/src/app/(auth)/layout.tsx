'use client'

import "../../app/globals.css";
import { QueryProvider } from "../components/queryProviders/QueryProvider";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <html lang="en">
        //     <body className="max-w-full min-h-screen bg-white flex">
        <>
            <div className="max-w-full w-full bg-white flex min-h-screen">
                <section className="max-w-full w-full flex flex-col justify-center items-center">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReW8lr0R3L6JBwPdJVTnbJ38rA2QWLWTfwSw&s"
                        alt="logo"
                        className="w-full max-w-xs object-cover"
                    />
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </section>

                <section className="hidden md:block md:relative md:max-w-full md:w-full ">
                    <img
                        src="https://www.kppmining.com/assets/images/kpp-home-banner.png"
                        alt="image"
                        className="w-full max-w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </section>
            </div>
        </>
        // </body>
        // </html>
    );
}
