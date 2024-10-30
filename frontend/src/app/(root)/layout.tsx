'use client'
import "../../app/globals.css";
import DesktopSidebar from "../components/pages/RootLayout/DesktopSidebar";
import MobileSidebar from "../components/pages/RootLayout/MobileSidebar";
import Navbar from "../components/pages/RootLayout/Navbar";
import { RootProvider } from "../components/queryProviders/RootProvider";
import { RootLayoutProvider } from "../providers/rootProviders/RootLayoutProviders";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full max-w-full min-h-screen bg-gray-100">
            <RootProvider>
                <RootLayoutProvider>
                    <MobileSidebar />
                    <DesktopSidebar />
                    <Navbar />
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
    );
}
