'use client'
import "../../app/globals.css";
import MobileSidebar from "../components/pages/HomeLayouts/MobileSidebar";
import { useState } from "react";
import DesktopSidebar from "../components/pages/HomeLayouts/DesktopSidebar";
import Navbar from "../components/pages/HomeLayouts/Navbar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <html lang="en">
            <body
            >
                <div>
                    <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <DesktopSidebar />
                    <div className="lg:pl-72">
                        <Navbar setSidebarOpen={setSidebarOpen} />
                        <main className="py-10">
                            <div className="px-4 sm:px-6 lg:px-8">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
