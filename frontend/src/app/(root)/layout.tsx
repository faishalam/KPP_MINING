'use client'
import "../../app/globals.css";
import MobileSidebar from "../components/pages/RootLayout/MobileSidebar";
import DesktopSidebar from "../components/pages/RootLayout/DesktopSidebar";
import Navbar from "../components/pages/RootLayout/Navbar";
import { RootLayoutProvider } from "../providers/rootProviders/RootLayoutProviders";
import { RootProvider } from "../components/queryProviders/RootProvider";
import InputSearchSection from "../components/InputSearchSection";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className="bg-gray-100 max-w-full min-h-screen"
            >
                <div className="w-full max-w-full">
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
            </body>
        </html>
    );
}
