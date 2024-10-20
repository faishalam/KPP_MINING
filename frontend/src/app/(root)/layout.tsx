'use client'
import "../../app/globals.css";
import MobileSidebar from "../components/pages/HomeLayouts/MobileSidebar";
import { use, useState } from "react";
import DesktopSidebar from "../components/pages/HomeLayouts/DesktopSidebar";
import Navbar from "../components/pages/HomeLayouts/Navbar";
import { QueryProvider } from "../components/queryProviders/QueryProvider";
import { HomeProvider } from "../providers/rootProviders/HomeProviders";
import { RootLayoutProvider } from "../providers/rootProviders/RootLayoutProviders";
import HomeLayout from "../components/pages/HomeLayouts/HomeLayout";
import MobileSidebarLayout from "../components/pages/HomeLayouts/MobileSidebar";
import { RootProvider } from "../components/queryProviders/RootProvider";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <html lang="en">
            <body
                className="bg-gray-100 max-w-full min-h-screen"
            >
                <div className="w-full max-w-full">
                    <RootProvider>
                        <RootLayoutProvider>
                            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                            <DesktopSidebar />
                            <Navbar setSidebarOpen={setSidebarOpen} />
                        </RootLayoutProvider>
                        <div className="lg:pl-72 w-full max-w-full">
                            <main className="py-10 w-full max-w-full ">
                                <div className="px-4 sm:px-6 lg:px-8 w-full">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </RootProvider>
                </div>
            </body>
        </html>
    );
}
