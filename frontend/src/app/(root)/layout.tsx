'use client'
import "../../app/globals.css";
import MobileSidebar from "../components/pages/HomeLayouts/MobileSidebar";
import { useState } from "react";
import DesktopSidebar from "../components/pages/HomeLayouts/DesktopSidebar";
import Navbar from "../components/pages/HomeLayouts/Navbar";
import { AuthProvider } from "../components/queryProviders/QueryProvider";
import { HomeProvider } from "../providers/rootProviders/HomeProviders";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <html lang="en">
            <body
                className="bg-gray-100 max-w-full min-h-screen"
            >
                <AuthProvider>
                    <div className="w-full max-w-full">
                        <HomeProvider>
                            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                            <DesktopSidebar />
                        </HomeProvider>
                        <div className="lg:pl-72 w-full max-w-full">
                            <HomeProvider>
                                <Navbar setSidebarOpen={setSidebarOpen} />
                            </HomeProvider>
                            <main className="py-10 w-full max-w-full">
                                <div className="px-4 sm:px-6 lg:px-8 w-full max-w-full">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
